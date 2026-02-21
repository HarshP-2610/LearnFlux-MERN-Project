export const mockEcosystemData = {
    users: [
        { id: 'u1', name: 'Admin One', email: 'admin@gmail.com', role: 'admin', isBanned: false },
        { id: 'u2', name: 'Instructor Bob', email: 'ins@gmail.com', role: 'instructor', isBanned: false },
        { id: 'u3', name: 'Student Alice', email: 'alice@gmail.com', role: 'student', isBanned: false },
        { id: 'u4', name: 'Student Charlie', email: 'charlie@gmail.com', role: 'student', isBanned: false },
    ],
    courses: [
        { id: 'c1', title: 'React Basics', category: 'Web Dev', instructorId: 'u2', status: 'published', studentsEnrolled: 120, rating: 4.8 },
        { id: 'c2', title: 'Advanced Next.js', category: 'Web Dev', instructorId: 'u2', status: 'pending', studentsEnrolled: 0, rating: 0 },
        { id: 'c3', title: 'Data Science 101', category: 'Data Science', instructorId: 'u2', status: 'draft', studentsEnrolled: 0, rating: 0 },
    ],
    enrollments: [
        { id: 'e1', studentId: 'u3', courseId: 'c1', progress: 45, grade: 'B', lastActive: '2 hours ago' },
        { id: 'e2', studentId: 'u4', courseId: 'c1', progress: 12, grade: 'C', lastActive: '1 day ago' },
    ],
    notifications: [
        { id: 'n1', message: 'System maintenance scheduled for tonight.', timestamp: new Date().toISOString(), read: false }
    ]
};
