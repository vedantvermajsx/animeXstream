import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Search, User, PlusCircle, Play, X } from 'lucide-react';

function Header({ isHome }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleSearch = (e) => {
        if (e.key === 'Enter' && searchQuery.trim()) {
            // Implement search navigation if search route exists
            console.log('Searching for:', searchQuery);
        }
    };

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            isHome ? 'bg-transparent' : 'bg-gray-950/90 backdrop-blur-md border-b border-gray-800'
        }`}>
            <div className="container mx-auto px-4 h-20 flex items-center justify-between gap-4">
                {/* Left Section: Mobile Menu & Logo */}
                <div className="flex items-center gap-4">
                    <button 
                        className="md:hidden text-white hover:text-blue-500 transition-colors"
                        onClick={toggleMenu}
                    >
                        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                    
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="bg-blue-600 p-2 rounded-lg group-hover:bg-blue-500 transition-colors">
                            <Play size={24} fill="white" className="text-white" />
                        </div>
                        <span className="text-xl font-black tracking-tighter text-white uppercase italic">
                            Anime<span className="text-blue-500">Xtream</span>
                        </span>
                    </Link>
                </div>

                {/* Middle Section: Search Bar */}
                <div className="flex-1 max-w-xl hidden sm:block">
                    <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors" size={18} />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={handleSearch}
                            className="w-full bg-gray-900/50 border border-gray-700 text-white rounded-full py-2.5 pl-10 pr-4 outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-gray-600"
                            placeholder="Search your favorite anime..."
                        />
                    </div>
                </div>

                {/* Right Section: Auth Buttons */}
                <div className="hidden md:flex items-center gap-3">
                    <Link to="/signin" className="text-gray-300 hover:text-white font-medium px-4 py-2 transition-colors">
                        Sign In
                    </Link>
                    <Link to="/signup" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full font-bold shadow-lg shadow-blue-500/20 transition-all flex items-center gap-2">
                        <PlusCircle size={18} />
                        Create Account
                    </Link>
                </div>

                {/* Mobile Search & User Toggle */}
                <div className="flex md:hidden items-center gap-4 text-white">
                    <Search size={24} className="cursor-pointer hover:text-blue-500" />
                    <User size={24} className="cursor-pointer hover:text-blue-500" />
                </div>
            </div>

            {/* Mobile Navigation Drawer Overlay */}
            {isMenuOpen && (
                <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden" onClick={toggleMenu}>
                    <div className="absolute top-20 left-4 right-4 bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-2xl animate-in fade-in slide-in-from-top-4" onClick={e => e.stopPropagation()}>
                        <nav className="flex flex-col gap-4">
                            <Link to="/" className="text-lg font-semibold text-white border-b border-gray-800 pb-2">Home</Link>
                            <Link to="/trending" className="text-lg font-semibold text-white border-b border-gray-800 pb-2">Trending</Link>
                            <Link to="/new" className="text-lg font-semibold text-white border-b border-gray-800 pb-2">New Releases</Link>
                            <div className="flex flex-col gap-3 mt-4">
                                <Link to="/signin" className="w-full text-center py-3 rounded-xl border border-gray-700 text-white font-semibold">Sign In</Link>
                                <Link to="/signup" className="w-full text-center py-3 rounded-xl bg-blue-600 text-white font-semibold">Sign Up</Link>
                            </div>
                        </nav>
                    </div>
                </div>
            )}
        </header>
    );
}

export default Header;
