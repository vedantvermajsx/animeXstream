import React from 'react'

const VideoPlayer = ({ url, title }) => {
  if (!url) return null;
  
  return (
    <div className="relative w-full h-full bg-black">
      <iframe
        src={url}
        title={title}
        allowFullScreen
        className="w-full h-full border-0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      ></iframe>
    </div>
  );
};

export default VideoPlayer;