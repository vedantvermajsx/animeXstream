import Header from "./Header";

function Hero() {
  return (
    <div className="hero-image relative min-h-[600px] flex flex-col bg-cover bg-center">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 via-gray-900/80 to-gray-900"></div>
      
      <div className="relative z-20">
        <Header isHome={true} />
      </div>

      <div className="relative z-10 flex-grow container mx-auto px-6 flex items-center">
        <div className="max-w-3xl">
          <div className="mt-8">
            <h1 className="text-white text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
              Welcome to <span className="text-blue-600">Anime Xtream</span>
            </h1>
            <p className="text-gray-300 text-lg md:text-xl mb-8 leading-relaxed max-w-xl">
              Your ultimate destination for all things anime. Explore thousands of titles, 
              discover hidden gems, and immerse yourself in breathtaking stories.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-full font-bold transition-all shadow-xl">
                Explore Now
              </button>
              <button className="bg-white/10 hover:bg-white/20 text-white px-10 py-4 rounded-full font-bold backdrop-blur-md transition-all border border-white/20">
                My List
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
