import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import createSubmissionApi from "../../hooks/submission/createSubmission"; // Bạn cần tạo file này
import "../../styles/submission/AddSubmission.css"; // Tùy bạn có style hay không

const AddSubmission: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [courseId, setCourseId] = useState("");
  const [studentId, setStudentId] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newSubmission = {
      title,
      content,
      courseId,
      studentId,
    };

    try {
      await createSubmissionApi(newSubmission);
      setSuccessMessage("Submission added successfully!");
      setTitle("");
      setContent("");
      setCourseId("");
      setStudentId("");
      setTimeout(() => navigate("/SubmissionManagement"), 1000);
    } catch (error) {
      alert("Error adding submission!");
    }
  };

  return (
    <div className="add-submission-form">
      <h2>Add New Submission</h2>
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="submission-title">Title:</label>
          <input
            type="text"
            id="submission-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="submission-content">Content:</label>
          <textarea
            id="submission-content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="submission-course">Course ID:</label>
          <input
            type="text"
            id="submission-course"
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="submission-student">Student ID:</label>
          <input
            type="text"
            id="submission-student"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Submission</button>
      </form>
    </div>
  );
};

export default AddSubmission;
