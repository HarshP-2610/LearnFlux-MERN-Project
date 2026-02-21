import React from 'react';
import './Certifications.css';

const Certifications = () => {
    return (
        <section className="section-padding">
            <div className="container cert-flex">
                <div className="cert-info-box">
                    <span className="badge">Industry Recognized</span>
                    <h2 className="section-title">Verified Certifications</h2>
                    <p className="section-subtitle">
                        Earn certificates that carry weight in the industry. Our programs
                        are designed to provide you with credentials recognized by top-tier
                        technology companies worldwide.
                    </p>
                    <div className="cert-list">
                        <div className="cert-item">
                            <span className="check-mark">✓</span>
                            <span>Shareable on LinkedIn & Resumes</span>
                        </div>
                        <div className="cert-item">
                            <span className="check-mark">✓</span>
                            <span>Unique Verification ID for Employers</span>
                        </div>
                        <div className="cert-item">
                            <span className="check-mark">✓</span>
                            <span>Lifetime Access to Earned Badges</span>
                        </div>
                    </div>
                </div>
                <div className="cert-logos">
                    <div className="logo-grid">
                        <div className="logo-box">CompTIA</div>
                        <div className="logo-box">AWS</div>
                        <div className="logo-box">Microsoft</div>
                        <div className="logo-box">Google</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Certifications;
