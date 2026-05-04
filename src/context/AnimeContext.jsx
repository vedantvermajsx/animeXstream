import React, { createContext, useState, useContext } from 'react';

const AnimeContext = createContext();

export const useAnime = () => {
  const context = useContext(AnimeContext);
  if (!context) {
    throw new Error('useAnime must be used within an AnimeProvider');
  }
  return context;
};

export const AnimeProvider = ({ children }) => {
  const [animeList, setAnimeList] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedTags, setSelectedTags] = useState([]);
  const [tempSelectedTags, setTempSelectedTags] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [hasMore, setHasMore] = useState(true);

  const value = {
    animeList,
    setAnimeList,
    page,
    setPage,
    selectedTags,
    setSelectedTags,
    tempSelectedTags,
    setTempSelectedTags,
    searchQuery,
    setSearchQuery,
    hasMore,
    setHasMore
  };

  return <AnimeContext.Provider value={value}>{children}</AnimeContext.Provider>;
};
