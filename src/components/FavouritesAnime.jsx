import { useState, useEffect } from "react";
import Card from "./Card";

function FavouritesAnime() {
  const [Favourites, setFavourites] = useState([]);

  const updateFavourites = () => {
    const storedFavourites = localStorage.getItem("favoriteCards");
    if (storedFavourites) {
      setFavourites(JSON.parse(storedFavourites));
    }
  };

  useEffect(() => {
    updateFavourites();

    const handleStorageChange = (event) => {
      if (event.key === "favoriteCards") {
        updateFavourites();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  if (Favourites.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-gray-500">
        <p className="text-lg font-medium">No favorites yet</p>
        <p className="text-sm">Click the heart icon on any anime to add it here.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
      {Favourites.map((anime) => (
        <Card
          key={anime.id}
          id={anime.id}
          title={anime.title}
          ageTag={anime.ageTag}
          image={anime.image}
          rank={anime.rank}
          rating={anime.rating}
          status={anime.status}
          genres={anime.genres}
          episodes={anime.episodes}
        />
      ))}
    </div>
  );
}

export default FavouritesAnime;
