const asyncHandler = require('express-async-handler');
const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("all fiels are mandatory !");
    }
    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
        res.status(400);
        throw new Error("user already exist !");
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        username,
        email,
        password: hashedPassword
    })
    if (user) {
        res.status(201).json({ _id: user._id, email: user.email });
    } else {
        res.status(400);
        throw new Error("user data is not valid !");
    }
});

// for Login
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("all fiels are mandatory !");
    }
    const user = await User.findOne({ email });
    
    if (!user) {
        return res.status(401).json({ error: 'User not found' });
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid password' });
    }

    const accessToken = jwt.sign({
        user: {
            username: user.username,
            email: user.email,
            id: user.id
        }
    }, 'ajaykumar', { expiresIn: '15m' });
   
    res.status(200).json({ accessToken });
});

const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
});

module.exports = { registerUser, loginUser, currentUser }