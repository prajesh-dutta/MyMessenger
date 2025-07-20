
import User from '../models/usermodel.js'; // Import the User model
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import passport from '../config/passport.js';

export const register = async (req, res) => {
    try {
        const { fullname, username, password, confirmpassword, gender } = req.body;
        
        if (password !== confirmpassword) {
            return res.status(400).json({ message: "Password does not match" });
        }

        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ message: "Username already exists" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
        const newUser = new User({
            fullname,
            username,
            password: hashedPassword,
            gender,
            profilepic: gender === "male" ? boyProfilePic : girlProfilePic
        });

        await newUser.save();
        return res.status(201).json({ 
            _id: newUser._id,
            fullname: newUser.fullname,
            username: newUser.username,
            profilepic: newUser.profilepic
        })
    } catch (error) {
        console.error(error); // Log the error
        return res.status(500).json({ message: "Internal server error" });
    }
};
export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'fallback_secret');

        return res.status(200).json({ 
            token,
            user: {
                _id: user._id,
                fullname: user.fullname,
                username: user.username,
                profilepic: user.profilepic
            }
        });
    } catch (error) {
        console.error(error); // Log the error
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const logout = async (_, res) => {
    try {
        // Clear the JWT token from the client-side
        res.clearCookie('token');

        return res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        console.error(error); // Log the error
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Google OAuth
export const googleAuth = passport.authenticate('google', {
    scope: ['profile', 'email']
});

export const googleCallback = (req, res, next) => {
    passport.authenticate('google', (err, user) => {
        if (err) {
            return res.redirect('http://localhost:5173/login?error=oauth_error');
        }
        if (!user) {
            return res.redirect('http://localhost:5173/login?error=oauth_failed');
        }
        
        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'fallback_secret');
        
        // Redirect to frontend with token
        res.redirect(`http://localhost:5173/auth/success?token=${token}&user=${encodeURIComponent(JSON.stringify({
            _id: user._id,
            fullname: user.fullname,
            username: user.username,
            profilepic: user.profilepic
        }))}`);
    })(req, res, next);
};