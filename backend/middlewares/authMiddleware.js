import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ msg: "Access denied" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Store user data in request object
        next(); // Move to next middleware/controller
    } catch (error) {
        res.status(400).json({ msg: "Invalid token" });
    }
};

export default authMiddleware;