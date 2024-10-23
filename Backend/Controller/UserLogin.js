import bcrypt from 'bcrypt';
import UserSche from "../Module/User.js";
import generateToken from '../Middleware/GenerateToken.js';

const UserLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserSche.findOne({ email });

        if (!user) {
            return res.status(404).json({
                status: false,
                message: "User not registered."
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                status: false,
                message: "Password doesn't match."
            });
        }

        const token = await generateToken(user);
        return res.status(200).json({
            status: true,
            message: "Login successful!",
            token
        });

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "An error occurred during login.",
            error: error.message
        });
    }
};

export default UserLogin;
