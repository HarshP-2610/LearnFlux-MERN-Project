const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const Course = require('../models/Course');

// @route   GET api/courses
// @desc    Get all published courses
// @access  Public
router.get('/', async (req, res) => {
    try {
        const courses = await Course.find({ status: 'published' }).sort({ createdAt: -1 });
        res.json(courses);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/courses/pending
// @desc    Get all pending courses
// @access  Private/Admin
router.get('/pending', auth, admin, async (req, res) => {
    try {
        const courses = await Course.find({ status: 'pending' }).sort({ createdAt: -1 });
        res.json(courses);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/courses/:id
// @desc    Get course by ID
// @access  Public (only if published)
router.get('/:id', async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) return res.status(404).json({ msg: 'Course not found' });

        // Let instructor and admin view if not published, else block 
        // (For simplicity according to prompt: direct 404 if not published)
        if (course.status !== 'published') {
            return res.status(404).json({ msg: 'Course not found' });
        }
        res.json(course);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Course not found' });
        }
        res.status(500).send('Server Error');
    }
});

// @route   POST api/courses
// @desc    Create a course
// @access  Private/Admin or Instructor
router.post('/', auth, async (req, res) => {
    if (req.user.role !== 'admin' && req.user.role !== 'instructor') {
        return res.status(403).json({ msg: 'Access denied' });
    }
    const { title, category, image, instructor, duration, level, rating, price, description } = req.body;

    try {
        const newCourse = new Course({
            title,
            category,
            image,
            instructor,
            duration,
            level,
            rating,
            price,
            description
        });

        const course = await newCourse.save();
        res.json(course);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PATCH api/courses/:id
// @desc    Update a course status (Approve/Reject)
// @access  Private/Admin
router.patch('/:id/status', auth, admin, async (req, res) => {
    const { status, adminFeedback } = req.body;
    try {
        let course = await Course.findById(req.params.id);
        if (!course) return res.status(404).json({ msg: 'Course not found' });

        course.status = status;
        if (adminFeedback !== undefined) {
            course.adminFeedback = adminFeedback;
        }
        if (status === 'published') {
            course.visibility = true;
        } else {
            course.visibility = false;
        }

        await course.save();
        res.json(course);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/courses/:id
// @desc    Update a course
// @access  Private/Admin
router.put('/:id', auth, admin, async (req, res) => {
    const courseFields = req.body;
    try {
        let course = await Course.findById(req.params.id);
        if (!course) return res.status(404).json({ msg: 'Course not found' });

        course = await Course.findByIdAndUpdate(
            req.params.id,
            { $set: courseFields },
            { new: true }
        );

        res.json(course);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/courses/:id
// @desc    Delete a course
// @access  Private/Admin or Instructor
router.delete('/:id', auth, async (req, res) => {
    if (req.user.role !== 'admin' && req.user.role !== 'instructor') {
        return res.status(403).json({ msg: 'Access denied' });
    }
    try {
        let course = await Course.findById(req.params.id);

        if (!course) return res.status(404).json({ msg: 'Course not found' });

        await Course.findByIdAndDelete(req.params.id);

        res.json({ msg: 'Course removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
