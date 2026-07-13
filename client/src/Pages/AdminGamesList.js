import React, { useState, useEffect } from 'react';
import '../Styles/Admin.css';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const AdminGamesList = ({ onEdit, onAddNew }) => {
    const [games, setGames] = useState([]);

    useEffect(() => {
        fetchGames();
    }, []);

    const fetchGames = async () => {
        try {
            const res = await fetch('/api/games');
            const data = await res.json();
            setGames(data);
        } catch (error) {
            console.error("Error fetching games:", error);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this game?")) return;

        const token = localStorage.getItem('adminToken');
        try {
            const res = await fetch(`/api/games/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (res.ok) {
                alert("Game deleted.");
                fetchGames();
            } else {
                alert("Failed to delete game.");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="admin-container">
            <div className="admin-header">
                <h1>Manage Games</h1>
                <button className="submit-btn" onClick={onAddNew}><FaPlus /> Add New Game</button>
            </div>
            <table className="admin-table">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Title</th>
                        <th>ID</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {games.map(game => (
                        <tr key={game.id}>
                            <td><img src={game.image} alt={game.title} width="60" /></td>
                            <td>{game.title}</td>
                            <td>{game.id}</td>
                            <td className="actions-cell">
                                <button className="edit-btn" onClick={() => onEdit(game.id)}><FaEdit /> Edit</button>
                                <button className="delete-btn" onClick={() => handleDelete(game.id)}><FaTrash /> Delete</button>
                            </td>
                        </tr>
                    ))}
                    {games.length === 0 && (
                        <tr><td colSpan="4">No games found.</td></tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default AdminGamesList;
