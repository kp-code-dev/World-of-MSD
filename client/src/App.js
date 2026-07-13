import { Routes, Route } from "react-router-dom";
import { useEffect } from 'react';
import './App.css';
import './Styles/ContentPages.css';
import ProtectedRoute from './Components/ProtectedRoute';
import ScrollToTop from './Components/ScrollToTop';

// Standard imports instead of lazy loading to prevent annoying flickering for small app
import Home from './Pages/Home';
import Games from './Pages/Games';
import GameDetails from './Pages/GameDetails';
import About from './Pages/About';
import FAQs from './Pages/FAQs';
import ContactUs from './Pages/ContactUs';
import PrivacyPolicy from './Pages/PrivacyPolicy';
import TermsConditions from './Pages/Terms&Conditions';
import AdminLogin from './Pages/AdminLogin';
import AdminDashboard from './Pages/AdminDashboard';

function App() {
    useEffect(() => {
        fetch('/api/settings')
            .then(res => res.json())
            .then(data => {
                if (data && data.faviconUrl) {
                    let link = document.querySelector("link[rel~='icon']");
                    if (!link) {
                        link = document.createElement('link');
                        link.rel = 'icon';
                        document.head.appendChild(link);
                    }
                    link.href = data.faviconUrl;
                }
            })
            .catch(err => console.error("Error setting favicon:", err));
    }, []);

    return(
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/games" element={<Games />} />
                <Route path="/games/:id" element={<GameDetails />} />
                <Route path="/about" element={<About />} />
                <Route path="/faqs" element={<FAQs />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-conditions" element={<TermsConditions />} />
                <Route path="/admin" element={<AdminLogin />} />
                <Route path="/admin/dashboard/*" element={
                    <ProtectedRoute>
                        <AdminDashboard />
                    </ProtectedRoute>
                } />
            </Routes>
            <ScrollToTop />
        </>
    )
}

export default App;