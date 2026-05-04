import React, { useState, useEffect, useRef, useCallback, Suspense, useMemo } from "react";
import { useAnime } from "../context/AnimeContext";
import FetchData from "./FetchData";
import Card from "./Card";
import Tags from "./Tags";
import FavouritesAnime from "./FavouritesAnime";

const AnimeList = () => {
  const {
    animeList,
    setAnimeList,
    page,
    setPage,
    selectedTags,
    setSelectedTags,
    searchQuery,
    setSearchQuery,
    hasMore,
    setHasMore
  } = useAnime();

  const [loading, setLoading] = useState(false);
  const observer = useRef();
  const [isFetchingData, setIsFetchingData] = useState(false);

  const API = useMemo(() => {
    const q = searchQuery.trim();
    
    if (!q && selectedTags.length === 0) {
      return `https://api.jikan.moe/v4/top/anime?page=${page}`;
    }
    
    let url = `https://api.jikan.moe/v4/anime?page=${page}`;
    if (q) {
      url += `&q=${encodeURIComponent(q)}`;
    }
    if (selectedTags.length > 0) {
       const genres = selectedTags.map((tag) => tag.mal_id).join(",");
       url += `&genres=${genres}`;
     }
    
    return url;
  }, [page, selectedTags, searchQuery]);

  const loadAnime = useCallback(async (targetPage, ignoreExisting = false) => {
    if (!ignoreExisting && targetPage === 1 && animeList.length > 0 && !isFetchingData) {
      return;
    }

    setLoading(true);
    setIsFetchingData(true);
    try {
      const data = await FetchData(API);
      setAnimeList((prev) => (targetPage === 1 ? data.data : [...prev, ...data.data]));
      setHasMore(data.pagination.has_next_page);
    } catch (error) {
      console.error("Error fetching anime:", error);
    } finally {
      setLoading(false);
      setIsFetchingData(false);
    }
  }, [API, animeList.length, isFetchingData, setAnimeList, setHasMore]);

  const prevTagsRef = useRef(selectedTags);
  const prevSearchRef = useRef(searchQuery);

  useEffect(() => {
    const tagsChanged = prevTagsRef.current !== selectedTags;
    const searchChanged = prevSearchRef.current !== searchQuery;

    if (tagsChanged || searchChanged) {
      setAnimeList([]);
      setPage(1);
      prevTagsRef.current = selectedTags;
      prevSearchRef.current = searchQuery;
      loadAnime(1, true);
    } else if (animeList.length === 0) {
      loadAnime(page);
    }
  }, [selectedTags, searchQuery, page, animeList.length, loadAnime, setAnimeList, setPage]);

  useEffect(() => {
    if (page > 1) {
      loadAnime(page);
    }
  }, [page, loadAnime]);

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
          <Tags />
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
              {searchQuery ? `Search results for "${searchQuery}"` : (selectedTags.length > 0 ? 'Filtered Results' : 'Top Anime')}
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {useMemo(() => animeList.map((anime, index) => (
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
            )), [animeList, lastAnimeElementRef])}
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
