const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800'
    },
    instructor: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    level: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced'],
        default: 'Beginner'
    },
    rating: {
        type: Number,
        default: 4.5
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        default: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800'
    },
    instructorID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    lessons: [{
        title: String,
        videoURL: String,
        content: String,
        orderIndex: Number
    }],
    status: {
        type: String,
        enum: ['draft', 'pending', 'published'],
        default: 'pending'
    },
    visibility: {
        type: Boolean,
        default: false
    },
    adminFeedback: {
        type: String,
        default: ''
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Course', CourseSchema);
