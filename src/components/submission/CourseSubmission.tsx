import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../styles/submission/CourseSubmission.css";
import SubmissionActions from "./SubmissionActions";
import getSubmissionsByCourse from "../../hooks/submission/getSubmissionsByCourse"; // Bạn cần tạo file này
import deleteSubmissionById from "../../hooks/submission/deleteSubmission"; // Bạn cần tạo file này

interface Submission {
  id: string;
  title: string;
  content: string;
  studentId: string;
  // Thêm các trường khác nếu cần
}

const CourseSubmission: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubmissions = async () => {
      setLoading(true);
      try {
        const data = await getSubmissionsByCourse(courseId!);
        setSubmissions(data);
      } catch {
        setSubmissions([]);
      }
      setLoading(false);
    };
    if (courseId) fetchSubmissions();
  }, [courseId]);

  const handleEdit = (submissionId: string) => {
    navigate(`/EditSubmission/${submissionId}`);
  };

  const handleDelete = async (submissionId: string) => {
    if (!window.confirm("Are you sure you want to delete this submission?"))
      return;
    try {
      await deleteSubmissionById(submissionId);
      setSubmissions(submissions.filter((s) => s.id !== submissionId));
    } catch {
      alert("Delete failed!");
    }
  };

  return (
    <div className="course-submission-list">
      <h2>Submissions for Course {courseId}</h2>
      {loading ? (
        <p>Loading...</p>
      ) : submissions.length === 0 ? (
        <p>No submissions found.</p>
      ) : (
        <ul>
          {submissions.map((submission) => (
            <li key={submission.id} className="submission-item">
              <h3>{submission.title}</h3>
              <p>
                <strong>Content:</strong> {submission.content}
              </p>
              <p>
                <strong>Student ID:</strong> {submission.studentId}
              </p>
              <SubmissionActions
                onEdit={() => handleEdit(submission.id)}
                onDelete={() => handleDelete(submission.id)}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CourseSubmission;
