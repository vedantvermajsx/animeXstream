import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import CardLoader from "./CardLoader";
import { Heart } from "lucide-react";

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
          rootMargin: "50px", // Preload slightly before it enters the viewport
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
          className="bg-gray-900 rounded-lg shadow-2xl relative p-4 max-w-xs text-white flex items-center justify-center h-80"
        >
          <CardLoader />
        </div>
      );
    }

    return (
      <Link to={`/play/${id}`} ref={ref} className="group block">
        <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-2 border border-gray-700 hover:border-blue-500">
          <div className="relative aspect-[3/4] overflow-hidden">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60"></div>
            
            <div className="absolute top-2 right-2 z-20">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleFavoriteClick();
                }}
                className={`p-2 rounded-full backdrop-blur-md transition-colors ${
                  isFavorite ? "bg-red-500 text-white" : "bg-black/40 text-gray-300 hover:bg-black/60"
                }`}
              >
                <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
              </button>
            </div>

            {rating && (
              <div className="absolute bottom-2 left-2 z-20 bg-blue-600/90 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded">
                ★ {rating}
              </div>
            )}
            
            {status && (
              <div className="absolute top-2 left-2 z-20 bg-black/60 backdrop-blur-sm text-white text-[10px] uppercase font-bold px-2 py-1 rounded border border-gray-500/50">
                {status}
              </div>
            )}
          </div>

          <div className="p-4">
            <h3 className="text-sm font-bold text-white line-clamp-2 min-h-[40px] group-hover:text-blue-400 transition-colors">
              {title}
            </h3>
            <div className="mt-2 flex items-center justify-between text-[11px] text-gray-400 font-medium">
              <span>{episodes ? `${episodes} Eps` : 'N/A'}</span>
              <span className="bg-gray-700 px-2 py-0.5 rounded text-gray-300">
                {ageTag || 'PG-13'}
              </span>
            </div>
          </div>
        </div>
      </Link>
    );
  }
);

export default Card;
