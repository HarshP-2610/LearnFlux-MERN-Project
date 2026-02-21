import React, { useState, useEffect } from 'react';
import { apiService } from '../../services/apiService';
import { useGlobalState } from '../../context/GlobalStateContext';
import './CourseApproval.css';

const AdminApproval = () => {
    const [requests, setRequests] = useState([]);
    const [feedback, setFeedback] = useState({});
    const [loading, setLoading] = useState(true);
    const { setPendingRequestsCount } = useGlobalState();

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            const data = await apiService.getPendingRequests();
            setRequests(data);
            setPendingRequestsCount(data.length);
        } catch (error) {
            console.error('Failed to fetch pending requests', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFeedbackChange = (id, text) => {
        setFeedback({ ...feedback, [id]: text });
    };

    const handleAction = async (id, action) => {
        const text = feedback[id] || '';
        try {
            await apiService.resolveRequest(id, action, text);
            // Remove from local state
            const updatedRequests = requests.filter(req => req._id !== id);
            setRequests(updatedRequests);
            setPendingRequestsCount(updatedRequests.length);
            alert(`Request ${action === 'approve' ? 'approved' : 'rejected'} successfully.`);
        } catch (error) {
            alert('Error updating request');
            console.error(error);
        }
    };

    if (loading) return <div>Loading requests...</div>;

    return (
        <div className="course-approval-container">
            <div className="course-approval-header">
                <h2>Content Moderation Workflow</h2>
                <span className="subtitle">Review courses and actions submitted by instructors that are pending approval.</span>
            </div>

            <div className="courses-grid">
                {requests.length === 0 ? (
                    <div className="no-courses">No pending requests to review.</div>
                ) : (
                    requests.map(req => (
                        <div key={req._id} className="approval-card">
                            <div className="course-header">
                                <h3>{req.payload?.title || 'Unknown Title'}</h3>
                                <span className="category-badge">{req.actionType}</span>
                            </div>
                            <div className="course-details">
                                <p><strong>Instructor:</strong> <span>{typeof req.instructorId === 'object' ? req.instructorId.name : req.instructorId}</span></p>
                                <p><strong>Submitted:</strong> <span>{new Date(req.createdAt).toLocaleDateString()}</span></p>
                            </div>
                            <textarea
                                placeholder="Add detailed feedback for the instructor (Reason for rejection/approval)..."
                                value={feedback[req._id] || ''}
                                onChange={(e) => handleFeedbackChange(req._id, e.target.value)}
                                className="feedback-textarea"
                            />
                            <div className="approval-actions">
                                <button className="btn-preview" onClick={() => alert(`Previewing data: ${JSON.stringify(req.payload)}`)}>Preview</button>
                                <div className="action-right">
                                    <button className="btn-approve" onClick={() => handleAction(req._id, 'approve')}>Approve</button>
                                    <button className="btn-reject" onClick={() => handleAction(req._id, 'reject')}>Reject</button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default AdminApproval;
