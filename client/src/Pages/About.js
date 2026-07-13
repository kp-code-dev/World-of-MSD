import Header from '../Components/Header';
import Footer from '../Components/Footer';

function About() {
    return (
        <>
            <Header />
            <div className="content-container">
                <h1>About World of MSD</h1>
                <p>
                    World of MSD is your premier destination for free, pre-installed games. 
                    We believe that gaming should be accessible to everyone, which is why we provide 
                    a vast library of games that are ready to play without the hassle of installation.
                </p>
                <p>
                    Our team is dedicated to curating the best games and ensuring they are safe and 
                    easy to download. We compress our games to save your bandwidth and storage space 
                    without compromising on quality.
                </p>
            </div>
            <Footer />
        </>
    )
}

export default About;