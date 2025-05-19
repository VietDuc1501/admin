import React, { useEffect, useState } from "react";
import User from "../../types/User";
import getAllUser from "../../hooks/user/userList";
import getAllRoles from "../../hooks/RoleUser"; // Thêm dòng này
import Role from "../../types/Role"; // Thêm dòng này

interface UserListProps {
    users ?: User[];
    onDelete?: (id: string) => void;
}

const UserList: React.FC<UserListProps> = ({ onDelete }) => {
    const [users, setUsers] = useState<User[]>([]);
    const [roles, setRoles] = useState<Role[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const data = await getAllUser();
            setUsers(data);
        };
        fetchUsers();
        const fetchRoles = async () => {
            const data = await getAllRoles();
            setRoles(data);
            console.log("Roles:", data);
        };
        fetchRoles();
    }, []);

    // Hàm lấy roleName từ roleId
    const getRoleName = (roleId: string) => {
        const role = roles.find(r => r.id === roleId);
        // Đổi role.roleName thành role.name nếu API trả về name
        return role ? (role.roleName || role.name || roleId) : roleId;
    };

    return (
        <div className="user-list">
            <h2 className="user-list-title">👤 User List</h2>
            <ul className="user-items">
                {users.map(user => (
                    <li key={user.id} className="user-item">
                        <p><strong>Name:</strong> {user.name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Status:</strong> {user.status}</p>
                        <p><strong>Role:</strong> {getRoleName(user.roleId)}</p>
                        {onDelete && (
                            <button className="delete-btn" onClick={() => onDelete(user.id)}>
                                Delete
                            </button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;