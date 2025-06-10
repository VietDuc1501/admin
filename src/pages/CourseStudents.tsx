import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface StudentDTO {
  userId: string;
  userName: string;
  userEmail: string;
  status: string;
}

const CourseStudents: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [students, setStudents] = useState<StudentDTO[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/enrollments/course/${courseId}`
        );
        if (!res.ok) throw new Error("Failed to fetch students");
        const data = await res.json();
        setStudents(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (courseId) fetchStudents();
  }, [courseId]);

  return (
    <div className="user-list">
      <h2 className="user-list-title">👥 Students</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && students.length === 0 && <p>No students enrolled.</p>}
      <ul className="user-items">
        {students.map((student) => (
          <li key={student.userId} className="user-item">
            <p>
              <strong>Name:</strong> {student.userName}
            </p>
            <p>
              <strong>Email:</strong> {student.userEmail}
            </p>
            <p>
              <strong>Status:</strong> {student.status}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseStudents;
