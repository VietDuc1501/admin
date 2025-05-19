import NewUser from "../../types/NewUser";
const createUserApi = async (user: NewUser): Promise<Response> => {
    try {
        const response = await fetch("/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });
        return response;
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
};

export default createUserApi;