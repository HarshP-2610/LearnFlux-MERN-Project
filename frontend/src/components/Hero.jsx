import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
    return (
        <section className="hero-clean">
            <div className="container hero-layout">
                <div className="hero-info">
                    <span className="badge">World-Class Education</span>
                    <h1 className="hero-title">
                        Build Skills That <span className="highlight">Shape The Future</span>
                    </h1>
                    <p className="hero-text">
                        Join over 50,000 learners mastering data science, AI, and design with
                        curated paths built by industry experts. Professional, structured,
                        and results-driven learning.
                    </p>
                    <div className="hero-actions">
                        <Link to="/signup" className="btn-primary">Explore All Courses</Link>
                        <Link to="/signup" className="btn-secondary">Learn For Business</Link>
                    </div>
                    <div className="hero-trust">
                        <span className="trust-text">Trusted by leading companies</span>
                        <div className="trust-logos">
                            <span>Google</span>
                            <span>Amazon</span>
                            <span>Microsoft</span>
                        </div>
                    </div>
                </div>
                <div className="hero-visual">
                    <div className="image-card">
                        <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800" alt="Students Learning" />
                        <div className="floating-stat">
                            <span className="stat-val">95%</span>
                            <span className="stat-label">Completion Rate</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
