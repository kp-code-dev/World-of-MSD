import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
// import { gamesData } from '../Data/games'; 
import '../Styles/GameDetails.css';
import { Helmet } from 'react-helmet-async';

function GameDetails() {
    const { id } = useParams();
    
    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);

        fetch(`/api/games/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Game not found");
                }
                return response.json();
            })
            .then(data => {
                setGame(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching game details:", error);
                setLoading(false);
            });
    }, [id]);

    // Full Screen Logic (Same as before)
    const handleFullScreen = () => {
        const iframe = document.getElementById("game-iframe");

        if (iframe) {
            if (iframe.requestFullscreen) {
                iframe.requestFullscreen();
            } else if (iframe.webkitRequestFullscreen) { /* Safari */
                iframe.webkitRequestFullscreen();
            } else if (iframe.msRequestFullscreen) { /* IE11 */
                iframe.msRequestFullscreen();
            }
        }
    };

    if (loading) {
        return (
            <>
                <Header />
                <div style={{ marginTop: '150px', textAlign: 'center', color: 'white' }}>
                    <h1>Loading...</h1>
                </div>
                <Footer />
            </>
        );
    }

    if (!game) {
        return (
            <>
                <Header />
                <div style={{ marginTop: '150px', textAlign: 'center', color: 'white' }}>
                    <h1>Game Not Found</h1>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Helmet>
                <title>{game.title} | Download Free Game | World of MSD</title>
                <meta name="description" content={`Download ${game.title} for free. ${game.description?.substring(0, 150)}... Pre-installed and ready to play.`} />
                <meta property="og:title" content={`${game.title} - World of MSD`} />
                <meta property="og:image" content={game.image} />
            </Helmet>
            <Header />
            <div className="game-details-container">
                <div className="game-hero" style={{ backgroundImage: `linear-gradient(rgba(70, 0, 0, 0.5), rgba(0, 0, 0, 0.89)), url(${game.image})` }}>
                    <div className="game-hero-content">
                        <h1>{game.title}</h1>
                        <div className="game-meta">
                            <span>{game.developer}</span>
                            <span>{game.releaseDate}</span>
                            <span>{game.size}</span>
                        </div>
                    </div>
                </div>

                <div className="game-content">
                    <div className="game-main-info">
                        <section className="description">
                            <h2>About the Game</h2>
                            <p>{game.description}</p>
                        </section>

                        {game.playUrl && (
                            <section className="play-game" style={{ marginTop: '2rem' }}>
                                <h2>Play Now</h2>
                                <button 
                                    onClick={handleFullScreen}
                                    style={{
                                        padding: "10px 20px", 
                                        fontSize: "16px", 
                                        background: "rgba(0, 0, 0, 0.1)",
                                        backdropFilter: "blur(10px)",
                                        borderRadius: "20px",
                                        boxShadow: "0 2px 30px 0 rgba(0, 0, 0, 0.67)",
                                        color: "white", 
                                        border: "none", 
                                        cursor: "pointer",
                                        margin: "10px",
                                        display: "flex",
                                        justifySelf: "end",
                                    }}
                                >
                                    [ ] Full Screen
                                </button>
                                <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                                    <iframe 
                                        id="game-iframe"
                                        src={game.playUrl} 
                                        title={`Play ${game.title}`}
                                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen; camera; focus-without-user-activation *; pointer-lock"
                                        sandbox="allow-forms allow-scripts allow-same-origin allow-popups allow-presentation allow-pointer-lock"
                                        allowFullScreen
                                    />
                                </div>
                            </section>
                        )}

                        <section className="screenshots">
                            <h2>Screenshots</h2>
                            <div className="screenshot-grid">
                                {game.screenshots && game.screenshots.map((shot, index) => (
                                    <img key={index} src={shot} alt={`${game.title} screenshot ${index + 1}`} />
                                ))}
                            </div>
                        </section>

                        <section className="requirements">
                            <h2>System Requirements</h2>
                            <div className="req-grid">
                                <div className="req-column">
                                    <h3>Minimum</h3>
                                    <ul>
                                        <li><strong>OS:</strong> {game.minRequirements?.os || "N/A"}</li>
                                        <li><strong>Processor:</strong> {game.minRequirements?.processor || "N/A"}</li>
                                        <li><strong>Memory:</strong> {game.minRequirements?.memory || "N/A"}</li>
                                        <li><strong>Graphics:</strong> {game.minRequirements?.graphics || "N/A"}</li>
                                        <li><strong>Storage:</strong> {game.minRequirements?.storage || "N/A"}</li>
                                    </ul>
                                </div>
                                <div className="req-column">
                                    <h3>Recommended</h3>
                                    <ul>
                                        <li><strong>OS:</strong> {game.recRequirements?.os || "N/A"}</li>
                                        <li><strong>Processor:</strong> {game.recRequirements?.processor || "N/A"}</li>
                                        <li><strong>Memory:</strong> {game.recRequirements?.memory || "N/A"}</li>
                                        <li><strong>Graphics:</strong> {game.recRequirements?.graphics || "N/A"}</li>
                                        <li><strong>Storage:</strong> {game.recRequirements?.storage || "N/A"}</li>
                                    </ul>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div className="game-sidebar">
                        <div className="download-card">
                            <h3>Download {game.title}</h3>
                            <p>Size: {game.size}</p>
                            <a href={game.downloadUrl} className="download-btn" target="_blank" rel="noopener noreferrer">Download Now</a>
                        </div>
                        
                        <div className="info-card">
                            <h3>Game Info</h3>
                            <ul>
                                <li><strong>Developer:</strong> {game.developer}</li>
                                <li><strong>Publisher:</strong> {game.publisher}</li>
                                <li><strong>Release Date:</strong> {game.releaseDate}</li>
                                <li><strong>Genre:</strong> Action-Adventure</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default GameDetails;