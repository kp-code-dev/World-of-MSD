import React, { useState } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Button from '../Components/Button';
import '../Styles/ContactUs.css';

function ContactUs() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Thank you ${formData.name}, we have received your message!`);
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <>
            <Header />
            <div className="content-container" style={{ maxWidth: '600px' }}>
                <h1>Contact Us</h1>
                <form onSubmit={handleSubmit} className="contact-form">
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input 
                            type="text" 
                            id="name" 
                            name="name" 
                            value={formData.name} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            value={formData.email} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Message</label>
                        <textarea 
                            id="message" 
                            name="message" 
                            value={formData.message} 
                            onChange={handleChange} 
                            required 
                            rows="5"
                        ></textarea>
                    </div>
                    <Button className="send-btn" text="Send Message" style={{ width: '100%', cursor: 'pointer', marginTop: '10px' }} />
                </form>
            </div>
            <Footer />
        </>
    )
}

export default ContactUs;