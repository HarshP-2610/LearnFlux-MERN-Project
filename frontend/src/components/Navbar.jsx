import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDashboardRedirect = () => {
    if (user) {
      if (user.role === 'admin') navigate('/admin');
      else if (user.role === 'instructor') navigate('/instructor');
      else navigate('/student');
    } else {
      navigate('/login');
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-wrap">
        <Link to="/" className="nav-brand">
          <div className="brand-logo">L</div>
          <span>LearnFlux</span>
        </Link>

        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/courses">Courses</Link></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#pricing">Pricing</a></li>
          <li><a href="#testimonials">Testimonials</a></li>
        </ul>

        <div className="nav-btns">
          {user ? (
            <button onClick={handleDashboardRedirect} className="btn-dashboard">
              My Dashboard
            </button>
          ) : (
            <>
              <Link to="/login" className="btn-login">Sign In</Link>
              <Link to="/signup" className="btn-signup">Start For Free</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
