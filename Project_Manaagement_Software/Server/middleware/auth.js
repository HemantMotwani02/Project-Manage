const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Unauthorized' });
            } else {
                req.decoded = decoded; // Add decoded token to request object
                next(); // Call next middleware or route handler
            }
        });
    } catch (error) {
        console.error('Error verifying token:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    verifyToken
};
