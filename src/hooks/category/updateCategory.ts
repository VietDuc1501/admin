interface EditCategory {
  name: string;
}

const updateCategoryApi = async (id: string, category: EditCategory): Promise<any> => {
  try {
    // Sử dụng đúng endpoint backend: /categories/{id}
    const response = await fetch(`${import.meta.env.VITE_API_URL}/categories/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(category),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to update category");
    }
    return data;
  } catch (error) {
    console.error("Error updating category:", error);
    throw error;
  }
};

export default updateCategoryApi;