import React, { useState, useEffect } from 'react';
import { BookOpen, Users, Star, Plus, MoreVertical, Edit2, BarChart2, Trash2 } from 'lucide-react';
import { apiService } from '../../services/apiService';
import { courseService } from '../../api/courseService';
import CourseEditor from './CourseEditor';
import './CourseManager.css';

const CourseManager = () => {
    const [courses, setCourses] = useState([]);
    const [showCourseEditor, setShowCourseEditor] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const data = await courseService.getInstructorCourses();

                // Map the DB structure to frontend structure
                const mappedCourses = data.map(c => ({
                    id: c._id,
                    title: c.title,
                    category: c.category,
                    enrolled: Math.floor(Math.random() * 50) + 10, // dummy enrolled since it's not in schema
                    rating: c.rating || 4.5,
                    status: c.status || 'published'
                }));
                setCourses(mappedCourses);
            } catch (err) {
                console.error("Error fetching instructor courses:", err);
            }
        };
        fetchCourses();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Delete this course?')) {
            try {
                const courseDetails = courses.find(c => c.id === id);
                await apiService.submitRequest('DELETE', courseDetails, id);

                // Mark locally as pending
                setCourses(courses.map(c => c.id === id ? { ...c, status: 'pending' } : c));
                alert('Deletion request sent to admin for approval.');
            } catch (err) {
                console.error('Error deleting course:', err);
                alert('Error deleting course.');
            }
        }
    };

    return (
        <div className="course-manager">
            <div className="manager-header">
                <div>
                    <h2>Your Courses</h2>
                    <p className="subtitle">Manage and update your published content</p>
                </div>
                <button className="btn-primary" onClick={() => { setSelectedCourse(null); setShowCourseEditor(!showCourseEditor); }}>
                    <Plus size={18} /> Add New Lesson/Course
                </button>
            </div>

            <div className="courses-grid">
                {courses.map(course => (
                    <div key={course.id} className="course-card">
                        <div className="course-status">
                            <span className={`status-badge ${course.status === 'pending' ? 'pending' : course.status.toLowerCase()}`}>
                                {course.status === 'pending' ? 'Pending Admin Review' : course.status}
                            </span>
                            <button className="icon-btn"><MoreVertical size={18} /></button>
                        </div>

                        <div className="course-body">
                            <h3>{course.title}</h3>
                            <span className="category">{course.category}</span>

                            <div className="course-metrics">
                                <div className="metric">
                                    <Users size={16} /> <span>{course.enrolled}</span>
                                </div>
                                <div className="metric">
                                    <Star size={16} className="star-icon" /> <span>{course.rating}</span>
                                </div>
                            </div>
                        </div>

                        <div className="course-actions">
                            <button
                                className="action-btn edit"
                                disabled={course.status === 'pending'}
                                onClick={() => alert('Edit course')}
                            >
                                <Edit2 size={16} /> Edit
                            </button>
                            <button className="action-btn analytics" onClick={() => alert('View analytics')}>
                                <BarChart2 size={16} /> Analytics
                            </button>
                            <button
                                className="action-btn delete"
                                disabled={course.status === 'pending'}
                                onClick={() => handleDelete(course.id)}
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {showCourseEditor && <CourseEditor onClose={() => setShowCourseEditor(false)} />}
        </div>
    );
};

export default CourseManager;
