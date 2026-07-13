// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import Image from '../Components/Image';
// import GameCard from '../Components/GameCard';
// import Button from '../Components/Button';
// import Header from '../Components/Header';
// import Footer from '../Components/Footer';
// import { slides } from '../Data/slides';
// import { gamesData } from '../Data/games';

// function Home() {
//     const [currentSlide, setCurrentSlide] = useState(0);
//     const [searchTerm, setSearchTerm] = useState("");

//     const nextSlide = () => {
//         setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
//     };

//     const prevSlide = () => {
//         setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
//     };

//     const goToSlide = (index) => {
//         setCurrentSlide(index);
//     };
    
//     const filteredGames = gamesData.filter(game => 
//         game.title.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     return (
//         <>
//             <Header onSearch={setSearchTerm} />
//             <div className="slider-container">
//                 <div className="slides" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
//                     {slides.map((slide, index) => (
//                         <div className="slide" key={index}>
//                             <Image src={slide.image} />
//                             <div className="slide-content">
//                                 <Link to={slide.link}>
//                                     <Button className="dwn-btn" text="Download Here" />
//                                 </Link>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
    
//                 <div className="arrow arrow-left" onClick={prevSlide}>❮</div>
//                 <div className="arrow arrow-right" onClick={nextSlide}>❯</div>
    
//                 <div className="indicators">
//                     {slides.map((_, index) => (
//                         <div 
//                             key={index} 
//                             className={`indicator ${index === currentSlide ? 'active' : ''}`}
//                             onClick={() => goToSlide(index)}
//                         ></div>
//                     ))}
//                 </div>
//             </div>

//             <section className="game-heading" aria-hidden="true">
//                 <h2>Top Rated Games</h2>
//             </section>

//             <main id="games" className="games-section" aria-label="Featured Games">
//                 <div className="games-grid">
//                     {filteredGames.length > 0 ? (
//                         filteredGames.map((game, index) => (
//                             <GameCard 
//                                 key={index}
//                                 id={game.id}
//                                 title={game.title}
//                                 image={game.image}
//                                 label={game.label}
//                             />
//                         ))
//                     ) : (
//                         <p style={{ textAlign: 'center', width: '100%', color: 'white' }}>No games found matching "{searchTerm}"</p>
//                     )}
//                 </div>
//             </main>
  
//             <main className="container-2" role="main" aria-label="Our goal and official site information">
//                 <section className="our-goal" aria-labelledby="our-goal-title">
//                     <h3 id="our-goal-title">Our Goal</h3>
//                     <p>
//                         No Doubt everyone loves free games of any platform.<br />
//                         World of MSD is the arena for free games, it allows you<br />
//                         to download all your favorite games completely free.<br />
//                         All Games are Pre-Installed, which means you don’t need<br />
//                         to install the games.<br />
//                         Our games are compressed and no content has been removed,<br />
//                         which decreases the game size.<br />
//                         We reorganized the download method and we will strive for being<br />
//                         the legit platform for free Pre-Installed games without any cost.
//                     </p>
//                 </section>
    
//                 <section className="official-site" aria-labelledby="official-site-title">
//                     <h3 id="official-site-title">Official Site</h3>
//                     <p>
//                         Only trust the official site:
//                         <a className="official-link" href="https://worldlofmsd.com" target="_blank" rel="noopener noreferrer">worldlofmsd.com</a>
//                         and avoid the fake copycats.<br />
//                         Always check URL for verification.
//                     </p>
//                 </section>
//             </main>
//             <Footer />
//         </>
//     )
// }

// export default Home;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Image from '../Components/Image';
import GameCard from '../Components/GameCard';
import Button from '../Components/Button';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { Helmet } from 'react-helmet-async';
// import { slides } from '../Data/slides';
// import { gamesData } from '../Data/games';

function Home() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    
    const [slides, setSlides] = useState([]);
    const [games, setGames] = useState([]);
    const [settings, setSettings] = useState(null);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL || ''}/api/slides`)
            .then(res => res.json())
            .then(data => setSlides(data))
            .catch(err => console.error("Error loading slides:", err));

        fetch(`${process.env.REACT_APP_API_URL || ''}/api/games`)
            .then(res => res.json())
            .then(data => setGames(data))
            .catch(err => console.error("Error loading games:", err));

        fetch(`${process.env.REACT_APP_API_URL || ''}/api/settings`)
            .then(res => res.json())
            .then(data => setSettings(data))
            .catch(err => console.error("Error loading settings:", err));
    }, []);

    const nextSlide = () => {
        if (slides.length === 0) return;
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        if (slides.length === 0) return;
        setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };
    
    const filteredGames = games.filter(game => 
        game.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <Helmet>
                <title>World of MSD | Download Free Pre-Installed Games</title>
                <meta name="description" content="Explore and download the best pre-installed PC and mobile games for free. No installation required, just download and play." />
            </Helmet>
            <Header onSearch={setSearchTerm} />
            
            <div className="slider-container">
                {slides.length > 0 ? (
                    <>
                        <div className="slides" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                            {slides.map((slide, index) => (
                                <div className="slide" key={slide._id || index}>
                                    <Image src={slide.image} />
                                    <div className="slide-content">
                                        {slide.link && (
                                            <Link to={slide.link}>
                                                <Button className="dwn-btn" text="Download Here" />
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
            
                        <div className="arrow arrow-left" onClick={prevSlide}>❮</div>
                        <div className="arrow arrow-right" onClick={nextSlide}>❯</div>
            
                        <div className="indicators">
                            {slides.map((slide, index) => (
                                <div 
                                    key={index} 
                                    className={`indicator ${index === currentSlide ? 'active' : ''}`}
                                    onClick={() => goToSlide(index)}
                                ></div>
                            ))}
                        </div>
                    </>
                ) : (
                    <div style={{ height: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white' }}>
                        Loading Slides...
                    </div>
                )}
            </div>

            <section className="game-heading" aria-hidden="true">
                <h2>Top Rated Games</h2>
            </section>

            <main id="games" className="games-section" aria-label="Featured Games">
                <div className="games-grid">
                    {filteredGames.length > 0 ? (
                        filteredGames.map((game, index) => (
                            <GameCard 
                                key={game._id || index}
                                id={game.id}
                                title={game.title}
                                image={game.image}
                                label={game.label}
                            />
                        ))
                    ) : (
                        <p style={{ textAlign: 'center', width: '100%', color: 'white' }}>
                            {games.length === 0 ? "Loading Games..." : `No games found matching "${searchTerm}"`}
                        </p>
                    )}
                </div>
            </main>
  
            <main className="container-2" role="main" aria-label="Our goal and official site information">
                <section className="our-goal" aria-labelledby="our-goal-title">
                    <h3 id="our-goal-title">Our Goal</h3>
                    <p style={{ whiteSpace: 'pre-line' }}>
                        {settings?.ourGoalText || `No Doubt everyone loves free games of any platform.
                        World of MSD is the arena for free games, it allows you
                        to download all your favorite games completely free.`}
                    </p>
                </section>
    
                <section className="official-site" aria-labelledby="official-site-title">
                    <h3 id="official-site-title">Official Site</h3>
                    <p>
                        Only trust the official site:
                        and avoid the fake copycats.<br />
                        Always check URL for verification.
                    </p>
                </section>
            </main>
            <Footer />
        </>
    )
}

export default Home;