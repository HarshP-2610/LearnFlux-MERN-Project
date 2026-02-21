import React from 'react';
import './CareerCTA.css';

const CareerCTA = () => {
    return (
        <section className="section-padding bg-secondary text-white">
            <div className="container cta-flex">
                <div className="cta-info">
                    <h2 className="cta-title-clean">Empower Your Team With World-Class Training</h2>
                    <p className="cta-text-clean">
                        Provide your employees with access to over 500 expert-led courses.
                        Track progress, set custom paths, and build a high-performance culture.
                    </p>
                    <div className="cta-btns">
                        <button className="btn-white">Get Started for Business</button>
                        <button className="btn-outline-white">Speak to an Expert</button>
                    </div>
                </div>
                <div className="cta-image-wrap">
                    <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800" alt="Team Training" className="cta-img" />
                </div>
            </div>
        </section>
    );
};

export default CareerCTA;
