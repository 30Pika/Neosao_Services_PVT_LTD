import jwt from "jsonwebtoken";

const authenticateToken = (req, res, next) => {
    const SecretKey = process.env.JWT_Secret_Key;
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            status: false,
            message: 'No token provided',
        });
    }

    jwt.verify(token, SecretKey, (err, user) => {
        if (err) {
            return res.status(403).json({
                status: false,
                message: 'Invalid token',
                error: err.message,
            });
        }

        req.user = user;
        next();
    });
};

export default authenticateToken;
