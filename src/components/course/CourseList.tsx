import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/course/CourseList.css';
import Course from '../../types/Course';
import deleteCourseById from '../../hooks/course/deleteCourse';
import DeleteCourse from './DeleteCourse';
import getAllCourses from '../../hooks/course/courseList';

interface CourseListProps {
    courses: Course[];
    onDelete?: (courseId: string) => void;
}

const CourseList: React.FC<CourseListProps> = ({
    onDelete,
}) => {
    const navigate = useNavigate();
    const [courses, setCourses] = useState<Course[]>([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

    useEffect(() => {
        const fetchCourses = async () => {
            const data = await getAllCourses();
            setCourses(data);
        };
        fetchCourses();
    }, []);

    // Chỉ chuyển trang, không fetch trước khi edit
    const handleEdit = (courseId: string) => {
        navigate(`/EditCourse/${courseId}`);
    };

    const handleDeleteCourse = async (id: string) => {
        const response = await deleteCourseById(id);
        if (response.ok) {
            setCourses(prev => prev.filter(course => course.id !== id));
            if (onDelete) onDelete(id);
        } else {
            alert('Delete failed!');
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
            <h2 className="task-list-title">📚 My Course List</h2>
            <ul className="task-items">
                {courses.map((course) => (
                    <li key={course.id} className="task-item">
                        <h3>{course.name}</h3>
                        <p><strong>Description:</strong> {course.description}</p>
                        <p><strong>Status:</strong> {course.courseStatus}</p>
                        <p><strong>Category ID:</strong> {course.categoryId}</p>
                        {course.imageUrl && (
                            <img src={course.imageUrl} alt={course.name} style={{ maxWidth: 120, display: 'block', margin: '8px 0' }} />
                        )}
                        <button className="edit-btn" onClick={() => handleEdit(course.id)}>Edit</button>
                        <button className="delete-btn" onClick={() => openDeleteModal(course.id)}>Delete</button>
                    </li>
                ))}
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