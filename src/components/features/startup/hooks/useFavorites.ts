import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/src/constants/config";
import { FavoriteService } from "../api_service/favoriteService";
import type { Startup } from "../types";

export const useFavoriteIds = (enabled: boolean) =>
  useQuery({
    queryKey: QUERY_KEYS.FAVORITE_IDS,
    queryFn: () => FavoriteService.getIds(),
    enabled,
    staleTime: 1000 * 60,
  });

export const useMyFavorites = () =>
  useQuery({
    queryKey: QUERY_KEYS.MY_FAVORITES,
    queryFn: () => FavoriteService.getMine(),
  });

export const useFavoritesCount = (
  startupId: number,
  { initialData, enabled = true }: { initialData?: number; enabled?: boolean },
) =>
  useQuery({
    queryKey: QUERY_KEYS.FAVORITES_COUNT(startupId),
    queryFn: () => FavoriteService.getCount(startupId),
    initialData,
    enabled,
    staleTime: 1000 * 30,
  });

type ToggleInput = { startupId: number; isFavorite: boolean };

export const useToggleFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ startupId, isFavorite }: ToggleInput) =>
      isFavorite
        ? FavoriteService.remove(startupId)
        : FavoriteService.add(startupId),
    onMutate: async ({ startupId, isFavorite }) => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.FAVORITE_IDS });
      const previousIds = queryClient.getQueryData<number[]>(
        QUERY_KEYS.FAVORITE_IDS,
      );

      queryClient.setQueryData<number[]>(QUERY_KEYS.FAVORITE_IDS, (ids = []) =>
        isFavorite
          ? ids.filter((id) => id !== startupId)
          : [startupId, ...ids.filter((id) => id !== startupId)],
      );

      if (isFavorite) {
        queryClient.setQueryData<Startup[]>(
          QUERY_KEYS.MY_FAVORITES,
          (startups) => startups?.filter((startup) => startup.id !== startupId),
        );
      }

      return { previousIds };
    },
    onError: (_error, _input, context) => {
      queryClient.setQueryData(QUERY_KEYS.FAVORITE_IDS, context?.previousIds);
    },
    onSuccess: (result, { startupId }) => {
      if (typeof result?.count === "number") {
        queryClient.setQueryData(
          QUERY_KEYS.FAVORITES_COUNT(startupId),
          result.count,
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.FAVORITE_IDS });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.MY_FAVORITES });
    },
  });
};
