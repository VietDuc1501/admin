const deleteSubmissionById = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/submissions/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || "Failed to delete submission");
    }
  } catch (error) {
    console.error("Error deleting submission:", error);
    throw error;
  }
};

export default deleteSubmissionById;