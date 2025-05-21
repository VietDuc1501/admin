const deleteUserById = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/user/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || "Failed to delete user");
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

export default deleteUserById;