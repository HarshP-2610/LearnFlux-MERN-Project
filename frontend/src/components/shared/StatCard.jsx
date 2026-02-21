import React from 'react';
import './Shared.css';

const StatCard = ({ title, value, subtext, icon: Icon, trend }) => {
    return (
        <div className="shared-stat-card">
            <div className="stat-content">
                <p className="stat-title">{title}</p>
                <div className="stat-main">
                    <h2>{value}</h2>
                    {trend && <span className={`trend ${trend > 0 ? 'positive' : 'negative'}`}>
                        {trend > 0 ? '+' : ''}{trend}%
                    </span>}
                </div>
                {subtext && <p className="stat-subtext">{subtext}</p>}
            </div>
            {Icon && <div className="stat-icon-wrapper"><Icon size={24} /></div>}
        </div>
    );
};

export default StatCard;
