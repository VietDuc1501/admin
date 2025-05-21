import React from "react";
import Lesson from "../../types/Submission";

interface SubmissionActionsProps {
  onEdit: () => void;
  onDelete: () => void;
}

const SubmissionActions: React.FC<SubmissionActionsProps> = ({
  onEdit,
  onDelete,
}) => {
  return (
    <div className="submission-actions">
      <button className="edit-btn" onClick={onEdit}>
        Edit
      </button>
      <button className="delete-btn" onClick={onDelete}>
        Delete
      </button>
    </div>
  );
};

export default SubmissionActions;
