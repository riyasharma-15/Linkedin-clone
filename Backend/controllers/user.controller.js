import User from "../models/user.model.js";
import Profile from "../models/profile.model.js";
import bcrypt from 'bcrypt';
import crypto from 'crypto';


export const register = async (req, res) => {
    try {
        const { name, email, password, username } = req.body;
        if (!name || !email || !password || !username)
            return res.status(400).json({ message: "All fields are required" })

        const user = await User.findOne({
            email
        });
        if (user) return res.status(400).json({ message: "User already exists" })

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            username
        });
        await newUser.save();

        const profile = new Profile({ userId: newUser._id });
        await profile.save();

        return res.json({ message: "User registered Successfully" })

    }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const login = async (req, res) => {
    try {
        const { email, username, password } = req.body;

        if ((!email && !username) || !password) {
            return res.status(400).json({ message: "Email/Username and Password are required" });
        }

        // Find user by email OR username
        const user = await User.findOne({
            $or: [
                { email: email || "" },
                { username: username || "" }
            ]
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check password
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate session token
        const token = crypto.randomBytes(32).toString('hex');

        // Store token in database
        user.token = token;
        await user.save();

        return res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                username: user.username,
                email: user.email
            }
        });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}