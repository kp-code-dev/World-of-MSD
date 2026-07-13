import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { FaInstagram } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa6";
import { FaTelegram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";
import '../Styles/Footer.css';

function Footer() {
    const [settings, setSettings] = useState(null);

    useEffect(() => {
        fetch('/api/settings')
            .then(res => res.json())
            .then(data => setSettings(data))
            .catch(err => console.error("Error fetching settings:", err));
    }, []);

    // Fallbacks
    const fbLink = settings?.facebookLink || "https://www.facebook.com/thala.07.msd";
    const instaLink = settings?.instagramLink || "https://www.instagram.com/thala07_m.s.d";
    const teleLink = settings?.telegramLink || "https://t.me/kalpesh_mevada_05";
    const ytLink = settings?.youtubeLink || "https://www.youtube.com/@thala_07-msd";

    return (
        <footer>
            <div className="footer-container">
                <div className="footer-icons">
                    <a href={fbLink} target="_blank" rel="noopener noreferrer"><FaFacebook className="footer-icon" /></a>
                    <a href={instaLink} target="_blank" rel="noopener noreferrer"><FaInstagram className="footer-icon" /></a>
                    <a href={teleLink} target="_blank" rel="noopener noreferrer"><FaTelegram className="footer-icon" /></a>
                    <a href={ytLink} target="_blank" rel="noopener noreferrer"><FaYoutube className="footer-icon" /></a>
                </div>
                <nav className="footer-nav" role="navigation" aria-label="Footer Navigation">
                    <Link to="/about" tabIndex="0">About Us</Link>
                    <Link to="/privacy-policy" tabIndex="0">Privacy Policy</Link>
                    <Link to="/terms-conditions" tabIndex="0">Terms and Conditions</Link>
                    <Link to="/contact" tabIndex="0">Contact Us</Link>
                </nav>
                <div className="copyright">
                    &copy; All rights Reserved World of MSD.
                </div>
            </div>
        </footer>
    )
}

export default Footer;