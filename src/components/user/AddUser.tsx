import React, { useState, useEffect } from "react";
import "../../styles/user/AddUser.css";
import { useNavigate } from "react-router-dom";
import createUserApi from "../../hooks/user/createUser";

const AddUser: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"ACTIVE" | "INACTIVE">("ACTIVE");
  const [roleId, setRoleId] = useState("");
  const [roles, setRoles] = useState<{ id: string; name: string }[]>([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  // Fetch danh sách role
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/roles`);
        const data = await res.json();
        setRoles(data);
      } catch (err) {
        console.error("Failed to fetch roles:", err);
        setRoles([]);
      }
    };
    fetchRoles();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    if (!roleId) {
      setErrorMessage("Please select a valid role.");
      return;
    }

    const newUser = {
      name,
      email,
      password,
      status,
      roleId,
    };

    try {
      const response = await createUserApi(newUser);
      if (response && response.id) {
        setSuccessMessage("✅ User added successfully!");
        setTimeout(() => navigate("/UserManagement"), 1500);
      } else {
        setErrorMessage("❌ Failed to add user.");
      }
    } catch (error: any) {
      console.error("Error adding user:", error);
      setErrorMessage(error?.message || "❌ Error occurred while adding user.");
    }
  };

  return (
    <div className="add-user-form">
      <h2>Add New User</h2>

      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="user-name">Name:</label>
          <input
            type="text"
            id="user-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="user-email">Email:</label>
          <input
            type="email"
            id="user-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="user-password">Password:</label>
          <input
            type="password"
            id="user-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="user-status">Status:</label>
          <select
            id="user-status"
            value={status}
            onChange={(e) => setStatus(e.target.value as "ACTIVE" | "INACTIVE")}
            required>
            <option value="ACTIVE">ACTIVE</option>
            <option value="INACTIVE">INACTIVE</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="user-role">Role:</label>
          <select
            id="user-role"
            value={roleId}
            onChange={(e) => setRoleId(e.target.value)}
            required>
            <option value="">-- Select Role --</option>
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Add User</button>
      </form>
    </div>
  );
};

export default AddUser;
