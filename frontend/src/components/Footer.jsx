import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer-professional">
            <div className="container">
                <div className="footer-top-row">
                    <div className="footer-info-col">
                        <div className="brand">
                            <div className="logo-sq">L</div>
                            <span>LearnFlux</span>
                        </div>
                        <p className="footer-about">
                            Providing world-class education tools and resources to help professionals
                            advance their careers in technology and design.
                        </p>
                    </div>

                    <div className="footer-links-row">
                        <div className="link-group">
                            <h4>Platform</h4>
                            <ul>
                                <li><a href="#">Courses</a></li>
                                <li><a href="#">Pricing</a></li>
                                <li><a href="#">Enterprise</a></li>
                            </ul>
                        </div>
                        <div className="link-group">
                            <h4>Company</h4>
                            <ul>
                                <li><a href="#">About Us</a></li>
                                <li><a href="#">Careers</a></li>
                                <li><a href="#">Blog</a></li>
                            </ul>
                        </div>
                        <div className="link-group">
                            <h4>Support</h4>
                            <ul>
                                <li><a href="#">Help Center</a></li>
                                <li><a href="#">Contact</a></li>
                                <li><a href="#">Privacy</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom-row">
                    <p>© 2026 LearnFlux. All rights reserved.</p>
                    <div className="footer-social">
                        <a href="#">LinkedIn</a>
                        <a href="#">Twitter</a>
                        <a href="#">GitHub</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
