import React, { useState } from "react";
import updateCategoryApi from "../../hooks/category/updateCategory";

interface Props {
  id: string;
  currentName: string;
  onCancel: () => void;
  onSuccess: () => void;
}

const EditCategory: React.FC<Props> = ({
  id,
  currentName,
  onCancel,
  onSuccess,
}) => {
  const [name, setName] = useState(currentName);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!name.trim()) {
      setError("Name cannot be empty");
      return;
    }
    try {
      await updateCategoryApi(id, { name });
      onSuccess();
    } catch {
      setError("Failed to update category");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="edit-category-form">
      {error && <div className="error-message">{error}</div>}
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        autoFocus
      />
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default EditCategory;
