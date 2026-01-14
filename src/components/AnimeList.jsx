import React, { useState, useEffect, useRef, useCallback, Suspense } from "react";
import FetchData from "./FetchData";
import Card from "./Card";
import Tags from "./Tags";
import FavouritesAnime from "./FavouritesAnime";

const AnimeList = () => {
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();
  const [selectedTags, setSelectedTags] = useState([]);
  const [isFetchingData, setIsFetchingData] = useState(false);

  const API = `https://api.jikan.moe/v4/anime?page=${page}${
    selectedTags.length > 0
      ? "&genres=" + selectedTags.map((tag) => tag.mal_id).join(",")
      : ""
  }`;

  const loadAnime = async (page) => {
    setLoading(true);
    setIsFetchingData(true);
    try {
      const data = await FetchData(API);
      setAnimeList((prev) => [...prev, ...data.data]);
      setHasMore(data.pagination.has_next_page);
    } catch (error) {
      console.error("Error fetching anime:", error);
    } finally {
      setLoading(false);
      setIsFetchingData(false);
    }
  };

  useEffect(() => {
    setAnimeList([]);
    setPage(1);
  }, [selectedTags]);

  useEffect(() => {
    loadAnime(page);
  }, [page, selectedTags]);

  const lastAnimeElementRef = useCallback(
    (node) => {
      if (loading || isFetchingData) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, isFetchingData]
  );

  return (
    
    <div className="bg-gray-900 max-w-screen h-full gap-4 p-4 place-items-center">
      <Tags setSelectedTags={setSelectedTags} />

      <h1 className="text-white text-left text-2xl font-bold">Favourites</h1>
      <div className="min-h-0 flex flex-wrap place-items-center place-content-evenly">
        <FavouritesAnime />
      </div>

      <div className="bg-gray-900 max-w-screen h-full grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
        {animeList.length === 0 && !loading && (
          <div className="text-white col-span-full text-center">
            No anime found.
          </div>
        )}

        {animeList.map((anime, index) => {
          if (index === animeList.length - 1) {
            return (
              <Suspense fallback={<div className="temp-card animate-pulse bg-gray-700 h-64 w-full rounded-md"></div>}>
              <Card
                ref={lastAnimeElementRef}
                key={anime.mal_id}
                id={anime.mal_id}
                title={anime.title}
                ageTag={anime.rating}
                image={anime.images.jpg.image_url}
                rank={anime.rank}
                rating={anime.score}
                status={anime.status}
                genres={anime.genres}
                episodes={anime.episodes}
                className="h-64"
              />
              </Suspense>
            );
          }
          return (
            <Card
              key={anime.mal_id}
              id={anime.mal_id}
              title={anime.title}
              ageTag={anime.rating}
              image={anime.images.jpg.image_url}
              rank={anime.rank}
              rating={anime.score}
              status={anime.status}
              genres={anime.genres}
              episodes={anime.episodes}
              className="h-64"
            />
          );
        })}

        {loading &&
          animeList.length === 0 &&
          Array.from({ length: 10 }).map((_, index) => (
            <div
              key={`temp-card-${index}`}
              className="temp-card animate-pulse bg-gray-700 h-64 w-full rounded-md"
            ></div>
          ))}

        {loading && animeList.length > 0 && (
          <div className="text-white col-span-full text-center">
            Loading more anime...
          </div>
        )}
      </div>
    </div>
  );
};

export default AnimeList;
