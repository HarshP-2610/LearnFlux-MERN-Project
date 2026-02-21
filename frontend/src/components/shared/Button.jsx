import React from 'react';
import './Shared.css';

const Button = ({ children, variant = 'primary', onClick, disabled, className = '', type = 'button' }) => {
    return (
        <button
            type={type}
            className={`shared-btn btn-${variant} ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;
