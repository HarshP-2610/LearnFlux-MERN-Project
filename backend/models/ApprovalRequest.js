const mongoose = require('mongoose');

const ApprovalRequestSchema = new mongoose.Schema({
    instructorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    actionType: {
        type: String,
        enum: ['CREATE', 'EDIT', 'DELETE'],
        required: true
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    },
    payload: {
        type: Object
    },
    adminFeedback: {
        type: String,
        default: ''
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('ApprovalRequest', ApprovalRequestSchema);
