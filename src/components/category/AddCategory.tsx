import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import createCategoryApi from "../../hooks/category/createCategory";

const AddCategory: React.FC = () => {
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("ACTIVE");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!categoryName.trim()) {
      setError("Category name is required");
      return;
    }

    try {
      await createCategoryApi({ categoryName, description, status });
      setSuccess("Category added successfully!");
      setCategoryName("");
      setDescription("");
      setStatus("ACTIVE");
      // Chuyển về trang quản lý danh mục sau khi thêm thành công
      setTimeout(() => navigate("/CategoryManagement"), 800);
    } catch (err) {
      console.error("Error adding category:", err);
      setError("Failed to add category");
    }
  };

  return (
    <form className="add-category-form" onSubmit={handleSubmit}>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <div className="form-row">
        <input
          type="text"
          placeholder="Category name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="ACTIVE">ACTIVE</option>
          <option value="INACTIVE">INACTIVE</option>
          <option value="ARCHIVED">ARCHIVED</option>
        </select>
        <button type="submit" className="add-btn">
          + Add Category
        </button>
      </div>
    </form>
  );
};

export default AddCategory;
