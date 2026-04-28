import React from "react";

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-950">
      <div className="relative w-24 h-24">
        {/* Outer Ring */}
        <div className="absolute inset-0 border-4 border-blue-600/20 rounded-full"></div>
        {/* Spinning Ring */}
        <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
        {/* Logo/Icon in middle */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 bg-blue-600 rounded-2xl rotate-45 animate-pulse"></div>
        </div>
      </div>
      <div className="mt-8 text-center">
        <h2 className="text-xl font-black text-white tracking-widest uppercase animate-pulse">
          AnimeXtream
        </h2>
        <p className="text-gray-500 text-xs mt-2 font-bold uppercase tracking-[0.2em]">
          Loading Experience
        </p>
      </div>
    </div>
  );
};

export default Loader;
