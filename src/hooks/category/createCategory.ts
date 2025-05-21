interface NewCategory {
  categoryName: string;
  description: string;
  status: string;
}

const createCategoryApi = async (category: NewCategory): Promise<any> => {
  try {
    console.log("📤 Gửi lên backend:", category); // Xem kỹ dữ liệu

    const response = await fetch(`${import.meta.env.VITE_API_URL}/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(category),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to add category");
    }

    return data;
  } catch (error) {
    console.error("❌ Error adding category:", error);
    throw error;
  }
};

export default createCategoryApi;
