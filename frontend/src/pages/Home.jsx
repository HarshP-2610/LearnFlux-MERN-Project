import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Programs from '../components/Programs';
import Pricing from '../components/Pricing';
import CareerCTA from '../components/CareerCTA';
import Testimonials from '../components/Testimonials';
import Certifications from '../components/Certifications';
import Footer from '../components/Footer';

const Home = () => {
    return (
        <>
            <Navbar />
            <Hero />
            <Programs />
            <Pricing />
            <CareerCTA />
            <Testimonials />
            <Certifications />
            <Footer />
        </>
    );
};

export default Home;
