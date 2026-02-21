import React from 'react';
import { Target, Clock, Zap, BookOpen } from 'lucide-react';
import { useGlobalState } from '../../context/GlobalStateContext';
import './StudentDash.css';

const StudentDash = () => {
    const { enrollments } = useGlobalState();

    const user = JSON.parse(localStorage.getItem('user')) || { id: 'u3' };

    // Simulating mapping - get current student's enrollments from global state logic
    const studentEnrollments = enrollments.filter(e => e.studentId === user.id) || [
        { courseId: 'Mock Focus Course', progress: 56, grade: 'B' }
    ];

    const avgProgress = studentEnrollments.length > 0
        ? Math.round(studentEnrollments.reduce((acc, curr) => acc + curr.progress, 0) / studentEnrollments.length)
        : 0;

    return (
        <div className="student-dash">
            <div className="dash-welcome-card">
                <div className="welcome-text">
                    <h2>Welcome back! 👋</h2>
                    <p>You're on a 4-day learning streak. Keep it up!</p>
                </div>
                <div className="streak-badge">🔥 4 Days</div>
            </div>

            <div className="student-stats-grid">
                <div className="stat-card glass-green">
                    <div className="icon-box"><BookOpen size={24} /></div>
                    <div className="stat-info">
                        <h3>Enrolled Courses</h3>
                        <p>{studentEnrollments.length || 2}</p>
                    </div>
                </div>
                <div className="stat-card glass-blue">
                    <div className="icon-box"><Target size={24} /></div>
                    <div className="stat-info">
                        <h3>Avg. Progress</h3>
                        <p>{avgProgress}%</p>
                    </div>
                </div>
                <div className="stat-card glass-purple">
                    <div className="icon-box"><Zap size={24} /></div>
                    <div className="stat-info">
                        <h3>Points Earned</h3>
                        <p>1,240</p>
                    </div>
                </div>
                <div className="stat-card glass-yellow">
                    <div className="icon-box"><Clock size={24} /></div>
                    <div className="stat-info">
                        <h3>Hours Learned</h3>
                        <p>18.5</p>
                    </div>
                </div>
            </div>

            <div className="dash-sections">
                <div className="continue-learning">
                    <h3>Continue Learning</h3>
                    <div className="learning-card">
                        <div className="lc-image"></div>
                        <div className="lc-content">
                            <span className="course-cat">Web Development</span>
                            <h4>Fundamentals of React State</h4>
                            <div className="progress-container">
                                <div className="p-bar"><div className="fill" style={{ width: `${studentEnrollments[0]?.progress || 56}%` }}></div></div>
                                <span>{studentEnrollments[0]?.progress || 56}%</span>
                            </div>
                            <button className="btn-resume">Resume Lesson</button>
                        </div>
                    </div>
                </div>

                <div className="upcoming-tasks">
                    <h3>Upcoming Quizzes</h3>
                    <ul className="task-list">
                        <li>
                            <div className="task-icon">?</div>
                            <div className="task-info">
                                <strong>Next.js Routing Quiz</strong>
                                <span>Due Tomorrow, 11:59 PM</span>
                            </div>
                            <button className="btn-start-task">Start</button>
                        </li>
                        <li>
                            <div className="task-icon">📝</div>
                            <div className="task-info">
                                <strong>Data Science Assignment</strong>
                                <span>Due in 3 days</span>
                            </div>
                            <button className="btn-start-task secondary">View</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default StudentDash;
