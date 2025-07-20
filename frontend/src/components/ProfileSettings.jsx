import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const ProfileSettings = ({ onClose }) => {
    const { authUser, setAuthUser } = useAuthContext();
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                toast.error("File size must be less than 5MB");
                return;
            }
            if (!file.type.startsWith('image/')) {
                toast.error("Please select an image file");
                return;
            }
            setSelectedFile(file);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            toast.error("Please select a file first");
            return;
        }

        setUploading(true);
        try {
            const formData = new FormData();
            formData.append('profilePic', selectedFile);

            const user = JSON.parse(localStorage.getItem("chat-user"));
            const res = await fetch('/api/users/upload-profile', {
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${user?.token}`,
                },
                body: formData
            });

            const data = await res.json();
            if (data.error) throw new Error(data.error);

            // Update auth context
            const updatedAuthData = {
                ...authUser,
                user: {
                    ...authUser.user,
                    profilepic: data.user.profilepic
                }
            };
            localStorage.setItem("chat-user", JSON.stringify(updatedAuthData));
            setAuthUser(updatedAuthData);

            toast.success("Profile picture updated successfully!");
            setSelectedFile(null);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800">Profile Settings</h2>
                    <button 
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        ✕
                    </button>
                </div>

                <div className="space-y-4">
                    <div className="text-center">
                        <img 
                            src={authUser.user?.profilepic || authUser.profilepic} 
                            alt="Profile" 
                            className="w-24 h-24 rounded-full mx-auto mb-4"
                        />
                        <h3 className="font-semibold text-gray-800">
                            {authUser.user?.fullname || authUser.fullname}
                        </h3>
                        <p className="text-gray-600">
                            {authUser.user?.username || authUser.username}
                        </p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Update Profile Picture
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileSelect}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                        {selectedFile && (
                            <p className="text-sm text-gray-600 mt-2">
                                Selected: {selectedFile.name}
                            </p>
                        )}
                    </div>

                    <div className="flex space-x-3">
                        <button
                            onClick={handleUpload}
                            disabled={!selectedFile || uploading}
                            className="flex-1 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {uploading ? "Uploading..." : "Upload"}
                        </button>
                        <button
                            onClick={onClose}
                            className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileSettings;