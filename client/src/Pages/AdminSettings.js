import React, { useState, useEffect } from 'react';
import '../Styles/Admin.css';

const AdminSettings = () => {
    const [settings, setSettings] = useState({
        logoUrl: '',
        faviconUrl: '',
        ourGoalText: '',
        officialSiteLink: '',
        facebookLink: '',
        instagramLink: '',
        telegramLink: '',
        youtubeLink: ''
    });

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await fetch('/api/settings');
                const data = await res.json();
                if (data) setSettings(data);
            } catch (error) {
                console.error("Error fetching settings", error);
            }
        };
        fetchSettings();
    }, []);

    const handleChange = (e) => {
        setSettings({ ...settings, [e.target.name]: e.target.value });
    };


    const handleSave = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('adminToken');
        try {
            const res = await fetch('/api/settings', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify(settings)
            });

            if (res.ok) {
                alert("Settings Updated successfully!");
            } else {
                alert("Failed to update settings.");
            }
        } catch (error) {
            console.error("Error", error);
        }
    };

    return (
        <div className="admin-container">
            <div className="admin-header">
                <h1>Site Settings</h1>
            </div>

            <form onSubmit={handleSave} className="admin-form">
                <div className="form-section">
                    <h3>Header & Tab Configuration</h3>
                    <div className="form-row">
                        <div className="form-group row-labeled" style={{flexDirection: "column", alignItems: "flex-start"}}>
                            <label>Logo Image URL</label>
                            {settings.logoUrl && <img src={settings.logoUrl} alt="Logo preview" height="40" style={{marginBottom: "10px", objectFit: "contain"}}/>}
                            <input type="text" name="logoUrl" placeholder="Enter Logo Image URL" value={settings.logoUrl || ''} onChange={handleChange} className="form-input" />
                        </div>
                        <div className="form-group row-labeled" style={{flexDirection: "column", alignItems: "flex-start"}}>
                            <label>Favicon URL (Browser Tab Icon)</label>
                            {settings.faviconUrl && <img src={settings.faviconUrl} alt="Favicon preview" height="40" style={{marginBottom: "10px", objectFit: "contain"}}/>}
                            <input type="text" name="faviconUrl" placeholder="Enter Favicon Image URL" value={settings.faviconUrl || ''} onChange={handleChange} className="form-input" />
                        </div>
                    </div>
                </div>

                <div className="form-section">
                    <h3>Social & External Links</h3>
                    <div className="form-group row-labeled">
                        <label>Facebook Link:</label>
                        <input type="text" name="facebookLink" placeholder="Enter Facebook Link" value={settings.facebookLink || ''} onChange={handleChange} className="form-input" />
                    </div>
                    <div className="form-group row-labeled">
                        <label>Instagram Link:</label>
                        <input type="text" name="instagramLink" placeholder="Enter Instagram Link" value={settings.instagramLink || ''} onChange={handleChange} className="form-input" />
                    </div>
                    <div className="form-group row-labeled">
                        <label>Telegram Link:</label>
                        <input type="text" name="telegramLink" placeholder="Enter Telegram Link" value={settings.telegramLink || ''} onChange={handleChange} className="form-input" />
                    </div>
                    <div className="form-group row-labeled">
                        <label>YouTube Link:</label>
                        <input type="text" name="youtubeLink" placeholder="Enter YouTube Link" value={settings.youtubeLink || ''} onChange={handleChange} className="form-input" />
                    </div>
                </div>

                <button type="submit" className="submit-btn" style={{ width: '100%', padding: '15px' }}>Save Settings</button>
            </form>
        </div>
    );
};

export default AdminSettings;
