import React, { useState, useEffect } from "react";
import "../styles/user/UserManagementPage.css";
import UserList from "../components/user/UserList";
import { useNavigate } from "react-router-dom";
import useUser from "../hooks/user/useUser";
import User from "../types/User";

const UserManagementPage: React.FC = () => {
  const navigate = useNavigate();
  const { users: initialUsers } = useUser();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    setUsers(initialUsers);
  }, [initialUsers]);

  const handleAddUserClick = () => {
    navigate("/AddUser");
  };

  const handleDelete = (id: string) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  return (
    <div className="user-management-container">
      <h1>👨‍🎓 User Management</h1>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <button className="add-user-button" onClick={handleAddUserClick}>
          + Add New User
        </button>
      </div>
      <UserList users={users} onDelete={handleDelete} />
    </div>
  );
};

export default UserManagementPage;
