import React from 'react';
import {
    BarChart, Bar, PieChart, Pie, AreaChart, Area, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { mockAdminData } from '../../mockAdminData';
import './GlobalAnalytics.css';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const GlobalAnalytics = () => {
    const { popularCategories, roleDistribution, dailyActiveUsers } = mockAdminData;

    return (
        <div className="analytics-container">
            <h2>Platform Analytics</h2>
            <div className="charts-grid">
                <div className="chart-card">
                    <h3>Most Popular Categories</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={popularCategories}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="courses" fill="#3b82f6" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="chart-card">
                    <h3>Distribution of User Roles</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={roleDistribution}
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                                {roleDistribution.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="chart-card full-width">
                    <h3>Daily Active Users (DAU)</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={dailyActiveUsers}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Area type="monotone" dataKey="active" stroke="#8b5cf6" fill="#c4b5fd" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default GlobalAnalytics;
