import MyFavorites from "@/src/components/features/account/favorites/MyFavorites";

export const metadata = {
  title: "Избранное | IdeaCrafter",
};

export default function AccountFavoritesPage() {
  return (
    <div className="mt-4">
      <MyFavorites />
    </div>
  );
}
