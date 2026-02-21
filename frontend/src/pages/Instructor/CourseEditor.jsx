import React, { useState } from 'react';
import { courseService } from '../../api/courseService';
// Assuming styling is handled by an existing CSS or inline
import './CourseEditor.css';

const CourseEditor = ({ onClose }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [lessons, setLessons] = useState([{ title: '', videoURL: '', content: '', orderIndex: 1 }]);
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState(null);

    const handleLessonChange = (index, field, value) => {
        const updatedLessons = [...lessons];
        updatedLessons[index][field] = value;
        setLessons(updatedLessons);
    };

    const addLesson = () => {
        setLessons([...lessons, { title: '', videoURL: '', content: '', orderIndex: lessons.length + 1 }]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // Basic current user info, assuming it's available
        const currentUser = JSON.parse(localStorage.getItem('user')) || { name: 'Unknown' };

        const courseData = {
            title,
            description,
            thumbnail,
            instructor: currentUser.name,
            category: 'Web Development', // Default or select
            duration: 'Flexible',
            price: 0,
            lessons
        };

        try {
            await courseService.createCourse(courseData);
            setToast('Course created successfully! Status: pending');
            setTimeout(() => {
                if (onClose) onClose();
                window.location.reload();
            }, 1500);
        } catch (error) {
            setToast('Failed to create course.');
            console.error(error);
        } finally {
            setLoading(false);
            setTimeout(() => setToast(null), 3000);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="add-lesson-modal" style={{ maxHeight: '90vh', overflowY: 'auto' }}>
                <div className="modal-header">
                    <h2>Create New Course & Lessons</h2>
                    <button className="close-btn" onClick={onClose} aria-label="Close">×</button>
                </div>
                {toast && <div className="toast">{toast}</div>}
                <form className="add-lesson-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Course Title</label>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Thumbnail URL</label>
                        <input type="text" value={thumbnail} onChange={(e) => setThumbnail(e.target.value)} />
                    </div>

                    <h3>Lessons</h3>
                    {lessons.map((lesson, index) => (
                        <div key={index} className="lesson-block">
                            <input type="text" placeholder="Lesson Title" value={lesson.title} onChange={(e) => handleLessonChange(index, 'title', e.target.value)} required />
                            <input type="text" placeholder="Video URL" value={lesson.videoURL} onChange={(e) => handleLessonChange(index, 'videoURL', e.target.value)} />
                            <textarea placeholder="Lesson Content" value={lesson.content} onChange={(e) => handleLessonChange(index, 'content', e.target.value)} />
                        </div>
                    ))}
                    <button type="button" onClick={addLesson} className="btn-secondary">Add Lesson</button>

                    <div className="form-actions">
                        <button type="submit" className="btn-primary" disabled={loading}>
                            {loading ? 'Submitting...' : 'Submit for Approval'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CourseEditor;
