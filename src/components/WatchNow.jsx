import React, { useState, useEffect } from 'react';
import FetchData from './FetchData';
import { useParams } from 'react-router-dom';
import VideoPlayer from './VideoPlayer';
import Episodes from './Episodes';

const WatchNow = () => {
  const { id, episode_id } = useParams();

  const [data, setData] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response2 = await FetchData(`https://api.jikan.moe/v4/anime/${id}/episodes`);
        const response = await FetchData(`https://api.jikan.moe/v4/anime/${id}/episodes/${episode_id}`);
        if (response.data) {
          setData(response.data);
          setEpisodes(response2.data);
        } else {
          setError('No data found for this episode');
        }
      } catch (err) {
        setError(err.message || 'Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, episode_id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <p className="text-xl text-white animate-pulse">Loading...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <p className="text-xl text-red-500">{error}</p>
      </div>
    );

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-950 text-white">
      {/* Main Video Section */}
      <div className="flex-1 p-4 lg:p-8">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumbs/Nav back */}
          <div className="mb-6">
            <h2 className="text-gray-400 text-sm font-medium mb-1 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
              Watching Episode {episode_id}
            </h2>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              {data?.title || 'Untitled Episode'}
            </h1>
          </div>

          {/* Video Player Container */}
          <div className="aspect-video bg-black rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl ring-1 ring-gray-800">
            {data ? (
              <VideoPlayer url={data.url} title={data.title} />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500 italic">
                Video content not available
              </div>
            )}
          </div>

          {/* Episode Info */}
          <div className="mt-8 bg-gray-900/40 p-6 md:p-8 rounded-3xl border border-gray-800/50">
            <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
              <span className="w-1 h-5 bg-blue-600 rounded-full"></span>
              About this episode
            </h3>
            <p className="text-gray-400 leading-relaxed text-sm md:text-base">
              {data?.synopsis || 'No description available for this episode.'}
            </p>
          </div>
        </div>
      </div>

      {/* Sidebar - Episode List */}
      <aside className="w-full lg:w-[400px] bg-gray-900/90 backdrop-blur-md border-l border-gray-800 flex flex-col h-[600px] lg:h-screen sticky top-0">
        <div className="p-6 border-b border-gray-800 flex items-center justify-between bg-gray-900/50">
          <h2 className="text-xl font-bold flex items-center gap-2">
            Episodes
          </h2>
          <span className="bg-blue-600/20 text-blue-400 text-xs font-bold px-3 py-1 rounded-full border border-blue-500/20">
            {episodes.length} Available
          </span>
        </div>
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-600 scrollbar-track-gray-900">
          <Episodes id={id} episodes={episodes} />
        </div>
      </aside>
    </div>
  );
};

export default WatchNow;
