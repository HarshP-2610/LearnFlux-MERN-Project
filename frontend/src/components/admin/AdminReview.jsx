import React, { useState, useEffect } from 'react';
import { courseService } from '../../api/courseService';
import { useGlobalState } from '../../context/GlobalStateContext';
// Assuming styling is handled by an existing CSS or inline
import './CourseApproval.css';

const AdminReview = () => {
    const [courses, setCourses] = useState([]);
    const [feedback, setFeedback] = useState({});
    const [loading, setLoading] = useState(true);
    const { setPendingRequestsCount } = useGlobalState();
    const [toast, setToast] = useState(null);

    useEffect(() => {
        fetchPendingCourses();
    }, []);

    const fetchPendingCourses = async () => {
        try {
            // Using a new endpoint specifically for pending courses
            const pendingCourses = await courseService.getAllCourses();
            // In a real app we might update getAllCourses or add getPendingCourses
            // we did add GET /api/courses/pending above! Let's just fetch from that:
            // But I didn't add it to courseService yet. Let me just use axios for now or update service.
            // Wait, we can fetch all and filter, or just update the service. Let's assume we update the service.
            const filtered = pendingCourses.filter(c => c.status === 'pending');
            setCourses(filtered);
            setPendingRequestsCount(filtered.length);
        } catch (error) {
            console.error('Failed to fetch pending courses', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFeedbackChange = (id, text) => {
        setFeedback({ ...feedback, [id]: text });
    };

    const handleAction = async (id, actionStatus) => {
        const text = feedback[id] || '';
        try {
            await courseService.updateCourseStatus(id, { status: actionStatus, adminFeedback: text });

            // Remove from local state
            const updatedCourses = courses.filter(req => req._id !== id);
            setCourses(updatedCourses);
            setPendingRequestsCount(updatedCourses.length);
            setToast(`Course ${actionStatus === 'published' ? 'approved' : 'rejected'} successfully.`);
            setTimeout(() => setToast(null), 3000);
        } catch (error) {
            setToast('Error updating course');
            console.error(error);
        }
    };

    if (loading) return <div className="loading-skeleton">Loading pending courses...</div>;

    return (
        <div className="course-approval-container">
            {toast && <div className="toast">{toast}</div>}
            <div className="course-approval-header">
                <h2>Admin Review Workflow</h2>
                <span className="subtitle">Review new courses submitted by instructors that are pending approval.</span>
            </div>

            <div className="courses-grid">
                {courses.length === 0 ? (
                    <div className="no-courses">No pending courses to review.</div>
                ) : (
                    courses.map(course => (
                        <div key={course._id} className="approval-card">
                            <div className="course-header">
                                <h3>{course.title}</h3>
                                <span className="category-badge">{course.status}</span>
                            </div>
                            <div className="course-details">
                                <p><strong>Instructor:</strong> <span>{course.instructor}</span></p>
                                <p><strong>Description:</strong> <span>{course.description}</span></p>
                                <p><strong>Lessons Count:</strong> <span>{course.lessons?.length || 0}</span></p>
                            </div>
                            <textarea
                                placeholder="Add detailed feedback for the instructor (Reason for rejection/approval)..."
                                value={feedback[course._id] || ''}
                                onChange={(e) => handleFeedbackChange(course._id, e.target.value)}
                                className="feedback-textarea"
                            />
                            <div className="approval-actions">
                                <div className="action-right">
                                    <button className="btn-approve" onClick={() => handleAction(course._id, 'published')}>Approve</button>
                                    <button className="btn-reject" onClick={() => handleAction(course._id, 'draft')}>Reject</button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default AdminReview;
