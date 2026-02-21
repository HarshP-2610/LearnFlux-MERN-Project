import React, { useState } from 'react';
import { mockAdminData } from '../../mockAdminData';
import './CourseApproval.css';

const CourseApproval = () => {
    const [courses, setCourses] = useState(mockAdminData.pendingCourses);
    const [feedback, setFeedback] = useState({});

    const handleFeedbackChange = (id, text) => {
        setFeedback({ ...feedback, [id]: text });
    };

    const handleAction = (id, action) => {
        const text = feedback[id] || '';
        alert(`Course ${id} ${action} with feedback: ${text}`);
        setCourses(courses.filter(course => course.id !== id));
    };

    return (
        <div className="course-approval-container">
            <div className="course-approval-header">
                <h2>Course Content Moderation</h2>
                <span className="subtitle">Review courses submitted by instructors that are pending approval.</span>
            </div>

            <div className="courses-grid">
                {courses.length === 0 ? (
                    <div className="no-courses">No pending courses to review.</div>
                ) : (
                    courses.map(course => (
                        <div key={course.id} className="approval-card">
                            <div className="course-header">
                                <h3>{course.title}</h3>
                                <span className="category-badge">{course.category}</span>
                            </div>
                            <div className="course-details">
                                <p><strong>Instructor:</strong> <span>{course.instructor}</span></p>
                                <p><strong>Submitted:</strong> <span>{course.submitted}</span></p>
                            </div>
                            <textarea
                                placeholder="Add detailed feedback for the instructor..."
                                value={feedback[course.id] || ''}
                                onChange={(e) => handleFeedbackChange(course.id, e.target.value)}
                                className="feedback-textarea"
                            />
                            <div className="approval-actions">
                                <button className="btn-preview" onClick={() => alert(`Previewing ${course.title}`)}>Preview</button>
                                <div className="action-right">
                                    <button className="btn-approve" onClick={() => handleAction(course.id, 'Approved')}>Approve</button>
                                    <button className="btn-reject" onClick={() => handleAction(course.id, 'Rejected')}>Reject</button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default CourseApproval;
