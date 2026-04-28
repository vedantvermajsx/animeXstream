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
    <div className="bg-gray-950 min-h-screen pb-12">
      <div className="container mx-auto px-4">
        <div className="py-8">
          <Tags setSelectedTags={setSelectedTags} />
        </div>

        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <span className="w-1.5 h-8 bg-blue-600 rounded-full"></span>
              Your Favourites
            </h2>
          </div>
          <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
            <FavouritesAnime />
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <span className="w-1.5 h-8 bg-blue-600 rounded-full"></span>
              {selectedTags.length > 0 ? 'Filtered Results' : 'Explore Anime'}
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {animeList.map((anime, index) => (
              <Suspense 
                key={`${anime.mal_id}-${index}`}
                fallback={<div className="aspect-[3/4] animate-pulse bg-gray-800 rounded-xl"></div>}
              >
                <Card
                  ref={index === animeList.length - 1 ? lastAnimeElementRef : null}
                  id={anime.mal_id}
                  title={anime.title}
                  ageTag={anime.rating}
                  image={anime.images.jpg.image_url}
                  rank={anime.rank}
                  rating={anime.score}
                  status={anime.status}
                  genres={anime.genres}
                  episodes={anime.episodes}
                />
              </Suspense>
            ))}
          </div>

          {loading && (
            <div className="flex justify-center mt-12">
              <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          {!loading && animeList.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No anime found matching your criteria.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default AnimeList;
