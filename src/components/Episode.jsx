import React from 'react';
import { Link } from "react-router-dom";

import { Play } from 'lucide-react';

const Episode = ({ id, data }) => {
  const episode_id = data.mal_id;
  const title = data.title || `Episode ${episode_id}`;

  return (
    <Link 
      to={`/play/${id}/${episode_id}`} 
      className="group flex items-center gap-4 p-4 hover:bg-gray-800/80 transition-all duration-200"
    >
      <div className="relative flex-shrink-0 w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center border border-gray-700 group-hover:border-blue-500 transition-colors">
        <span className="text-sm font-bold text-gray-400 group-hover:text-blue-500">{episode_id}</span>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-blue-600/10 rounded-lg">
          <Play size={16} className="text-blue-500 fill-blue-500" />
        </div>
      </div>
      
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-semibold text-gray-200 truncate group-hover:text-white transition-colors">
          {title}
        </h3>
        <p className="text-[10px] text-gray-500 uppercase tracking-wider mt-1">
          {data.aired ? new Date(data.aired).toLocaleDateString() : "Release TBD"}
        </p>
      </div>
    </Link>
  );
};

export default Episode;
