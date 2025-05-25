import React from "react";
import AddCategoryForm from "../components/category/AddCategory";

const AddCategory: React.FC = () => {
  return (
    <div className="category-management-page">
      <h1>➕ Add New Category</h1>
      <AddCategoryForm onSuccess={() => window.history.back()} />
    </div>
  );
};

export default AddCategory;
