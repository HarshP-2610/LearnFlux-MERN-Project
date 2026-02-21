import React from 'react';

const MyCourses = () => {
    return (
        <div style={{ padding: '40px', background: 'white', borderRadius: '24px', boxShadow: '0 10px 40px rgba(15,23,42,0.04)', border: '1px solid #e2e8f0' }}>
            <h2 style={{ fontSize: '1.6rem', color: '#0f172a', margin: '0 0 10px 0' }}>My Learning</h2>
            <p style={{ color: '#64748b', fontSize: '1rem' }}>Access all your enrolled courses and continue where you left off.</p>
            <div style={{ marginTop: '40px', textAlign: 'center', padding: '60px', border: '2px dashed #e2e8f0', borderRadius: '16px' }}>
                <span style={{ fontSize: '2rem' }}>📚</span>
                <h3 style={{ marginTop: '16px', color: '#0f172a' }}>You are actively learning!</h3>
                <p style={{ color: '#64748b' }}>Your course library is being synced securely.</p>
            </div>
        </div>
    );
};

export default MyCourses;
