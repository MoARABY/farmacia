const jwt = require('jsonwebtoken');

const generateToken = (payload) => {
    return jwt.sign({ id: payload._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    });
}