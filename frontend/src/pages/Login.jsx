import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', {
                email,
                password
            });

            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));

            if (res.data.user.role === 'admin') {
                navigate('/admin');
            } else if (res.data.user.role === 'instructor') {
                navigate('/instructor');
            } else if (res.data.user.role === 'student') {
                navigate('/student');
            } else {
                navigate('/');
            }
        } catch (err) {
            setError(err.response?.data?.msg || 'An error occurred during login');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                {/* Left Side: Visual/Educational Branding */}
                <div className="login-visual">
                    <div className="visual-content">
                        <Link to="/" className="visual-logo">
                            <div className="logo-sq">L</div>
                            <span>LearnFlux</span>
                        </Link>
                        <h2 className="visual-title">Unlock Your Potential with LearnFlux</h2>
                        <p className="visual-text">
                            Join over 50,000+ professionals mastering the skills of tomorrow.
                            Access expert-led courses and certifications.
                        </p>
                        <div className="visual-testimonial">
                            <p className="quote">"LearnFlux changed my career trajectory. The AI insights were exactly what I needed."</p>
                            <div className="author">
                                <strong>Sarah J.</strong>
                                <span>Lead Data Scientist</span>
                            </div>
                        </div>
                    </div>
                    <div className="visual-bg-overlay"></div>
                </div>

                {/* Right Side: Login Form */}
                <div className="login-form-side">
                    <div className="form-header">
                        <h1>Welcome Back</h1>
                        <p>Please enter your details to sign in.</p>
                    </div>

                    {error && <div className="error-badge">{error}</div>}

                    <form className="login-form" onSubmit={handleLogin}>
                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="name@company.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <div className="label-row">
                                <label htmlFor="password">Password</label>
                                <a href="#" className="forgot-link">Forgot password?</a>
                            </div>
                            <input
                                type="password"
                                id="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div className="remember-me">
                            <input type="checkbox" id="remember" />
                            <label htmlFor="remember">Remember me for 30 days</label>
                        </div>

                        <button type="submit" className="btn-signin" disabled={loading}>
                            {loading ? 'Signing In...' : 'Sign In'}
                        </button>

                        <button type="button" className="btn-google">
                            <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" alt="Google" />
                            Sign in with Google
                        </button>
                    </form>

                    <p className="signup-link">
                        Don't have an account? <Link to="/signup">Sign up for free</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
