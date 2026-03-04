import React from 'react'

const Footer = () => {
    return (
        <footer id="contact" className="footer">
            <div className="footer-content">
                <div className="footer-top">
                    <h2 className="footer-title">LETS</h2>
                    <h2 className="footer-title"><span>WORK</span></h2>
                    <h2 className="footer-title">TOGETHER</h2>
                </div>

                <div className="footer-middle">
                    <div className="footer-contact">
                        <span className="footer-label">GET IN TOUCH</span>
                        <a href="mailto:sahilsbc751@gmail.com" className="footer-email">sahilsbc751@gmail.com</a>
                    </div>

                    <div className="footer-socials">
                        <span className="footer-label">FOLLOW ME</span>
                        <div className="social-links-grid">
                            <a href="https://www.instagram.com/sahnoir_" target="_blank" rel="noopener noreferrer">INSTAGRAM ↗</a>
                            <a href="https://www.youtube.com/@sahil.mp4752" target="_blank" rel="noopener noreferrer">YOUTUBE ↗</a>
                            <a href="#">LINKEDIN ↗</a>
                            <a href="#">BEHANCE ↗</a>
                        </div>
                    </div>
                </div>

                <p className="footer-copyright">© 2026 SAHIL CHAVAN. ALL RIGHTS RESERVED.</p>
            </div>
        </footer>
    )
}

export default Footer
