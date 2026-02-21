import React, { useState } from 'react';
import { X, UploadCloud, Video, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import { apiService } from '../../services/apiService';
import './AddLesson.css';

const AddLesson = ({ onClose, courseName }) => {
    const [lessonData, setLessonData] = useState({
        title: '',
        description: '',
        videoUrl: ''
    });

    const [fileUploaded, setFileUploaded] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const currentUser = JSON.parse(localStorage.getItem('user'));

            const payloadData = {
                title: lessonData.title,
                category: 'Web Development', // Default
                instructor: currentUser.name,
                duration: '4 Weeks', // Default 
                price: 49, // default
                description: lessonData.description
            };

            await apiService.submitRequest('CREATE', payloadData);
            alert('Request submitted for Admin review. You will be notified once published.');
            window.location.reload(); // Quick refresh to show in list
        } catch (err) {
            console.error(err);
            alert('Failed to submit request.');
        }
    };

    return (
        <div className="modal-overlay">
            <motion.div
                className="add-lesson-modal"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
            >
                <div className="modal-header">
                    <div className="modal-title">
                        <h2>Add New Lesson</h2>
                        <span className="subtitle">to {courseName || 'Selected Course'}</span>
                    </div>
                    <button className="close-btn" onClick={onClose}><X size={24} /></button>
                </div>

                <form className="add-lesson-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Lesson Title</label>
                        <input
                            type="text"
                            placeholder="e.g., Introduction to React Context"
                            required
                            value={lessonData.title}
                            onChange={(e) => setLessonData({ ...lessonData, title: e.target.value })}
                        />
                    </div>

                    <div className="form-group">
                        <label>Lesson Description</label>
                        <textarea
                            rows="4"
                            placeholder="Briefly describe what students will learn..."
                            required
                            value={lessonData.description}
                            onChange={(e) => setLessonData({ ...lessonData, description: e.target.value })}
                        />
                    </div>

                    <div className="form-group">
                        <label><Video size={18} /> Video URL (Optional)</label>
                        <input
                            type="url"
                            placeholder="https://youtube.com/..."
                            value={lessonData.videoUrl}
                            onChange={(e) => setLessonData({ ...lessonData, videoUrl: e.target.value })}
                        />
                    </div>

                    <div className="form-group">
                        <label><FileText size={18} /> Downloadable Resource (PDF)</label>
                        <div className={`upload-zone ${fileUploaded ? 'uploaded' : ''}`}>
                            <input
                                type="file"
                                id="file-upload"
                                accept=".pdf"
                                onChange={() => setFileUploaded(true)}
                                className="file-input"
                            />
                            <label htmlFor="file-upload" className="upload-label">
                                <UploadCloud size={32} className="upload-icon" />
                                <span>{fileUploaded ? 'Resource attached successfully. Click to replace.' : 'Click to upload PDF or drag and drop'}</span>
                                {!fileUploaded && <span className="upload-hint">Max file size: 10MB</span>}
                            </label>
                        </div>
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
                        <button type="submit" className="btn-submit">Publish Lesson</button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default AddLesson;
