import { useEffect, useState } from "react";
import User from "../../types/User";

const useUser = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch("`${import.meta.env.VITE_API_URL}/api/user"); // Đổi endpoint nếu cần
                if (!response.ok) throw new Error("Failed to fetch users");
                const data = await response.json();
                setUsers(data as User[]);
            } catch (err: any) {
                setError(err.message || "Unknown error");
            }
        };
        fetchUsers();
    }, []);

    return { users, error };
};

export default useUser;