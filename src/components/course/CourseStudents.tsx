import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface StudentDTO {
  userId: string;
  learnerName: string;
  enrollmentDate: string;
}

const CourseStudents: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [students, setStudents] = useState<StudentDTO[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchStudents = async () => {
      if (!courseId) return;

      try {
        const res = await fetch(
          `${
            import.meta.env.VITE_API_URL
          }/enrollments/course/${courseId}/enrollments`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch students");
        }
        const data: StudentDTO[] = await res.json();
        setStudents(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
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
              <strong>Name:</strong> {student.learnerName}
            </p>
            <p>
              <strong>Enrollment Date:</strong>{" "}
              {new Date(student.enrollmentDate).toLocaleDateString("vi-VN")}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseStudents;
