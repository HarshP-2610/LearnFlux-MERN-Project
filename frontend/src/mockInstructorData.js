export const mockInstructorData = {
    stats: {
        totalStudents: 1245,
        avgCourseRating: 4.8,
        totalLessons: 42,
        monthlyEarnings: 3450
    },
    studentEngagement: [
        { day: 'Mon', active: 120 },
        { day: 'Tue', active: 150 },
        { day: 'Wed', active: 180 },
        { day: 'Thu', active: 160 },
        { day: 'Fri', active: 200 },
        { day: 'Sat', active: 250 },
        { day: 'Sun', active: 220 },
    ],
    courses: [
        { id: '1', title: 'React for Beginners', category: 'Web Development', enrolled: 450, rating: 4.9, status: 'Published' },
        { id: '2', title: 'Advanced State Management', category: 'Web Development', enrolled: 320, rating: 4.7, status: 'Published' },
        { id: '3', title: 'Fullstack Next.js', category: 'Web Development', enrolled: 210, rating: 4.8, status: 'Published' },
        { id: '4', title: 'Tailwind CSS Mastery', category: 'Design', enrolled: 180, rating: 4.6, status: 'Draft' },
        { id: '5', title: 'GraphQL Fundamentals', category: 'Backend', enrolled: 85, rating: 4.5, status: 'Published' }
    ],
    students: [
        { id: 's1', name: 'John Doe', progress: 85, lastActive: '2 hours ago', grade: 'A', email: 'john@example.com' },
        { id: 's2', name: 'Jane Smith', progress: 42, lastActive: '1 day ago', grade: 'C+', email: 'jane@example.com' },
        { id: 's3', name: 'Alice Johnson', progress: 95, lastActive: '10 mins ago', grade: 'A+', email: 'alice@example.com' },
        { id: 's4', name: 'Bob Williams', progress: 20, lastActive: '3 days ago', grade: 'D', email: 'bob@example.com' },
        { id: 's5', name: 'Charlie Brown', progress: 60, lastActive: '5 hours ago', grade: 'B', email: 'charlie@example.com' },
        { id: 's6', name: 'Diana Prince', progress: 100, lastActive: '1 hour ago', grade: 'A+', email: 'diana@example.com' },
        { id: 's7', name: 'Evan Mitchell', progress: 75, lastActive: '2 days ago', grade: 'B+', email: 'evan@example.com' },
        { id: 's8', name: 'Fiona Gallagher', progress: 50, lastActive: '4 hours ago', grade: 'C', email: 'fiona@example.com' },
        { id: 's9', name: 'George Harrison', progress: 15, lastActive: '5 days ago', grade: 'F', email: 'george@example.com' },
        { id: 's10', name: 'Hannah Abbott', progress: 88, lastActive: '30 mins ago', grade: 'A-', email: 'hannah@example.com' },
        { id: 's11', name: 'Ian Malcolm', progress: 70, lastActive: '1 day ago', grade: 'B-', email: 'ian@example.com' },
        { id: 's12', name: 'Jessica Jones', progress: 92, lastActive: 'Just now', grade: 'A', email: 'jessica@example.com' },
        { id: 's13', name: 'Kevin Spacey', progress: 35, lastActive: '2 days ago', grade: 'D+', email: 'kevin@example.com' },
        { id: 's14', name: 'Laura Croft', progress: 100, lastActive: '6 hours ago', grade: 'A+', email: 'laura@example.com' },
        { id: 's15', name: 'Mike Ross', progress: 80, lastActive: '1 hour ago', grade: 'B+', email: 'mike@example.com' },
        { id: 's16', name: 'Nina Simone', progress: 45, lastActive: '4 days ago', grade: 'C-', email: 'nina@example.com' },
        { id: 's17', name: 'Oscar Wilde', progress: 65, lastActive: '12 hours ago', grade: 'B-', email: 'oscar@example.com' },
        { id: 's18', name: 'Pam Beesly', progress: 98, lastActive: '5 mins ago', grade: 'A+', email: 'pam@example.com' },
        { id: 's19', name: 'Quinn Fabray', progress: 55, lastActive: '3 days ago', grade: 'C', email: 'quinn@example.com' },
        { id: 's20', name: 'Rachel Green', progress: 72, lastActive: '1 day ago', grade: 'B', email: 'rachel@example.com' }
    ],
    questions: [
        { id: 'q1', text: 'What is the virtual DOM in React?', options: ['A real DOM', 'A lightweight copy of the real DOM', 'A browser feature', 'A CSS property'], correct: 'A lightweight copy of the real DOM', difficulty: 'Medium' },
        { id: 'q2', text: 'Which hook is used for side effects in functional components?', options: ['useState', 'useContext', 'useEffect', 'useReducer'], correct: 'useEffect', difficulty: 'Easy' }
    ]
};
