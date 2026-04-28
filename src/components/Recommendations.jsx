import React from 'react';
import RecommendationCard from './RecommendationCard';

const Recommendations = ({ recommendations }) => {
  if (!recommendations || recommendations.length === 0) {
    return <p className="text-gray-500 italic">No recommendations available</p>;
  }

  return (
    <div className="relative">
      <div className="flex overflow-x-auto pb-4 gap-4 scroll-smooth scrollbar-thin scrollbar-thumb-blue-600 scrollbar-track-gray-900">
        {recommendations.map((recommendation) => (
          <RecommendationCard key={recommendation.entry.mal_id} recommendation={recommendation} />
        ))}
      </div>
    </div>
  );
};

export default Recommendations;
