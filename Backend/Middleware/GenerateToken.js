import Jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const SecretKey = process.env.JWT_Secret_Key;
const JWT_key_ExpiresIn = process.env.JWT_Key_ExpiresIn;

export const generateToken = (user) => {
    return new Promise((resolve, reject) => {
        Jwt.sign(
            { Id: user._id, email: user.email },
            SecretKey,
            { expiresIn: JWT_key_ExpiresIn },
            (err, token) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(token);
                }
            }
        );
    });
};

export default generateToken;