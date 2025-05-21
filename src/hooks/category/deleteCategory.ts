const deleteCategoryById = async (id: string): Promise<void> => {
  try {
    // Sử dụng đúng endpoint backend: /categories/{id}
    const response = await fetch(`${import.meta.env.VITE_API_URL}/categories/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || "Failed to delete category");
    }
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
};

export default deleteCategoryById;