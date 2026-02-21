import React from 'react';

const Certificates = () => {
    return (
        <div style={{ padding: '40px', background: 'white', borderRadius: '24px', boxShadow: '0 10px 40px rgba(15,23,42,0.04)', border: '1px solid #e2e8f0' }}>
            <h2 style={{ fontSize: '1.6rem', color: '#0f172a', margin: '0 0 10px 0' }}>My Certificates</h2>
            <p style={{ color: '#64748b', fontSize: '1rem' }}>Download and share your achievements.</p>
            <div style={{ marginTop: '40px', textAlign: 'center', padding: '60px', border: '2px dashed #e2e8f0', borderRadius: '16px' }}>
                <span style={{ fontSize: '2rem' }}>🎓</span>
                <h3 style={{ marginTop: '16px', color: '#0f172a' }}>No certificates yet.</h3>
                <p style={{ color: '#64748b' }}>Complete a course down to 100% to unlock your digital certificates.</p>
            </div>
        </div>
    );
};

export default Certificates;
