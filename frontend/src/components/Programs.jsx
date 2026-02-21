import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Programs.css';

const Programs = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTopCourses = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/courses');
                const topCourses = res.data
                    .filter(c => !c.status || c.status === 'published')
                    .sort((a, b) => b.rating - a.rating)
                    .slice(0, 3);
                setCourses(topCourses);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching programs", err);
                setLoading(false);
            }
        };
        fetchTopCourses();
    }, []);

    return (
        <section className="section-padding bg-alt" id="courses">
            <div className="container">
                <div className="section-header">
                    <span className="badge">Featured Programs</span>
                    <h2 className="section-title">Explore Our Top Courses</h2>
                    <p className="section-subtitle">
                        Master in-demand skills with our specialized training programs designed
                        for professional growth and career transition.
                    </p>
                </div>

                <div className="courses-grid">
                    {loading ? (
                        <p>Loading featured programs...</p>
                    ) : courses.length > 0 ? (
                        courses.map((course) => (
                            <div key={course._id} className="course-card">
                                <div className="card-image">
                                    <img src={course.image} alt={course.title} />
                                    <span className="card-tag">{course.category}</span>
                                </div>
                                <div className="card-body">
                                    <div className="card-meta">
                                        <span className="rating">⭐ {course.rating}</span>
                                        <span className="students">⏱️ {course.duration}</span>
                                    </div>
                                    <h3 className="card-name">{course.title}</h3>
                                    <div className="card-foot">
                                        <span className="course-price-small">${course.price}</span>
                                        <Link to="/courses" className="btn-text">View Details →</Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No featured courses at the moment.</p>
                    )}
                </div>

                <div className="section-footer">
                    <Link to="/courses" className="btn-secondary">Explore All {courses.length > 0 ? 'Available' : '500+'} Courses</Link>
                </div>
            </div>
        </section>
    );
};

export default Programs;
