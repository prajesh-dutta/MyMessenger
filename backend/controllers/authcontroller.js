
import User from '../models/usermodel.js'; // Import the User model

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

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
        const newUser = new User({
            fullname,
            username,
            password,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic
        });

        await newUser.save();
        return res.status(201).json({ message: "User registered successfully" });
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

        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

        return res.status(200).json({ token });
    } catch (error) {
        console.error(error); // Log the error
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const logout = async (req, res) => {
    try {
        // Clear the JWT token from the client-side
        res.clearCookie('token');

        return res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        console.error(error); // Log the error
        return res.status(500).json({ message: "Internal server error" });
    }
};