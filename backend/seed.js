const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Course = require('./models/Course');

dotenv.config();

const courses = [
    {
        title: "Deep Learning Specialization",
        category: "Artificial Intelligence",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        instructor: "Dr. Adam Smith",
        duration: "12 Weeks",
        level: "Advanced",
        rating: 4.9,
        price: 199,
        description: "Master the foundations of Deep Learning, Convolutional Networks, and RNNs."
    },
    {
        title: "AI for Business Leaders",
        category: "Artificial Intelligence",
        image: "https://images.unsplash.com/photo-1591453089816-0fbb971b454c?auto=format&fit=crop&q=80&w=800",
        instructor: "Sarah Jenkins",
        duration: "4 Weeks",
        level: "Beginner",
        rating: 4.8,
        price: 89,
        description: "Learn how to implement AI strategies in your organization for maximum growth."
    },
    {
        title: "Natural Language Processing",
        category: "Artificial Intelligence",
        image: "https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?auto=format&fit=crop&q=80&w=800",
        instructor: "Prof. Michael Chen",
        duration: "8 Weeks",
        level: "Intermediate",
        rating: 4.7,
        price: 149,
        description: "Build chatbots and translation engines using state-of-the-art NLP techniques."
    },
    {
        title: "Full-Stack React & Node Course",
        category: "Web Development",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
        instructor: "John Doe",
        duration: "16 Weeks",
        level: "Intermediate",
        rating: 5.0,
        price: 129,
        description: "Build production-ready MERN applications from scratch."
    },
    {
        title: "Modern JavaScript Mastery",
        category: "Web Development",
        image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?auto=format&fit=crop&q=80&w=800",
        instructor: "Alex Rivera",
        duration: "6 Weeks",
        level: "Beginner",
        rating: 4.9,
        price: 49,
        description: "Go from zero to pro in modern ES6+ JavaScript."
    },
    {
        title: "Next.js 15 Enterprise Patterns",
        category: "Web Development",
        image: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?auto=format&fit=crop&q=80&w=800",
        instructor: "David Miller",
        duration: "10 Weeks",
        level: "Advanced",
        rating: 4.8,
        price: 159,
        description: "Learn Server Components, App Router, and scalable Next.js architecture."
    },
    {
        title: "Mastering Figma for UI Design",
        category: "UI/UX Design",
        image: "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?auto=format&fit=crop&q=80&w=800",
        instructor: "Elena Rodriguez",
        duration: "5 Weeks",
        level: "Beginner",
        rating: 4.9,
        price: 79,
        description: "The complete guide to UI design using Figma's advanced features."
    },
    {
        title: "UX Research & Psychology",
        category: "UI/UX Design",
        image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=800",
        instructor: "Mark Williams",
        duration: "8 Weeks",
        level: "Intermediate",
        rating: 4.6,
        price: 119,
        description: "Understand user behavior and conduct effective research studies."
    },
    {
        title: "Python for Data Analysis",
        category: "Data Science",
        image: "https://images.unsplash.com/photo-1551288049-bbda38a10ad5?auto=format&fit=crop&q=80&w=800",
        instructor: "Dr. Emily Blunt",
        duration: "10 Weeks",
        level: "Beginner",
        rating: 4.8,
        price: 99,
        description: "Use Pandas, NumPy, and Matplotlib to analyze complex datasets."
    },
    {
        title: "Big Data with Spark & Hadoop",
        category: "Data Science",
        image: "https://images.unsplash.com/photo-1504868512813-9a2a7adfc102?auto=format&fit=crop&q=80&w=800",
        instructor: "Kevin Hart",
        duration: "14 Weeks",
        level: "Advanced",
        rating: 4.7,
        price: 189,
        description: "Process massive amounts of data with distributed computing clusters."
    },
    {
        title: "Agile Project Management",
        category: "Business",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800",
        instructor: "Robert Kiyosaki",
        duration: "6 Weeks",
        level: "Beginner",
        rating: 4.9,
        price: 69,
        description: "Master Scrum and Kanban methodologies for efficient team delivery."
    },
    {
        title: "Product Strategy & Roadmap",
        category: "Business",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
        instructor: "Bethany Hamilton",
        duration: "8 Weeks",
        level: "Intermediate",
        rating: 4.8,
        price: 139,
        description: "Define vision and create actionable roadmaps for digital products."
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Database Connected for seeding...");

        await Course.deleteMany({});
        console.log("Old courses deleted.");

        await Course.insertMany(courses);
        console.log("12+ Premium courses seeded successfully.");

        mongoose.connection.close();
    } catch (err) {
        console.error(err);
    }
};

seedDB();
