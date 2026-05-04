import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import CardLoader from "./CardLoader";
import { Heart, Star, Play, Info } from "lucide-react";

const Card = React.forwardRef(
  (
    { image, rating, id, rank, status, ageTag, title, episodes, genres },
    ref
  ) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const cardRef = useRef();

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        },
        {
          rootMargin: "50px", 
        }
      );

      if (cardRef.current) {
        observer.observe(cardRef.current);
      }

      return () => {
        if (cardRef.current) {
          observer.unobserve(cardRef.current);
        }
      };
    }, []);

    useEffect(() => {
      const favoriteCards =
        JSON.parse(localStorage.getItem("favoriteCards")) || [];
      const isCardFavorite = favoriteCards.some((card) => card.id === id);
      setIsFavorite(isCardFavorite);
    }, [id]);

    const handleFavoriteClick = () => {
      setIsFavorite(!isFavorite);
      const favoriteCards =
        JSON.parse(localStorage.getItem("favoriteCards")) || [];
      if (!isFavorite) {
        favoriteCards.push({
          image,
          rating,
          id,
          rank,
          status,
          ageTag,
          title,
          episodes,
          genres,
        });
      } else {
        const index = favoriteCards.findIndex((card) => card.id === id);
        if (index !== -1) {
          favoriteCards.splice(index, 1);
        }
      }
      localStorage.setItem("favoriteCards", JSON.stringify(favoriteCards));
    };

    if (!isVisible) {
      return (
        <div
          ref={cardRef}
          className="bg-gray-950/50 rounded-2xl border border-gray-800 relative p-4 w-full aspect-[3/4] text-white flex items-center justify-center overflow-hidden"
        >
          <CardLoader />
        </div>
      );
    }

    return (
      <Link to={`/play/${id}`} ref={ref} className="group block perspective-1000">
        <div className="relative bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 group-hover:border-blue-500/50 transition-all duration-500 shadow-xl group-hover:shadow-blue-500/10 group-hover:shadow-2xl">
          <div className="relative aspect-[3/4] overflow-hidden">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              loading="lazy"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/20 to-transparent opacity-80"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-gray-950/40 via-transparent to-transparent opacity-40"></div>
            
            <div className="absolute top-3 left-3 right-3 flex justify-between items-start z-20">
              {status && (
                <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md text-white text-[9px] font-black px-2 py-1 rounded-lg border border-white/10 shadow-lg uppercase tracking-wider">
                  <div className={`w-1.5 h-1.5 rounded-full ${status.includes('Finished') ? 'bg-green-500' : 'bg-blue-500'} animate-pulse`}></div>
                  <span>{status.includes('Finished') ? 'Finished' : 'Ongoing'}</span>
                </div>
              )}
              
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleFavoriteClick();
                }}
                className={`p-2 rounded-xl backdrop-blur-md transition-all duration-300 transform active:scale-90 ${
                  isFavorite 
                  ? "bg-red-500 text-white shadow-lg shadow-red-500/40" 
                  : "bg-black/40 text-gray-300 hover:bg-black/60 border border-white/10"
                }`}
              >
                <Heart size={16} fill={isFavorite ? "currentColor" : "none"} />
              </button>
            </div>

            <div className="absolute inset-0 flex items-center justify-center bg-blue-600/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
               <div className="bg-white/20 p-4 rounded-full backdrop-blur-md border border-white/30 transform scale-50 group-hover:scale-100 transition-transform duration-300">
                  <Play size={32} fill="white" className="text-white ml-1" />
               </div>
            </div>

            {rating && (
              <div className="absolute bottom-3 left-3 z-20 flex items-center gap-1 bg-black/60 backdrop-blur-md text-yellow-400 text-[10px] font-black px-2 py-1 rounded-lg border border-white/10 shadow-lg">
                <Star size={10} fill="currentColor" />
                <span>{rating}</span>
              </div>
            )}
          </div>

          <div className="p-4 bg-gray-900/95 backdrop-blur-md">
            <h3 className="text-sm font-bold text-white line-clamp-1 group-hover:text-blue-400 transition-colors duration-300 mb-2">
              {title}
            </h3>
            
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 text-gray-400">
                <div className="w-1 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-[10px] font-bold uppercase tracking-tight">
                  {episodes ? `${episodes} Episodes` : 'Ongoing'}
                </span>
              </div>
              
              <span className="bg-gray-800/80 text-gray-300 text-[9px] font-black px-1.5 py-0.5 rounded border border-gray-700 uppercase tracking-tighter">
                {ageTag?.split(' ')[0] || 'PG-13'}
              </span>
            </div>
          </div>
        </div>
      </Link>
    );
  }
);

export default Card;
