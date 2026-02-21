import React, { useState } from 'react';
import './Pricing.css';

const Pricing = () => {
    const [isYearly, setIsYearly] = useState(false);

    const plans = [
        {
            name: 'Starter',
            price: isYearly ? '99' : '9',
            desc: 'For individuals starting their journey.',
            features: ['Access to 50 Courses', 'Community Support', 'Basic Certificate']
        },
        {
            name: 'Professional',
            price: isYearly ? '249' : '24',
            desc: 'The most popular choice for professionals.',
            features: ['Access to 500+ Courses', 'Mentorship Program', 'Verified Certificates', 'Offline Access'],
            isPopular: true
        },
        {
            name: 'Enterprise',
            price: 'Custom',
            desc: 'Custom solutions for high-scale teams.',
            features: ['Team Management', 'Custom Learning Paths', 'Dedicated Account Manager']
        }
    ];

    return (
        <section className="section-padding" id="pricing">
            <div className="container">
                <div className="section-header text-center" style={{ textAlign: 'center' }}>
                    <span className="badge">Pricing Plans</span>
                    <h2 className="section-title">Investment in Your Career</h2>
                    <p className="section-subtitle" style={{ margin: '0 auto 3rem' }}>
                        Choose the plan that best fits your goals. Transparent pricing with
                        no hidden fees.
                    </p>

                    <div className="billing-switch">
                        <span className={!isYearly ? 'active' : ''}>Monthly</span>
                        <div className="switch-bg" onClick={() => setIsYearly(!isYearly)}>
                            <div className={`switch-ball ${isYearly ? 'year' : ''}`}></div>
                        </div>
                        <span className={isYearly ? 'active' : ''}>Yearly <span className="save">Save 20%</span></span>
                    </div>
                </div>

                <div className="pricing-grid">
                    {plans.map((plan, i) => (
                        <div key={i} className={`price-card ${plan.isPopular ? 'popular' : ''}`}>
                            {plan.isPopular && <div className="pop-label">MOST POPULAR</div>}
                            <h3 className="p-name">{plan.name}</h3>
                            <div className="p-price">
                                <span className="unit">{plan.price === 'Custom' ? '' : '$'}</span>
                                <span className="amt">{plan.price}</span>
                                <span className="per">{plan.price === 'Custom' ? '' : (isYearly ? '/yr' : '/mo')}</span>
                            </div>
                            <p className="p-desc">{plan.desc}</p>

                            <ul className="p-list">
                                {plan.features.map((f, idx) => (
                                    <li key={idx}>✓ {f}</li>
                                ))}
                            </ul>

                            <button className={`p-btn ${plan.isPopular ? 'p-btn-fill' : 'p-btn-outline'}`}>
                                {plan.price === 'Custom' ? 'Contact Us' : 'Get Started'}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Pricing;
