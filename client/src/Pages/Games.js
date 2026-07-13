import React, { useState, useEffect } from 'react';
import GameCard from '../Components/GameCard';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
// import { gamesData } from '../Data/games'; 
import { useLocation } from 'react-router-dom';

function Games() {
    const [searchTerm, setSearchTerm] = useState("");
    const [games, setGames] = useState([]);
    const location = useLocation();

    useEffect(() => {
        fetch('/api/games')
            .then(response => response.json())
            .then(data => {
                setGames(data);
            })
            .catch(error => console.error("Error fetching games:", error));
    }, []);

    useEffect(() => {
        if (location.state && location.state.searchTerm) {
            setSearchTerm(location.state.searchTerm);
        }
    }, [location]);

    const filteredGames = games.filter(game => {
        const searchLower = searchTerm.toLowerCase();
        const titleMatch = game.title.toLowerCase().includes(searchLower);
        const keywordMatch = game.keywords && game.keywords.some(keyword => keyword.toLowerCase().includes(searchLower));
        return titleMatch || keywordMatch;
    });

    return (
        <>
            <Header onSearch={setSearchTerm} />
            <div style={{ marginTop: '100px', textAlign: 'center' }}>
                <h1>All Games</h1>
            </div>

            <main className="games-section" aria-label="All Games">
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
                            {games.length === 0 ? "Loading games..." : `No games found matching "${searchTerm}"`}
                        </p>
                    )}
                </div>
            </main>
            <Footer />
        </>
    )
}

export default Games;