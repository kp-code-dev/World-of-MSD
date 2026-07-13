import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/Admin.css';
import AdminGamesList from './AdminGamesList';
import AdminSlides from './AdminSlides';
import AdminSettings from './AdminSettings';
import AddGame from './AddGame';
import EditGame from './EditGame';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('games'); // games, add_game, edit_game, slides, settings
    const [editGameId, setEditGameId] = useState(null);

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        navigate('/admin');
    };

    const renderContent = () => {
        switch(activeTab) {
            case 'games':
                return <AdminGamesList onEdit={(id) => { setEditGameId(id); setActiveTab('edit_game'); }} onAddNew={() => setActiveTab('add_game')} />;
            case 'add_game':
                return <AddGame onBack={() => setActiveTab('games')} />;
            case 'edit_game':
                return <EditGame gameId={editGameId} onBack={() => setActiveTab('games')} />;
            case 'slides':
                return <AdminSlides />;
            case 'settings':
                return <AdminSettings />;
            default:
                return <AdminGamesList onEdit={(id) => { setEditGameId(id); setActiveTab('edit_game'); }} onAddNew={() => setActiveTab('add_game')} />;
        }
    };

    return (
        <div className="admin-layout">
            <aside className="admin-sidebar">
                <h2>Admin Panel</h2>
                <nav>
                    <button className={activeTab === 'games' || activeTab === 'add_game' || activeTab === 'edit_game' ? 'active' : ''} onClick={() => setActiveTab('games')}>Manage Games</button>
                    <button className={activeTab === 'slides' ? 'active' : ''} onClick={() => setActiveTab('slides')}>Manage Slides</button>
                    <button className={activeTab === 'settings' ? 'active' : ''} onClick={() => setActiveTab('settings')}>Site Settings</button>
                </nav>
                <div className="sidebar-footer">
                    <button className="ext-btn" onClick={handleLogout}>Logout</button>
                </div>
            </aside>
            <main className="admin-main-content">
                {renderContent()}
            </main>
        </div>
    );
};

export default AdminDashboard;
