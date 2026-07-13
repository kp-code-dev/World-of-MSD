import Header from '../Components/Header';
import Footer from '../Components/Footer';

function FAQs() {
    return (
        <>
            <Header />
            <div className="content-container">
                <h1>Frequently Asked Questions</h1>
                
                <div>
                    <h3>Are the games really free?</h3>
                    <p>Yes, all games on World of MSD are completely free to download and play.</p>
                </div>

                <div>
                    <h3>Do I need to install the games?</h3>
                    <p>No, our games are pre-installed. You just need to download, extract, and play.</p>
                </div>

                <div>
                    <h3>Is it safe to download?</h3>
                    <p>Absolutely. We test all our files to ensure they are free from viruses and malware.</p>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default FAQs;