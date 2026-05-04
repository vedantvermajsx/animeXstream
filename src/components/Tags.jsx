import React, { useState } from 'react';
import { useAnime } from '../context/AnimeContext';
import TagData from '../TagData';

import { ChevronDown, ChevronUp, Filter, X, Check } from 'lucide-react';

function Tags() {
    const { 
        setSelectedTags, 
        setAnimeList, 
        tempSelectedTags: selectedTags, 
        setTempSelectedTags: setSelectedTagsState 
    } = useAnime();
    const [isExpanded, setIsExpanded] = useState(false);
    const initialTagsToShow = 12;

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    const toggleTagSelection = (tag) => {
        setSelectedTagsState(prevSelectedTags =>
            prevSelectedTags.some(t => t.mal_id === tag.mal_id)
                ? prevSelectedTags.filter(t => t.mal_id !== tag.mal_id)
                : [...prevSelectedTags, tag]
        );
    };

    const clearFilter = () => {
        setSelectedTagsState([]);
        setSelectedTags([]);
        setAnimeList([]);
    };

    const applyFilter = () => {
        setSelectedTags(selectedTags);
        setAnimeList([]);
    };

    return (
        <div className="w-full bg-gray-900/40 backdrop-blur-md rounded-3xl p-6 border border-gray-800 shadow-xl">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <div className="bg-blue-600 p-2 rounded-xl">
                        <Filter size={18} className="text-white" />
                    </div>
                    <h2 className="text-xl font-bold text-white tracking-tight">Browse by Genre</h2>
                </div>
                
                {selectedTags.length > 0 && (
                    <div className="flex gap-2">
                        <button 
                            onClick={clearFilter} 
                            className="flex items-center gap-1.5 text-xs font-bold text-gray-400 hover:text-red-400 transition-colors px-3 py-1.5 rounded-lg border border-gray-800 hover:border-red-900/30"
                        >
                            <X size={14} />
                            Clear
                        </button>
                        <button 
                            onClick={applyFilter} 
                            className="flex items-center gap-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 transition-all px-4 py-1.5 rounded-lg shadow-lg shadow-blue-900/20"
                        >
                            <Check size={14} />
                            Apply Filters
                        </button>
                    </div>
                )}
            </div>

            <div className="relative">
                <div className={`flex flex-wrap gap-2.5 transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[1000px]' : 'max-h-[100px] overflow-hidden'}`}>
                    {TagData && TagData.length > 0 && TagData.map((tag, index) => {
                        const isSelected = selectedTags.some(t => t.mal_id === tag.mal_id);
                        const isHidden = !isExpanded && index >= initialTagsToShow;
                        
                        if (isHidden) return null;

                        return (
                            <button
                                key={tag.mal_id}
                                onClick={() => toggleTagSelection(tag)}
                                className={`group relative px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 border ${
                                    isSelected 
                                    ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-900/20' 
                                    : 'bg-gray-800/50 border-gray-700 text-gray-400 hover:border-gray-500 hover:text-gray-200'
                                }`}
                            >
                                {tag.name}
                                {isSelected && (
                                    <span className="ml-2 inline-flex items-center justify-center bg-white/20 rounded-full p-0.5">
                                        <X size={10} />
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </div>
                
                {!isExpanded && TagData.length > initialTagsToShow && (
                    <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-gray-900/80 to-transparent pointer-events-none"></div>
                )}
            </div>

            {TagData.length > initialTagsToShow && (
                <button 
                    onClick={toggleExpanded} 
                    className="mt-6 mx-auto flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-blue-400 transition-colors group"
                >
                    {isExpanded ? (
                        <>
                            Show Less <ChevronUp size={14} className="group-hover:-translate-y-0.5 transition-transform" />
                        </>
                    ) : (
                        <>
                            Show All Genres ({TagData.length}) <ChevronDown size={14} className="group-hover:translate-y-0.5 transition-transform" />
                        </>
                    )}
                </button>
            )}
        </div>
    );
}

export default Tags;
