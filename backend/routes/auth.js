const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// @route   POST api/auth/signup
// @desc    Register user
router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User({
            name,
            email,
            password
        });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // If it's the admin email, set role to admin
        if (email === 'admin@gmail.com') {
            user.role = 'admin';
        }

        await user.save();

        const payload = {
            user: {
                id: user.id,
                role: user.role
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '24h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   POST api/auth/login
// @desc    Authenticate user & get token
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if it's the hardcoded admin case
        if (email === 'admin@gmail.com' && password === 'admin1234') {
            let admin = await User.findOne({ email });

            if (!admin) {
                // Create admin if not exists
                admin = new User({
                    name: 'Admin',
                    email: 'admin@gmail.com',
                    password: 'admin1234', // This will be hashed below
                    role: 'admin'
                });
                const salt = await bcrypt.genSalt(10);
                admin.password = await bcrypt.hash('admin1234', salt);
                await admin.save();
            }

            const payload = {
                user: { id: admin.id, role: admin.role }
            };

            return jwt.sign(
                payload,
                process.env.JWT_SECRET,
                { expiresIn: '24h' },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token, user: { id: admin.id, name: admin.name, email: admin.email, role: admin.role } });
                }
            );
        }

        // Check if it's the hardcoded instructor case
        if (email === 'ins@gmail.com' && password === 'ins12345') {
            let instructor = await User.findOne({ email });

            if (!instructor) {
                // Create instructor if not exists
                instructor = new User({
                    name: 'Instructor',
                    email: 'ins@gmail.com',
                    password: 'ins12345',
                    role: 'instructor'
                });
                const salt = await bcrypt.genSalt(10);
                instructor.password = await bcrypt.hash('ins12345', salt);
                await instructor.save();
            }

            const payload = {
                user: { id: instructor.id, role: instructor.role }
            };

            return jwt.sign(
                payload,
                process.env.JWT_SECRET,
                { expiresIn: '24h' },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token, user: { id: instructor.id, name: instructor.name, email: instructor.email, role: instructor.role } });
                }
            );
        }

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const payload = {
            user: {
                id: user.id,
                role: user.role
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '24h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
