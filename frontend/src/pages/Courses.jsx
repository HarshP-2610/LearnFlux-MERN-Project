import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Courses.css';

const categories = ["All", "Artificial Intelligence", "Web Development", "UI/UX Design", "Data Science", "Business"];

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [activeCategory, setActiveCategory] = useState("All");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const publishedCourses = res.data.filter(c => !c.status || c.status === 'published');
                setCourses(publishedCourses);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching courses", err);
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);

    const filteredCourses = activeCategory === "All"
        ? courses
        : courses.filter(c => c.category === activeCategory);

    return (
        <div className="courses-page">
            <Navbar />

            <main className="courses-main">
                <header className="courses-hero">
                    <div className="container">
                        <span className="badge">Knowledge Catalog</span>
                        <h1 className="courses-title">Advance Your Career with <br />Expert-Led <span className="highlight">Courses</span></h1>
                        <p className="courses-subtitle">Browse through our curated collection of industry-recognized programs.</p>
                    </div>
                </header>

                <section className="courses-filter-section">
                    <div className="container">
                        <div className="category-tabs">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    className={`cat-tab ${activeCategory === cat ? 'active' : ''}`}
                                    onClick={() => setActiveCategory(cat)}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        <div className="courses-results-grid">
                            {loading ? (
                                <p>Loading curated courses...</p>
                            ) : filteredCourses.length > 0 ? (
                                filteredCourses.map(course => (
                                    <div key={course._id} className="full-course-card">
                                        <div className="course-img-box">
                                            <img src={course.image} alt={course.title} />
                                            <span className="course-cat-tag">{course.category}</span>
                                        </div>
                                        <div className="course-details-box">
                                            <div className="course-meta-top">
                                                <span className="course-level">{course.level}</span>
                                                <span className="course-rating">⭐ {course.rating}</span>
                                            </div>
                                            <h3 className="course-name-full">{course.title}</h3>
                                            <p className="course-desc-full">{course.description}</p>
                                            <div className="course-instructor-info">
                                                <span className="inst-label">Instructor:</span>
                                                <span className="inst-name">{course.instructor}</span>
                                            </div>
                                            <div className="course-stats-row">
                                                <span>⏱️ {course.duration}</span>
                                                <span className="course-price-full">${course.price}</span>
                                            </div>
                                            <button className="btn-enroll">View Course Details</button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No courses found in this category.</p>
                            )}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default Courses;
