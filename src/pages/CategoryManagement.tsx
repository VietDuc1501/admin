import React, { useEffect, useState } from "react";
import "../styles/category/CategoryManager.css";
import getAllCategories from "../hooks/category/categoriesCourse";
import deleteCategoryById from "../hooks/category/deleteCategory";
import AddCategory from "../components/category/AddCategory";
import { useNavigate } from "react-router-dom";
import Category from "../types/Category";

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
      setError("Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setError("");
    setSuccess("");

    if (!window.confirm("Are you sure you want to delete this category?"))
      return;

    try {
      await deleteCategoryById(id);
      setSuccess("Category deleted successfully!");
      await fetchCategories();
    } catch {
      setError("Failed to delete category");
    }
  };

  return (
    <div className="category-management-page">
      <h1>Category Management</h1>

      <AddCategory onSuccess={fetchCategories} />

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      {loading ? (
        <p>Loading categories...</p>
      ) : (
        <ul className="category-list">
          {categories.map((cat) => (
            <li key={cat.id} className="category-item">
              <div className="category-info">
                <strong>{cat.categoryName}</strong>
                <p>{cat.description}</p>
                <span>Status: {cat.status}</span>
              </div>
              <div className="category-actions">
                {/* Bạn có thể thêm nút Edit tại đây sau */}
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(cat.id)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategoryManagement;
