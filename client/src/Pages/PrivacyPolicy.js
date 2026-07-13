import Header from '../Components/Header';
import Footer from '../Components/Footer';

function PrivacyPolicy() {
    return (
        <>
            <Header />
            <div className="content-container">
                <h1>Privacy Policy</h1>
                <p>
                    At World of MSD, we take your privacy seriously. This Privacy Policy explains how we collect, 
                    use, and protect your personal information when you use our website.
                </p>
                <h3>Information We Collect</h3>
                <p>
                    We may collect non-personal information about your visit, such as your IP address, browser type, 
                    and the pages you visit. This information is used to improve our website and user experience.
                </p>
                <h3>Cookies</h3>
                <p>
                    We use cookies to enhance your experience on our site. You can choose to disable cookies in your 
                    browser settings, but this may affect the functionality of the website.
                </p>
            </div>
            <Footer />
        </>
    )
}

export default PrivacyPolicy;