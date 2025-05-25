import React from "react";
import Category from "../../types/Category";

interface CategoryListProps {
  categories: Category[];
  onDelete: (id: string) => void;
  onEdit?: (id: string) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  onDelete,
  onEdit,
}) => {
  return (
    <div style={{ overflowX: "auto" }}>
      <table className="category-table">
        <thead>
          <tr>
            <th style={{ minWidth: 180 }}>Name</th>
            <th style={{ minWidth: 220 }}>Description</th>
            <th style={{ minWidth: 100 }}>Status</th>
            <th style={{ minWidth: 140 }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <tr key={cat.id}>
              <td>{cat.categoryName}</td>
              <td>
                {cat.description || <span style={{ color: "#bbb" }}>—</span>}
              </td>
              <td>
                <span
                  style={{
                    color:
                      cat.status === "ACTIVE"
                        ? "#388e3c"
                        : cat.status === "INACTIVE"
                        ? "#bdbdbd"
                        : "#e65100",
                    fontWeight: 500,
                  }}>
                  {cat.status}
                </span>
              </td>
              <td>
                <div className="category-actions">
                  {onEdit && (
                    <button className="edit-btn" onClick={() => onEdit(cat.id)}>
                      Edit
                    </button>
                  )}
                  <button
                    className="delete-btn"
                    onClick={() => onDelete(cat.id)}>
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {categories.length === 0 && (
            <tr>
              <td colSpan={4} style={{ textAlign: "center", color: "#888" }}>
                No categories found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryList;
