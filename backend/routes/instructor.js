const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Course = require('../models/Course');
const User = require('../models/User');

// GET all courses by logged-in instructor
router.get('/courses', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const courses = await Course.find({ instructor: user.name }).sort({ createdAt: -1 });
        res.json(courses);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// GET instructor stats
router.get('/stats', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const courses = await Course.find({ instructor: user.name });

        // Calculate dynamic stats
        const totalCourses = courses.length;
        let avgRating = 0;
        if (totalCourses > 0) {
            avgRating = courses.reduce((acc, c) => acc + c.rating, 0) / totalCourses;
        }

        res.json({
            totalStudents: Math.floor(Math.random() * 500) + 100, // randomized for demo
            avgCourseRating: avgRating.toFixed(1),
            totalLessons: totalCourses * 10,
            monthlyEarnings: totalCourses * 450 + 1200
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
