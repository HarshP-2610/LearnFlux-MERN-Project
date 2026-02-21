const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const ApprovalRequest = require('../models/ApprovalRequest');
const Course = require('../models/Course');
const User = require('../models/User');

// @route   POST api/requests
// @desc    Create a new approval request
// @access  Private/Instructor
router.post('/', auth, async (req, res) => {
    // Only instructors (or admins) can create requests
    if (req.user.role !== 'instructor' && req.user.role !== 'admin') {
        return res.status(403).json({ msg: 'Access denied' });
    }

    const { actionType, payload, courseId } = req.body;

    try {
        let requestPayload = { ...payload };

        if (actionType === 'CREATE' || actionType === 'EDIT') {
            // We can add/override the instructor property
            const user = await User.findById(req.user.id);
            if (user) requestPayload.instructor = user.name;
            // set transient status
            requestPayload.status = 'pending_approval';
        }

        const newRequest = new ApprovalRequest({
            instructorId: req.user.id,
            actionType,
            payload: requestPayload,
            courseId: courseId || null,
        });

        // Optionally, if EDIT or DELETE, update the course status to 'pending_approval' immediately?
        // Prompt says: "Disable the 'Delete' or 'Edit' buttons for that item while a request is active."
        if (courseId && (actionType === 'EDIT' || actionType === 'DELETE')) {
            await Course.findByIdAndUpdate(courseId, { status: 'pending_approval' });
        }

        const request = await newRequest.save();
        res.json(request);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/requests/pending
// @desc    Get all pending requests (Admin) or instructor's requests
// @access  Private
router.get('/pending', auth, async (req, res) => {
    try {
        let query = { status: 'pending' };

        // If not admin, restrict to their own requests
        if (req.user.role !== 'admin') {
            query.instructorId = req.user.id;
        }

        const requests = await ApprovalRequest.find(query)
            .populate('instructorId', 'name email')
            .sort({ createdAt: -1 });

        res.json(requests);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/requests/:id/resolve
// @desc    Approve or reject a request
// @access  Private/Admin
router.put('/:id/resolve', auth, admin, async (req, res) => {
    const { action, adminFeedback } = req.body; // action: 'approve' or 'reject'

    try {
        const request = await ApprovalRequest.findById(req.params.id);
        if (!request) return res.status(404).json({ msg: 'Request not found' });
        if (request.status !== 'pending') return res.status(400).json({ msg: 'Request already resolved' });

        if (action === 'reject') {
            request.status = 'rejected';
            request.adminFeedback = adminFeedback || 'No reason provided';
            await request.save();

            // Revert course status based on actionType if needed
            if (request.courseId && (request.actionType === 'EDIT' || request.actionType === 'DELETE')) {
                await Course.findByIdAndUpdate(request.courseId, { status: 'published' });
            }

            return res.json(request);
        }

        if (action === 'approve') {
            request.status = 'approved';
            request.adminFeedback = adminFeedback || 'Approved';

            // Apply changes to main Course collection
            request.payload.status = 'published';

            if (request.actionType === 'CREATE') {
                const newCourse = new Course(request.payload);
                await newCourse.save();
            } else if (request.actionType === 'EDIT') {
                if (request.courseId) {
                    await Course.findByIdAndUpdate(request.courseId, { $set: request.payload }, { new: true });
                }
            } else if (request.actionType === 'DELETE') {
                if (request.courseId) {
                    await Course.findByIdAndDelete(request.courseId);
                }
            }

            await request.save();
            return res.json(request);
        }

        res.status(400).json({ msg: 'Invalid action' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
