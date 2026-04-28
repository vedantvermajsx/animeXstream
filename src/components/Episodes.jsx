import React, { useState } from 'react';
import Episode from './Episode';

const Episodes = ({ id, episodes }) => {
  if (!episodes || episodes.length === 0) {
    return <p className="p-6 text-gray-500 text-center italic">No episodes found</p>;
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-col divide-y divide-gray-800">
        {episodes.map((episode) => (
          <Episode key={episode.mal_id} id={id} data={episode} />
        ))}
      </div>
    </div>
  );
};

export default Episodes;
