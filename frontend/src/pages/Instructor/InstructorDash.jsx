import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, Star, PlayCircle, DollarSign } from 'lucide-react';
import axios from 'axios';
import { mockInstructorData } from '../../mockInstructorData';
import './InstructorDash.css';

const InstructorDash = () => {
    const [stats, setStats] = useState(mockInstructorData.stats);
    const { studentEngagement } = mockInstructorData; // leave chart as mock for now

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return;
                const res = await axios.get('http://localhost:5000/api/instructor/stats', {
                    headers: { 'x-auth-token': token }
                });

                setStats(res.data);
            } catch (err) {
                console.error("Error fetching stats:", err);
            }
        };
        fetchStats();
    }, []);

    return (
        <div className="instructor-dash">
            <div className="quick-stats-grid">
                <div className="stat-card">
                    <div className="icon-wrapper blue"><Users size={24} /></div>
                    <div className="stat-info">
                        <h3>Total Students</h3>
                        <p>{stats.totalStudents}</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="icon-wrapper yellow"><Star size={24} /></div>
                    <div className="stat-info">
                        <h3>Avg Course Rating</h3>
                        <p>{stats.avgCourseRating} / 5.0</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="icon-wrapper purple"><PlayCircle size={24} /></div>
                    <div className="stat-info">
                        <h3>Total Lessons</h3>
                        <p>{stats.totalLessons}</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="icon-wrapper green"><DollarSign size={24} /></div>
                    <div className="stat-info">
                        <h3>Monthly Earnings</h3>
                        <p>${stats.monthlyEarnings}</p>
                    </div>
                </div>
            </div>

            <div className="engagement-chart-container">
                <div className="chart-header">
                    <h2>Student Engagement</h2>
                    <span className="subtitle">Daily active students across all your courses</span>
                </div>

                <div className="chart-wrapper">
                    <ResponsiveContainer width="100%" height={350}>
                        <AreaChart data={studentEngagement}>
                            <defs>
                                <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} dx={-10} />
                            <Tooltip
                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
                                cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '4 4' }}
                            />
                            <Area type="monotone" dataKey="active" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorActive)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default InstructorDash;
