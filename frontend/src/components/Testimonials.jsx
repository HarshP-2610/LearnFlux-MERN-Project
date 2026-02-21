import React from 'react';
import './Testimonials.css';

const testimonials = [
    { id: 1, name: 'Sarah Johnson', role: 'Data Scientist at TechSoft', text: 'The AI pathways here are incredible. I sharpened my skills and landed a promotion within months.' },
    { id: 2, name: 'Mark Thompson', role: 'UI/UX Designer', text: 'Clean, professional, and results-driven. The courses are of very high quality.' },
    { id: 3, name: 'Elena Rodriguez', role: 'Student', text: 'Best investment I have made for my career transition. The mentorship program is top-notch.' }
];

const Testimonials = () => {
    return (
        <section className="section-padding bg-alt" id="testimonials">
            <div className="container">
                <div className="section-header text-center" style={{ textAlign: 'center' }}>
                    <span className="badge">Student Stories</span>
                    <h2 className="section-title">What Our Learners Say</h2>
                </div>

                <div className="testi-grid">
                    {testimonials.map((t) => (
                        <div key={t.id} className="testi-card">
                            <p className="testi-text">"{t.text}"</p>
                            <div className="testi-user">
                                <div className="testi-avatar">{t.name[0]}</div>
                                <div className="testi-info">
                                    <h4 className="testi-name">{t.name}</h4>
                                    <p className="testi-role">{t.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
