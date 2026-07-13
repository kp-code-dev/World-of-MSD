import React, { useState } from 'react';
import '../Styles/Admin.css';

const AddGame = ({ onBack }) => {
    const [formData, setFormData] = useState({
        id: '', title: '', image: '', label: '', description: '', developer: '', publisher: '', releaseDate: '', size: '', downloadUrl: '', playUrl: '', keywords: '', screenshots: '', 
        minOs: '', minProcessor: '', minMemory: '', minGraphics: '', minStorage: '',
        recOs: '', recProcessor: '', recMemory: '', recGraphics: '', recStorage: ''
    });

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('adminToken');
        if (!token) return alert("Session expired.");

        const finalData = {
            id: formData.id, title: formData.title, image: formData.image, label: formData.title, description: formData.description, developer: formData.developer, publisher: formData.publisher, releaseDate: formData.releaseDate, size: formData.size, downloadUrl: formData.downloadUrl, playUrl: formData.playUrl,
            keywords: formData.keywords.split(',').map(i => i.trim()), 
            screenshots: formData.screenshots.split(',').map(i => i.trim()),
            minRequirements: { os: formData.minOs, processor: formData.minProcessor, memory: formData.minMemory, graphics: formData.minGraphics, storage: formData.minStorage },
            recRequirements: { os: formData.recOs, processor: formData.recProcessor, memory: formData.recMemory, graphics: formData.recGraphics, storage: formData.recStorage }
        };

        try {
            const res = await fetch('/api/games', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify(finalData)
            });

            if (res.ok) {
                alert("Game Added Successfully!");
                onBack(); // Go back to games list
            } else {
                alert("Failed to add game. Make sure ID is unique.");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="admin-container">
            <div className="admin-header">
                <h1>Add New Game</h1>
                <button className="admin-back-btn" onClick={onBack}>&larr; Back to List</button>
            </div>
            <form onSubmit={handleSubmit} className="admin-form">
                <div className="form-section">
                    <h3>Basic Information</h3>
                    <div className="form-row">
                        <div className="form-group"><input type="text" name="id" placeholder="Unique ID (e.g. gta-v)" value={formData.id} onChange={handleChange} required className="form-input" /></div>
                        <div className="form-group"><input type="text" name="title" placeholder="Game Title" value={formData.title} onChange={handleChange} required className="form-input" /></div>
                    </div>
                    <div className="form-group"><input type="text" name="image" placeholder="Main Image URL" value={formData.image} onChange={handleChange} required className="form-input" /></div>
                    <div className="form-group"><textarea name="description" placeholder="Game Description" value={formData.description} onChange={handleChange} required className="form-textarea" /></div>
                    <div className="form-row">
                        <div className="form-group"><input type="text" name="developer" placeholder="Developer" value={formData.developer} onChange={handleChange} className="form-input" /></div>
                        <div className="form-group"><input type="text" name="publisher" placeholder="Publisher" value={formData.publisher} onChange={handleChange} className="form-input" /></div>
                    </div>
                    <div className="form-row">
                        <div className="form-group"><input type="text" name="releaseDate" placeholder="Release Date" value={formData.releaseDate} onChange={handleChange} className="form-input" /></div>
                        <div className="form-group"><input type="text" name="size" placeholder="Size (e.g. 100 GB)" value={formData.size} onChange={handleChange} className="form-input" /></div>
                    </div>
                    <div className="form-group"><input type="text" name="downloadUrl" placeholder="Download URL" value={formData.downloadUrl} onChange={handleChange} className="form-input" /></div>
                </div>

                <div className="form-section">
                    <h3>Keywords & Screenshots</h3>
                    <div className="form-group"><input type="text" name="keywords" placeholder="Keywords (comma separated)" value={formData.keywords} onChange={handleChange} className="form-input" /></div>
                    <div className="form-group"><textarea name="screenshots" placeholder="Screenshot URLs (comma separated)" value={formData.screenshots} onChange={handleChange} className="form-textarea" /></div>
                </div>

                <div className="form-row" style={{ alignItems: 'flex-start' }}>
                    <div className="form-section" style={{ flex: 1 }}>
                        <h3>Minimum Requirements</h3>
                        <div className="form-group"><input type="text" name="minOs" placeholder="OS" value={formData.minOs} onChange={handleChange} className="form-input" /></div>
                        <div className="form-group"><input type="text" name="minProcessor" placeholder="Processor" value={formData.minProcessor} onChange={handleChange} className="form-input" /></div>
                        <div className="form-group"><input type="text" name="minMemory" placeholder="Memory" value={formData.minMemory} onChange={handleChange} className="form-input" /></div>
                        <div className="form-group"><input type="text" name="minGraphics" placeholder="Graphics" value={formData.minGraphics} onChange={handleChange} className="form-input" /></div>
                        <div className="form-group"><input type="text" name="minStorage" placeholder="Storage" value={formData.minStorage} onChange={handleChange} className="form-input" /></div>
                    </div>
                    <div className="form-section" style={{ flex: 1 }}>
                        <h3>Recommended Requirements</h3>
                        <div className="form-group"><input type="text" name="recOs" placeholder="OS" value={formData.recOs} onChange={handleChange} className="form-input" /></div>
                        <div className="form-group"><input type="text" name="recProcessor" placeholder="Processor" value={formData.recProcessor} onChange={handleChange} className="form-input" /></div>
                        <div className="form-group"><input type="text" name="recMemory" placeholder="Memory" value={formData.recMemory} onChange={handleChange} className="form-input" /></div>
                        <div className="form-group"><input type="text" name="recGraphics" placeholder="Graphics" value={formData.recGraphics} onChange={handleChange} className="form-input" /></div>
                        <div className="form-group"><input type="text" name="recStorage" placeholder="Storage" value={formData.recStorage} onChange={handleChange} className="form-input" /></div>
                    </div>
                </div>

                <div className="form-section">
                    <h3>Play URL</h3>
                    <div className="form-group"><input type="text" name="playUrl" placeholder="Play URL / Iframe Link (Optional)" value={formData.playUrl} onChange={handleChange} className="form-input" /></div>
                </div>

                <button type="submit" className="submit-btn" style={{width: '100%', padding: '15px'}}>Save Game to Database</button>
            </form>
        </div>
    );
};

export default AddGame;