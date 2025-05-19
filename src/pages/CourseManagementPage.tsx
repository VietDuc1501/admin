import React, { useState, useEffect } from "react";
import "../styles/course/CourseManagementPage.css";
import CourseList from "../components/course/CourseList";
import { useNavigate } from "react-router-dom";
import useCourse from "../hooks/course/useCourse";
import Course from "../types/Course";


const CourseManagementPage: React.FC = () => {
    const navigate = useNavigate();
    const { courses: initialCourses } = useCourse();
    const [courses, setCourses] = useState<Course[]>([]);

    // Kiểm tra đăng nhập
    useEffect(() => {
        const userStr = localStorage.getItem("user");
        if (!userStr) {
            navigate("/login");
        }
    }, [navigate]);

    useEffect(() => {
        setCourses(initialCourses);
    }, [initialCourses]);

    const handleAddCourseClick = () => {
        navigate("/AddCourse");
    };

    const handleDelete = (id: string) => {
        setCourses(prev => prev.filter(course => course.id !== id));
    };

    return (
        <div className="course-management-page">
            <div className="course-header">
                <h1>📚 Course Management</h1>
            </div>
            <button className="add-course-button" onClick={handleAddCourseClick}>+ Add New Course</button>
            <CourseList courses={courses} onDelete={handleDelete} />
        </div>
    );
};

export default CourseManagementPage;