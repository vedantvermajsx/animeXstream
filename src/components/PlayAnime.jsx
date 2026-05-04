import { useEffect, useState } from "react";
import FetchData from './FetchData';
import Loader from './Loader';
import Recommendations from './Recommendations';
import Episodes from "./Episodes";
import Images from "./Images";
import VideoPlayer from './VideoPlayer'

const PlayAnime = ({ id }) => {
    const [anime, setAnime] = useState({});
    const [firstEpisode, setFirstEpisode] = useState(null);
    const [episodes, setEpisodes] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);

    
    useEffect(() => {
        if (!id) return;

        const fetchAllData = async () => {
            try {
                setLoading(true);
                const animeData = await FetchData(`https://api.jikan.moe/v4/anime/${id}`);
                setAnime(animeData.data);

                const episodesData = await FetchData(`https://api.jikan.moe/v4/anime/${id}/episodes`);
                setFirstEpisode(episodesData.data[0]);
                setEpisodes(episodesData.data);

                const recommendationsData = await FetchData(`https://api.jikan.moe/v4/anime/${id}/recommendations`);
                setRecommendations(recommendationsData.data);
            } catch (error) {
                console.error("Error fetching anime data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAllData();
    }, [id]);

    if (loading) return <Loader />;

    if (!anime || !firstEpisode) return <p>No data available</p>;

    const {
        images: animeImages,
        title,
        title_english,
        title_japanese,
        aired,
        genres,
        themes,
        trailer,
        synopsis,
        rating,
        score,
        episodes: totalEpisodes,
        duration,
        rank,
        popularity
    } = anime;

    return (
        <div className="w-full bg-gray-950 text-white min-h-screen ">
            <div className="relative w-full h-[40vh] md:h-[60vh] overflow-hidden">
                <div 
                    className="absolute inset-0 bg-cover bg-center blur-sm scale-110 opacity-30"
                    style={{ backgroundImage: `url(${animeImages?.jpg?.large_image_url})` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/40 to-transparent"></div>
                
                <div className="absolute inset-0 flex items-end">
                    <div className="container mx-auto px-6 pb-12 flex flex-col md:flex-row gap-8 items-end">
                        <div className="hidden md:block w-64 aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border-4 border-gray-900 flex-shrink-0 transform translate-y-12">
                            <img
                                src={animeImages?.jpg?.large_image_url}
                                alt={title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        
                        <div className="flex-1 pb-4">
                            <div className="flex flex-wrap gap-2 mb-4">
                                {genres?.slice(0, 3).map((genre) => (
                                    <span key={genre.mal_id} className="bg-blue-600/80 backdrop-blur-md text-[10px] uppercase font-bold px-3 py-1 rounded-full border border-blue-400/30">
                                        {genre.name}
                                    </span>
                                ))}
                                <span className="bg-gray-800/80 backdrop-blur-md text-[10px] uppercase font-bold px-3 py-1 rounded-full border border-gray-700">
                                    {rating?.split(' ')[0] || 'PG-13'}
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black mb-2 tracking-tight">{title}</h1>
                            <p className="text-gray-400 text-lg md:text-xl font-medium line-clamp-1 italic">
                                {title_english || title_japanese}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 py-12">
                <div className="flex flex-col lg:flex-row gap-12">
                    <div className="flex-1">
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
                            <div className="bg-gray-900/50 p-4 rounded-2xl border border-gray-800 text-center">
                                <p className="text-gray-500 text-xs uppercase font-bold mb-1">Score</p>
                                <p className="text-2xl font-black text-yellow-500">{score || 'N/A'}</p>
                            </div>
                            <div className="bg-gray-900/50 p-4 rounded-2xl border border-gray-800 text-center">
                                <p className="text-gray-500 text-xs uppercase font-bold mb-1">Rank</p>
                                <p className="text-2xl font-black text-white">#{rank || 'N/A'}</p>
                            </div>
                            <div className="bg-gray-900/50 p-4 rounded-2xl border border-gray-800 text-center">
                                <p className="text-gray-500 text-xs uppercase font-bold mb-1">Episodes</p>
                                <p className="text-2xl font-black text-white">{totalEpisodes || '?'}</p>
                            </div>
                            <div className="bg-gray-900/50 p-4 rounded-2xl border border-gray-800 text-center">
                                <p className="text-gray-500 text-xs uppercase font-bold mb-1">Status</p>
                                <p className="text-sm font-black text-blue-500 uppercase tracking-wider mt-2">{anime.status || 'Unknown'}</p>
                            </div>
                        </div>

                        <div className="mb-12">
                            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                <span className="w-1 h-6 bg-blue-600 rounded-full"></span>
                                Synopsis
                            </h2>
                            <p className="text-gray-300 leading-relaxed text-lg bg-gray-900/30 p-6 rounded-2xl border border-gray-800/50">
                                {synopsis}
                            </p>
                        </div>

                        <div className="mb-12">
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                <span className="w-1 h-6 bg-blue-600 rounded-full"></span>
                                Watch Now
                            </h2>
                            <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl ring-1 ring-gray-800 bg-black">
                                <VideoPlayer url={trailer?.embed_url || firstEpisode?.url} title={title} />
                            </div>
                        </div>

                        <Images id={id} />
                    </div>

                    <div className="w-full lg:w-96 flex flex-col gap-10">
                        <section className="bg-gray-900/50 rounded-3xl border border-gray-800 overflow-hidden shadow-xl">
                            <div className="p-6 border-b border-gray-800 flex items-center justify-between">
                                <h2 className="text-xl font-bold">Episodes</h2>
                                <span className="text-xs bg-blue-600/20 text-blue-400 px-2 py-1 rounded-full font-bold">
                                    {episodes.length} Total
                                </span>
                            </div>
                            <div className="max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-blue-600 scrollbar-track-gray-800">
                                <Episodes id={id} episodes={episodes} />
                            </div>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <span className="w-1 h-6 bg-purple-600 rounded-full"></span>
                                Recommendations
                            </h2>
                            <Recommendations recommendations={recommendations} />
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlayAnime;
