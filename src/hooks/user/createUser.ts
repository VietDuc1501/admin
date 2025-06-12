import NewUser from "../../types/NewUser";

const createUserApi = async (user: NewUser): Promise<any> => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/user/create_id`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const contentType = response.headers.get("Content-Type") || "";

    // Kiểm tra nếu response là JSON
    const data = contentType.includes("application/json")
      ? await response.json()
      : null;

    if (!response.ok) {
      const message =
        (data && data.message) || `Failed to add user (HTTP ${response.status})`;
      throw new Error(message);
    }

    return data;
  } catch (error) {
    console.error("❌ Error creating user:", error);
    throw error;
  }
};

export default createUserApi;
