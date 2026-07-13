import Header from '../Components/Header';
import Footer from '../Components/Footer';

function TermsConditions() {
    return (
        <>
            <Header />
            <div className="container-2" style={{ marginTop: '100px', flexDirection: 'column' }}>
                <h1>Terms & Conditions</h1>
                <p>
                    Welcome to World of MSD. By accessing and using this website, you agree to comply with and be bound 
                    by the following terms and conditions.
                </p>
                <h3>Use of Content</h3>
                <p>
                    All content provided on this website is for informational and entertainment purposes only. 
                    You may not modify, reproduce, or distribute any content without our prior written permission.
                </p>
                <h3>Disclaimer</h3>
                <p>
                    We do not guarantee the accuracy or completeness of the information on this website. 
                    Use of any information or materials on this website is entirely at your own risk.
                </p>
            </div>
            <Footer />
        </>
    )
}

export default TermsConditions; 