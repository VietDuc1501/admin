import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import User from "../../types/User";
import getAllUser from "../../hooks/user/userList";
import getAllRoles from "../../hooks/role/RoleUser";
import Role from "../../types/Role";
import deleteUserById from "../../hooks/user/deleteUser";
import DeleteUser from "./DeleteUser";

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setError("");
    try {
      const [userData, roleData] = await Promise.all([
        getAllUser(),
        getAllRoles(),
      ]);
      setUsers(userData);
      setRoles(roleData);
    } catch (err) {
      setError("❌ Failed to fetch users or roles.");
    }
  };

  const getRoleName = (roleId: string) => {
    const role = roles.find((r) => r.id === roleId);
    return role ? role.roleName || role.name || roleId : roleId;
  };

  const confirmDelete = async () => {
    if (!selectedUserId) return;
    try {
      await deleteUserById(selectedUserId);
      setUsers((prev) => prev.filter((u) => u.id !== selectedUserId));
      setSelectedUserId(null);
    } catch (err) {
      setError("❌ Error deleting user.");
    }
  };

  return (
    <div className="user-list">
      <h2 className="user-list-title">👤 User List</h2>

      {error && <div className="error-message">{error}</div>}

      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <ul className="user-items">
          {users.map((user) => (
            <li key={user.id} className="user-item">
              <p>
                <strong>Name:</strong> {user.name}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Status:</strong> {user.status}
              </p>
              <p>
                <strong>Role:</strong> {getRoleName(user.roleId)}
              </p>
              <button
                className="edit-btn"
                onClick={() => navigate(`/edit-user/${user.id}`)}>
                Edit
              </button>
              <button
                className="delete-btn"
                onClick={() => setSelectedUserId(user.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Delete Confirmation Modal */}
      {selectedUserId && (
        <DeleteUser
          onConfirm={confirmDelete}
          onCancel={() => setSelectedUserId(null)}
        />
      )}
    </div>
  );
};

export default UserList;
