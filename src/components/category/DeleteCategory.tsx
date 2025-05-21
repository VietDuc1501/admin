import React from "react";
import deleteCategoryById from "../../hooks/category/deleteCategory";

interface Props {
  id: string;
  onDeleted: () => void;
}

const DeleteCategory: React.FC<Props> = ({ id, onDeleted }) => {
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this category?"))
      return;
    try {
      await deleteCategoryById(id);
      onDeleted();
    } catch (error) {
      alert("Failed to delete category");
    }
  };

  return (
    <button className="delete-btn" onClick={handleDelete}>
      Delete
    </button>
  );
};

export default DeleteCategory;
