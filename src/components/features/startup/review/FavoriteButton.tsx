"use client";

import { usePathname, useRouter } from "next/navigation";
import { Heart } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/src/components/ui/button";
import { useUser } from "@/src/store/user";
import { cn } from "@/src/lib/utils";

import {
  useFavoriteIds,
  useFavoritesCount,
  useToggleFavorite,
} from "../hooks/useFavorites";

type FavoriteButtonProps = {
  startupId: number;
  variant?: "icon" | "button";
  initialCount?: number;
  className?: string;
};

export default function FavoriteButton({
  startupId,
  variant = "icon",
  initialCount,
  className,
}: FavoriteButtonProps) {
  const user = useUser();
  const router = useRouter();
  const pathname = usePathname();

  const { data: favoriteIds } = useFavoriteIds(user.isAuth);
  const { data: count } = useFavoritesCount(startupId, {
    initialData: initialCount,
    enabled: variant === "button",
  });
  const { mutate: toggle, isPending } = useToggleFavorite();

  const isFavorite = favoriteIds?.includes(startupId) ?? false;
  const label = isFavorite ? "Убрать из избранного" : "Добавить в избранное";

  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    if (!user.isAuth) {
      router.push(
        `/auth/signin?redirect=${encodeURIComponent(pathname ?? "/")}`,
      );
      return;
    }

    toggle(
      { startupId, isFavorite },
      {
        onSuccess: (result) => {
          if (variant === "button") {
            toast.success(
              result.is_favorite
                ? "Стартап добавлен в избранное"
                : "Стартап удалён из избранного",
            );
          }
        },
      },
    );
  };

  const heart = (
    <Heart
      aria-hidden="true"
      size={16}
      className={cn(
        "transition-colors",
        isFavorite && "fill-rose-500 text-rose-500",
      )}
    />
  );

  if (variant === "button") {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={handleClick}
        disabled={isPending}
        aria-pressed={isFavorite}
        className={cn(isFavorite && "border-rose-200 bg-rose-50", className)}
      >
        {heart}
        {isFavorite ? "В избранном" : "В избранное"}
        {typeof count === "number" ? (
          <span className="text-xs text-muted-foreground">{count}</span>
        ) : null}
      </Button>
    );
  }

  return (
    <Button
      aria-label={label}
      aria-pressed={isFavorite}
      className={cn("size-7", className)}
      size="icon-sm"
      title={label}
      variant="ghost"
      onClick={handleClick}
      disabled={isPending}
    >
      {heart}
    </Button>
  );
}
