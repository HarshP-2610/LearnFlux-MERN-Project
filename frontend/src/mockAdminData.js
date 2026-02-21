export const mockAdminData = {
    stats: {
        totalActiveStudents: 14250,
        totalInstructors: 450,
        monthlyRevenue: 124500,
        pendingApprovals: 12
    },
    platformGrowth: [
        { name: 'Day 1', signups: 120 },
        { name: 'Day 5', signups: 150 },
        { name: 'Day 10', signups: 200 },
        { name: 'Day 15', signups: 180 },
        { name: 'Day 20', signups: 250 },
        { name: 'Day 25', signups: 300 },
        { name: 'Day 30', signups: 350 },
    ],
    users: [
        { id: '1', name: 'Alice Smith', email: 'alice@example.com', role: 'Student', status: 'Active', joined: '2025-10-15' },
        { id: '2', name: 'Bob Johnson', email: 'bob@example.com', role: 'Instructor', status: 'Active', joined: '2025-08-20' },
        { id: '3', name: 'Charlie Dave', email: 'charlie@example.com', role: 'Student', status: 'Banned', joined: '2025-01-05' },
        { id: '4', name: 'Diana Prince', email: 'diana@example.com', role: 'Instructor', status: 'Active', joined: '2025-09-12' },
        { id: '5', name: 'Eve Adams', email: 'eve@example.com', role: 'Admin', status: 'Active', joined: '2024-05-10' },
    ],
    pendingCourses: [
        { id: 'c1', title: 'Advanced React Patterns', instructor: 'Bob Johnson', category: 'Web Development', submitted: '2026-02-18' },
        { id: 'c2', title: 'Machine Learning Basics', instructor: 'Diana Prince', category: 'Artificial Intelligence', submitted: '2026-02-19' },
    ],
    popularCategories: [
        { name: 'Web Dev', courses: 400 },
        { name: 'AI', courses: 300 },
        { name: 'Data Science', courses: 300 },
        { name: 'UI/UX', courses: 200 },
    ],
    roleDistribution: [
        { name: 'Students', value: 14250 },
        { name: 'Instructors', value: 450 },
        { name: 'Admins', value: 5 },
    ],
    dailyActiveUsers: [
        { name: 'Mon', active: 4000 },
        { name: 'Tue', active: 4500 },
        { name: 'Wed', active: 4200 },
        { name: 'Thu', active: 4800 },
        { name: 'Fri', active: 5000 },
        { name: 'Sat', active: 6000 },
        { name: 'Sun', active: 5500 },
    ]
};
