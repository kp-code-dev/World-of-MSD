import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import '../Styles/Header.css';

const imgsrc = '/logo.svg'; 

function Header({ onSearch }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [logoUrl, setLogoUrl] = useState(imgsrc);
    const navigate = useNavigate();

    // Fetch settings on mount
    useEffect(() => {
        fetch('/api/settings')
            .then(res => res.json())
            .then(data => {
                if (data && data.logoUrl && data.logoUrl.trim() !== '' && data.logoUrl !== 'logo.png') {
                    setLogoUrl(data.logoUrl);
                }
            })
            .catch(err => console.error(err));
    }, []);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleSearchChange = (e) => {
        const text = e.target.value;
        setSearchText(text);
        if (onSearch) {
            onSearch(text);
        }
    };

    const handleSearchSubmit = () => {
        setIsSearchOpen(false);
        if (window.location.pathname !== '/games') {
            navigate('/games', { state: { searchTerm: searchText } });
            // We still set the onSearch prop if it exists (e.g. if we are already on a page that uses it)
            // but the navigation state handles the cross-page data transfer
            if (onSearch) onSearch(searchText);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearchSubmit();
        }
    };

    return (
    <header>
        <nav>
            <div className='container'>
                <div>   
                <Link to="/">
                    <img src={logoUrl} alt='World of MSD Logo' className='icon' style={{ objectFit: 'contain' }} />
                </Link>
                </div>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/games">Games</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/faqs">FAQs</Link></li>
                </ul>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <button id="menu-btn" onClick={toggleMobileMenu}>&#9776;</button>
                </div>
            </div>
            <button className="search-icon-btn" onClick={() => setIsSearchOpen(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
            </button>
            <div id="mobile-menu" className={isMobileMenuOpen ? 'show' : ''}>
                <div className="mobile-search">
                    <input 
                        type="text" 
                        placeholder="Search games..." 
                        value={searchText}
                        onChange={handleSearchChange}
                        onKeyDown={handleKeyDown}
                    />
                </div>
                <Link to="/" onClick={toggleMobileMenu}>Home</Link>
                <Link to="/games" onClick={toggleMobileMenu}>Games</Link>
                <Link to="/about" onClick={toggleMobileMenu}>About</Link>
                <Link to="/faqs" onClick={toggleMobileMenu}>FAQs</Link>
            </div>
        </nav>
        
        <div className={`search-overlay ${isSearchOpen ? 'open' : ''}`}>
            <button className="close-search" onClick={() => setIsSearchOpen(false)}>&times;</button>
            <div className="search-content">
                <div className="search-input-wrapper">
                    <input 
                        type="text" 
                        placeholder="Type to search..." 
                        value={searchText}
                        onChange={handleSearchChange}
                        onKeyDown={handleKeyDown}
                        autoFocus={isSearchOpen}
                    />
                    <button className="search-submit-icon" onClick={handleSearchSubmit}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </header>
    )
}

export default Header;