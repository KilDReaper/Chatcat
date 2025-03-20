import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Prevent empty submission
        if (!email || !newPassword) {
            toast.error("Please fill in all fields.");
            return;
        }

        setLoading(true);
        
        try {
            const response = await axios.post("http://localhost:5000/api/auth/forgot-password", { email, newPassword });
            toast.success(response.data.message || "Password updated successfully!");
            setEmail(""); // Clear input fields
            setNewPassword("");
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="forgot-password">
            <h2>Reset Password</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? "Updating..." : "Update Password"}
                </button>
            </form>
        </div>
    );
};

export default ForgotPassword;
