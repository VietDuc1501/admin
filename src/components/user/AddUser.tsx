import React, { useState } from "react";
import "../../styles/user/AddUser.css";
import { useNavigate } from "react-router-dom";
// Bạn cần tạo hook createUserApi để gọi API tạo user
import createUserApi from "../../hooks/user/createUser";

const AddUser: React.FC = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState<"ACTIVE" | "INACTIVE">("ACTIVE");
    const [roleId, setRoleId] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newUser = {
            name,
            email,
            password,
            status,
            roleId,
        };

        try {
            const response = await createUserApi(newUser);
            if (response.ok) {
                setSuccessMessage("User added successfully!");
                setTimeout(() => navigate("/UserManagement"), 1000);
            } else {
                setSuccessMessage("Failed to add user!");
            }
        } catch (error) {
            alert("Error adding user!");
        }
    };

    return (
        <div className="add-user-form">
            <h2>Add New User</h2>
            {successMessage && (
                <div className="success-message">{successMessage}</div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="user-name">Name:</label>
                    <input
                        type="text"
                        id="user-name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="user-email">Email:</label>
                    <input
                        type="email"
                        id="user-email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="user-password">Password:</label>
                    <input
                        type="password"
                        id="user-password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="user-status">Status:</label>
                    <select
                        id="user-status"
                        value={status}
                        onChange={e => setStatus(e.target.value as "ACTIVE" | "INACTIVE")}
                        required
                    >
                        <option value="ACTIVE">ACTIVE</option>
                        <option value="INACTIVE">INACTIVE</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="user-role">Role ID:</label>
                    <input
                        type="text"
                        id="user-role"
                        value={roleId}
                        onChange={e => setRoleId(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Add User</button>
            </form>
        </div>
    );
};

export default AddUser;