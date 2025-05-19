import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchUserById, updateUser } from "../../hooks/user/editUser";
import User from "../../types/User";
import Role from "../../types/Role";
import fetchAllRoles from "../../hooks/role/RoleUser";
import "../../styles/user/EditUser.css";
const EditUser: React.FC = () => {
    const { userId } = useParams<{ userId: string }>();
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [roles, setRoles] = useState<Role[]>([]);

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            setError(null);
            try {
                if (!userId) {
                    setError("Thiếu userId");
                    setLoading(false);
                    return;
                }
                const data = await fetchUserById(userId);
                setUser(data);
            } catch (err) {
                setError("Không thể tải thông tin người dùng");
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [userId]);

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const data = await fetchAllRoles();
                setRoles(data);
            } catch (err) {
                // Có thể xử lý lỗi nếu cần
            }
        };
        fetchRoles();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (!user) return;
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            if (user) {
                await updateUser(user);
                alert("Cập nhật thành công!");
                navigate("/UserManagement");
            }
        } catch (err) {
            setError("Cập nhật thất bại");
        }
    };

    if (loading) return <div style={{ textAlign: "center", marginTop: 32 }}>Đang tải...</div>;
    if (error) return <div style={{ color: "red", textAlign: "center", marginTop: 32 }}>{error}</div>;
    if (!user) return <div style={{ textAlign: "center", marginTop: 32 }}>Không tìm thấy người dùng</div>;

    return (
        <div className="edit-user-container">
            <h2>Chỉnh sửa người dùng</h2>
            <form className="edit-user-form" onSubmit={handleSubmit} autoComplete="off">
                <div>
                    <label htmlFor="edit-user-name">Tên:</label>
                    <input
                        id="edit-user-name"
                        type="text"
                        name="name"
                        placeholder="Nhập tên người dùng"
                        title="Tên người dùng"
                        value={user.name}
                        onChange={handleChange}
                        required
                        autoComplete="off"
                    />
                </div>
                <div>
                    <label htmlFor="edit-user-email">Email:</label>
                    <input
                        id="edit-user-email"
                        type="email"
                        name="email"
                        placeholder="Nhập email"
                        title="Email"
                        value={user.email}
                        onChange={handleChange}
                        required
                        autoComplete="off"
                    />
                </div>
                <div>
                    <label htmlFor="edit-user-status">Status:</label>
                    <select
                        id="edit-user-status"
                        name="status"
                        value={user.status}
                        onChange={handleChange}
                        required
                    >
                        <option value="ACTIVE">ACTIVE</option>
                        <option value="INACTIVE">INACTIVE</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="edit-user-role">Role:</label>
                    <select
                        id="edit-user-role"
                        name="roleId"
                        value={user.roleId}
                        onChange={handleChange}
                        required
                    >
                        <option value="">-- Chọn vai trò --</option>
                        {roles.map(role => (
                            <option key={role.id} value={role.id}>
                                {role.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit">Lưu</button>
            </form>
        </div>
    );
};

export default EditUser;