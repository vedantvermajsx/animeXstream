import React from 'react';

function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="bg-gray-900 text-gray-400 py-12 border-t border-gray-800">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-6 md:mb-0">
                        <h2 className="text-2xl font-bold text-white mb-2">Anime Xtream</h2>
                        <p className="text-sm">Your ultimate destination for anime streaming.</p>
                    </div>
                    <div className="flex flex-col items-center md:items-end">
                        <div className="flex space-x-6 mb-4">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">Facebook</a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">Twitter</a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition-colors">Instagram</a>
                        </div>
                        <p className="text-xs">© {currentYear} Anime Xtream. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
