import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/course/CourseList.css";
import Course from "../../types/Course";
import deleteCourseById from "../../hooks/course/deleteCourse";
import DeleteCourse from "./DeleteCourse";
import getAllCourses from "../../hooks/course/courseList";
import getAllCategories from "../../hooks/category/categoriesCourse";
import Category from "../../types/Category";

interface CourseListProps {
  courses: Course[];
  onDelete?: (courseId: string) => void;
}

const CourseList: React.FC<CourseListProps> = ({ onDelete }) => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>(
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      const coursesData = await getAllCourses();
      setCourses(coursesData);
      const categoriesData = await getAllCategories();
      const mappedCategories = categoriesData.map((cat: Category) => ({
        id: cat.id,
        name: (cat as any).name || (cat as any).categoryName || "",
      }));
      setCategories(mappedCategories);
    };
    fetchData();
  }, []);

  const handleEdit = (courseId: string) => {
    navigate(`/EditCourse/${courseId}`);
  };

  const handleViewLessons = (courseId: string) => {
    navigate(`/CourseLessons/${courseId}`);
  };

  const handleViewStudents = (courseId: string) => {
    navigate(`/Admin/Course/${courseId}/Students`);
  };

  const handleDeleteCourse = async (id: string) => {
    const response = await deleteCourseById(id);
    if (response.ok) {
      setCourses((prev) => prev.filter((course) => course.id !== id));
      if (onDelete) onDelete(id);
    } else {
      alert("Delete failed!");
    }
    setShowDeleteModal(false);
    setSelectedCourseId(null);
  };

  const openDeleteModal = (id: string) => {
    setSelectedCourseId(id);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedCourseId(null);
  };

  return (
    <div className="task-list">
      <ul className="task-items">
        {courses.map((course) => {
          const category = categories.find((c) => c.id === course.categoryId);
          return (
            <li key={course.id} className="task-item">
              <h3>{course.name}</h3>
              <p>
                <strong>Description:</strong> {course.description}
              </p>
              <p>
                <strong>Status:</strong> {course.courseStatus}
              </p>
              <p>
                <strong>Category:</strong>{" "}
                {category ? category.name : course.categoryId}
              </p>
              {course.imageUrl && (
                <img
                  src={course.imageUrl}
                  alt={course.name}
                  style={{ maxWidth: 120, display: "block", margin: "8px 0" }}
                />
              )}
              <div className="task-item-buttons">
                <button
                  className="edit-btn"
                  onClick={() => handleEdit(course.id)}>
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => openDeleteModal(course.id)}>
                  Delete
                </button>
                <button
                  className="edit-btn lesson-btn"
                  onClick={() => handleViewLessons(course.id)}>
                  Lessons
                </button>
                <button
                  className="edit-btn"
                  onClick={() => handleViewStudents(course.id)}>
                  👥 Students
                </button>
              </div>
            </li>
          );
        })}
      </ul>
      {showDeleteModal && selectedCourseId && (
        <DeleteCourse
          onConfirm={() => handleDeleteCourse(selectedCourseId)}
          onCancel={closeDeleteModal}
        />
      )}
    </div>
  );
};

export default CourseList;
