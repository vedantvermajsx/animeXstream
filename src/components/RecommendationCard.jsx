import React from 'react'
import { Link } from "react-router-dom";

function RecommendationCard({ recommendation }) {
  return (
    <Link to={`/play/${recommendation.entry.mal_id}`} className="group block min-w-[160px] max-w-[200px]">
      <div className="bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1 border border-gray-700 hover:border-blue-500">
        <div className="relative aspect-[3/4] overflow-hidden">
          <img
            src={recommendation.entry.images.jpg.large_image_url}
            alt={recommendation.entry.title}
            className="w-full h-full object-cover transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60"></div>
          
          <div className="absolute bottom-2 right-2 z-10 bg-black/60 backdrop-blur-sm text-[10px] text-gray-300 px-1.5 py-0.5 rounded flex items-center gap-1">
            <span>{recommendation.votes} votes</span>
          </div>
        </div>
        <div className="p-3">
          <h3 className="text-xs font-bold text-white line-clamp-2 min-h-[32px] group-hover:text-blue-400 transition-colors leading-tight">
            {recommendation.entry.title}
          </h3>
        </div>
      </div>
    </Link>
  );
}

export default RecommendationCard;