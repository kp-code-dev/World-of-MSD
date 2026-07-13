import React from 'react';
import Article from './Article';
import { Link } from 'react-router-dom';

function GameCard({ id, title, image, label }) {
    return (
        <Link to={`/games/${id}`} style={{ textDecoration: 'none' }}>
            <Article className="game-card" tabIndex="0" aria-label={label}>
                <img src={image} alt={`${label} cover`} className="game-thumb" />
                <div className="game-info">
                    <span className="game-title">{title}</span>
                </div>
            </Article>
        </Link>
    );
}

export default GameCard;
