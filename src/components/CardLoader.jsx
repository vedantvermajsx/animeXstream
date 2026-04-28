import React from "react";

const CardLoader = () => {
  return (
    <div className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 animate-pulse">
      <div className="aspect-[3/4] bg-gray-800"></div>
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-800 rounded w-3/4"></div>
        <div className="h-3 bg-gray-800 rounded w-1/2"></div>
        <div className="flex justify-between pt-2">
          <div className="h-3 bg-gray-800 rounded w-1/4"></div>
          <div className="h-3 bg-gray-800 rounded w-1/4"></div>
        </div>
      </div>
    </div>
  );
};

export default CardLoader