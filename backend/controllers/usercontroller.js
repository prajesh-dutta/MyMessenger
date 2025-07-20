import User from '../models/usermodel.js';

export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;

        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

        res.status(200).json(filteredUsers);
    } catch (error) {
        console.error("Error in getUsersForSidebar: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const updateProfilePicture = async (req, res) => {
    try {
        const userId = req.user._id;
        
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        const profilePicUrl = `/uploads/profile-pics/${req.file.filename}`;
        
        const user = await User.findByIdAndUpdate(
            userId,
            { profilepic: profilePicUrl },
            { new: true }
        ).select("-password");

        res.status(200).json({
            message: "Profile picture updated successfully",
            user: user
        });
    } catch (error) {
        console.error("Error in updateProfilePicture: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};