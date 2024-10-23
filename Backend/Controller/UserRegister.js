import bcrypt from 'bcrypt';
import UserSche from "../Module/User.js"

const UserRegister = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await UserSche.findOne({ email });
        if (user) {
            return res.status(400).json({
                status: false,
                message: "Email already exists. Please use a different email."
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(password, salt);

        const newUser = new UserSche({
            name,
            email,
            password: hashpassword,
        });

        await newUser.save();

        res.status(201).json({
            status: true,
            message: "User registered successfully!",
            data: { name, email }
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "An error occurred during registration.",
            error: error.message
        });
    }
}

export default UserRegister;
