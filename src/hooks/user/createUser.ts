import NewUser from "../../types/NewUser";

const createUserApi = async (user: NewUser): Promise<any> => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || "Failed to add user");
        }
        return data;
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
};

export default createUserApi;