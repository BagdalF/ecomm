import { useSelector } from "react-redux";

const FavoritesCount = () => {
  const favorites = useSelector((state) => state.favorites);
  const favoritesCount = favorites.length;
  return (
    <div className="absolute left-4 top-10 ">
      {favoritesCount > 0 && (
        <span className="px-1 py-0 text-sm text-white bg-emerald-500 rounded-full">
          {favoritesCount}
        </span>
      )}
    </div>
  );
};

export default FavoritesCount;
