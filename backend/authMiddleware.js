const jwt = require('jsonwebtoken');
const User = require('./models/User');

const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Add user from payload
            req.user = await User.findById(decoded.id).select('-password');

            next();
        } catch (error) {
            console.error('Authorization failed:', error);
            res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }
    } else {
        res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
};

module.exports = protect;

