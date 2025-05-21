import React from "react";

interface DeleteUserProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteUser: React.FC<DeleteUserProps> = ({ onConfirm, onCancel }) => {
  return (
    <div className="delete-modal">
      <div className="delete-modal-content">
        <h3>Are you sure you want to delete this user?</h3>
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
