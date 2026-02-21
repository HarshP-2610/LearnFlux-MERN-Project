import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css'; // Reusing styles for consistency

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await axios.post('http://localhost:5000/api/auth/signup', {
                name,
                email,
                password
            });

            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));

            if (res.data.user.role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/');
            }
        } catch (err) {
            setError(err.response?.data?.msg || 'An error occurred during signup');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                {/* Left Side: Visual/Educational Branding */}
                <div className="login-visual" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800')" }}>
                    <div className="visual-content">
                        <Link to="/" className="visual-logo">
                            <div className="logo-sq">L</div>
                            <span>LearnFlux</span>
                        </Link>
                        <h2 className="visual-title">Start Your Learning Journey Today</h2>
                        <p className="visual-text">
                            Create an account to track your progress, earn certificates, and
                            join a community of 50,000+ ambitious learners.
                        </p>
                        <div className="visual-testimonial">
                            <p className="quote">"Building a habit of daily learning was the best thing I did for my professional life."</p>
                            <div className="author">
                                <strong>James R.</strong>
                                <span>Full Stack Developer</span>
                            </div>
                        </div>
                    </div>
                    <div className="visual-bg-overlay"></div>
                </div>

                {/* Right Side: Signup Form */}
                <div className="login-form-side">
                    <div className="form-header">
                        <h1>Create Account</h1>
                        <p>Join our community of world-class learners.</p>
                    </div>

                    {error && <div className="error-badge">{error}</div>}

                    <form className="login-form" onSubmit={handleSignup}>
                        <div className="form-group">
                            <label htmlFor="name">Full Name</label>
                            <input
                                type="text"
                                id="name"
                                placeholder="John Doe"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

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
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Create a strong password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div className="remember-me">
                            <input type="checkbox" id="terms" required />
                            <label htmlFor="terms">I agree to the <a href="#" style={{ color: 'var(--primary)' }}>Terms of Service</a> and <a href="#" style={{ color: 'var(--primary)' }}>Privacy Policy</a></label>
                        </div>

                        <button type="submit" className="btn-signin" disabled={loading}>
                            {loading ? 'Creating Account...' : 'Sign Up'}
                        </button>

                        <button type="button" className="btn-google">
                            <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" alt="Google" />
                            Sign up with Google
                        </button>
                    </form>

                    <p className="signup-link">
                        Already have an account? <Link to="/login">Sign in</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
