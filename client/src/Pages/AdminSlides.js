import React, { useState, useEffect } from 'react';
import '../Styles/Admin.css';
import { FaTrash, FaPlus, FaEdit } from 'react-icons/fa';

const AdminSlides = () => {
    const [slides, setSlides] = useState([]);
    const [formData, setFormData] = useState({ image: '', link: '' });
    const [editMode, setEditMode] = useState(false);
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchSlides();
    }, []);

    const fetchSlides = async () => {
        try {
            const res = await fetch('/api/slides');
            const data = await res.json();
            setSlides(data);
        } catch (error) {
            console.error("Error fetching slides:", error);
        }
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('adminToken');
        
        try {
            const url = editMode ? `/api/slides/${editId}` : '/api/slides';
            const method = editMode ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                alert(editMode ? "Slide updated!" : "Slide added.");
                setFormData({ image: '', link: '' });
                setEditMode(false);
                setEditId(null);
                fetchSlides();
            } else {
                alert("Failed to save slide.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Error saving slide");
        }
    };

    const handleEdit = (slide) => {
        setFormData({ image: slide.image, link: slide.link || '' });
        setEditMode(true);
        setEditId(slide._id);
        window.scrollTo(0, 0);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this slide?")) return;

        const token = localStorage.getItem('adminToken');
        try {
            const res = await fetch(`/api/slides/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (res.ok) {
                alert("Slide deleted.");
                fetchSlides();
            } else {
                alert("Failed to delete slide.");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const cancelEdit = () => {
        setFormData({ image: '', link: '' });
        setEditMode(false);
        setEditId(null);
    }

    return (
        <div className="admin-container">
            <div className="admin-header">
                <h1>Manage Slides</h1>
            </div>

            <form onSubmit={handleSubmit} className="admin-form" style={{ marginBottom: '30px', padding: '20px', background: '#8c0000', borderRadius: '8px' }}>
                <h3>{editMode ? "Edit Slide" : "Add New Slide"}</h3>
                
                <div className="form-group row-labeled" style={{flexDirection: "column", alignItems: "flex-start", marginBottom: '15px'}}>
                    <label>Slide Image URL</label>
                    {formData.image && <img src={formData.image} alt="Slide preview" height="60" style={{marginBottom: "10px", borderRadius: "4px", objectFit: "contain"}}/>}
                    <p style={{fontSize: '12px', marginTop: '5px', color: '#ffb3b3'}}>Paste image URL below:</p>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <input type="text" placeholder="Image URL" value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} required className="form-input" />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <input type="text" placeholder="Link (Optional) eg: /games/gta-v" value={formData.link} onChange={(e) => setFormData({ ...formData, link: e.target.value })} className="form-input" />
                    </div>
                </div>
                <div style={{display: 'flex', gap: '10px'}}>
                    <button type="submit" className="submit-btn" style={{ padding: '0 20px', height: '42px' }}>
                        {editMode ? <><FaEdit /> Update</> : <><FaPlus /> Add</>}
                    </button>
                    {editMode && <button type="button" className="admin-back-btn" onClick={cancelEdit}>Cancel</button>}
                </div>
            </form>

            <table className="admin-table">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>URL Link</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {slides.map(slide => (
                        <tr key={slide._id}>
                            <td><img src={slide.image} alt="slide" height="60" style={{ borderRadius: '5px' }} /></td>
                            <td>{slide.link || 'None'}</td>
                            <td className="actions-cell">
                                <button className="edit-btn" onClick={() => handleEdit(slide)}><FaEdit /> Edit</button>
                                <button className="delete-btn" onClick={() => handleDelete(slide._id)}><FaTrash /> Delete</button>
                            </td>
                        </tr>
                    ))}
                    {slides.length === 0 && (
                        <tr><td colSpan="3">No slides found.</td></tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default AdminSlides;
