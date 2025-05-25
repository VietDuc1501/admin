import React, { useEffect, useState } from "react";
import "../styles/category/CategoryManager.css";
import getAllCategories from "../hooks/category/categoriesCourse";
import deleteCategoryById from "../hooks/category/deleteCategory";
import { useNavigate } from "react-router-dom";
import Category from "../types/Category";
import CategoryList from "../components/category/CategoryList";

const CategoryManagement: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (!userStr) navigate("/login");
  }, [navigate]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const data = await getAllCategories();
      setCategories(data);
      setError("");
    } catch {
      setError("❌ Failed to fetch categories.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this category?"))
      return;

    setError("");
    setSuccess("");

    try {
      await deleteCategoryById(id);
      setSuccess("✅ Category deleted successfully!");
      await fetchCategories();
    } catch {
      setError("❌ Failed to delete category.");
    }
  };

  const handleAddCategoryClick = () => {
    navigate("/CategoryManagement/AddCategory");
  };

  // Optional: handleEdit for future edit feature
  // const handleEdit = (id: string) => {
  //   navigate(`/CategoryManagement/EditCategory/${id}`);
  // };

  return (
    <div className="category-management-container">
      <h1>🗂️ Category Management</h1>

      {/* Add Category Button */}
      <div style={{ textAlign: "right", marginBottom: "20px" }}>
        <button className="toggle-add-btn" onClick={handleAddCategoryClick}>
          + Add Category
        </button>
      </div>

      {/* Status Messages */}
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      {/* Category List */}
      {loading ? (
        <p>Loading categories...</p>
      ) : (
        <CategoryList
          categories={categories}
          onDelete={handleDelete}
          // onEdit={handleEdit} // Uncomment if you want to enable edit
        />
      )}
    </div>
  );
};

export default CategoryManagement;
