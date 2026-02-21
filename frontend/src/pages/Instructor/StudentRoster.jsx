import React, { useState } from 'react';
import { Search, MessageCircle, BarChart, DownloadCloud } from 'lucide-react';
import { mockInstructorData } from '../../mockInstructorData';
import './StudentRoster.css';

const StudentRoster = () => {
    const [students, setStudents] = useState(mockInstructorData.students);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="student-roster">
            <div className="roster-header">
                <div className="header-left">
                    <h2>Student Analytics</h2>
                    <p className="subtitle">Track performance and engagement</p>
                </div>

                <div className="header-actions">
                    <div className="search-box">
                        <Search size={18} className="search-icon" />
                        <input
                            type="text"
                            placeholder="Search students..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className="btn-export">
                        <DownloadCloud size={18} /> Export Data
                    </button>
                </div>
            </div>

            <div className="roster-table-container">
                <table className="roster-table">
                    <thead>
                        <tr>
                            <th>Student Name</th>
                            <th>Email</th>
                            <th>Progress</th>
                            <th>Last Active</th>
                            <th>Performance Grade</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredStudents.map(student => (
                            <tr key={student.id}>
                                <td>
                                    <div className="student-name-col">
                                        <div className="student-avatar">{student.name.charAt(0)}</div>
                                        <span className="student-name">{student.name}</span>
                                    </div>
                                </td>
                                <td><span className="student-email">{student.email}</span></td>
                                <td>
                                    <div className="progress-cell">
                                        <div className="progress-bar-bg">
                                            <div
                                                className="progress-bar-fill"
                                                style={{ width: `${student.progress}%`, background: student.progress > 70 ? '#10b981' : student.progress > 40 ? '#f59e0b' : '#ef4444' }}
                                            />
                                        </div>
                                        <span className="progress-text">{student.progress}%</span>
                                    </div>
                                </td>
                                <td><span className="last-active">{student.lastActive}</span></td>
                                <td>
                                    <span className={`grade-badge grade-${student.grade.charAt(0).toLowerCase()}`}>
                                        Grade {student.grade}
                                    </span>
                                </td>
                                <td>
                                    <div className="action-buttons">
                                        <button className="btn-message" onClick={() => alert(`Messaging ${student.name}...`)}>
                                            <MessageCircle size={16} /> <span>Message</span>
                                        </button>
                                        <button className="btn-analytics-small" onClick={() => alert(`Detailed analytics for ${student.name}...`)}>
                                            <BarChart size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {filteredStudents.length === 0 && (
                            <tr>
                                <td colSpan="6" className="no-results">No students match your search.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StudentRoster;
