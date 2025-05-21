import React from "react";
import "../../styles/user/DeleteUser.css";

interface DeleteUserProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteUser: React.FC<DeleteUserProps> = ({ onConfirm, onCancel }) => {
  return (
    <div className="delete-modal">
      <div className="delete-modal-content">
        <h3 className="delete-title">Confirm Delete</h3>
        <p>Are you sure you want to delete this user?</p>
        <div className="delete-modal-actions">
          <button className="confirm-btn" onClick={onConfirm}>
            Yes, Delete
          </button>
          <button className="cancel-btn" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteUser;
