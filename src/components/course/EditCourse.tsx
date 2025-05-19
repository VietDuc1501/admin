import React, { useState, useEffect } from 'react';
import '../../styles/course/EditCourse.css';
import Category from '../../types/Category';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchCourseById, fetchAllCategories, updateCourseById } from '../../hooks/course/editCourse';
import Course from '../../types/Course';
import categoriesCourse from "../../hooks/categoriesCourse";

const EditCourse: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [course, setCourse] = useState<Course | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [courseStatus, setCourseStatus] = useState<'ACTIVE' | 'INACTIVE'>('ACTIVE');
    const [imageUrl, setImageUrl] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

   useEffect(() => {
    const fetchCategories = async () => {
            const data = await categoriesCourse();
            setCategories(data);
            console.log("Categories:", data); // Thêm dòng này
        };
        fetchCategories();
    }, []);
    // Lấy thông tin khóa học và danh mục khi có id
    useEffect(() => {
        if (id) {
            fetchCourseById(id).then((data) => {
                if (data) {
                    setCourse(data);
                    setName(data.name);
                    setDescription(data.description);
                    setCategoryId(data.categoryId);
                    setCourseStatus(data.courseStatus);
                    setImageUrl(data.imageUrl || '');
                }
            });
            fetchAllCategories().then(setCategories);
        }
    }, [id]);

    // Xử lý submit form sửa khóa học
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const updatedCourse = {
            name,
            description,
            categoryId,
            courseStatus,
            imageUrl: imageUrl || null,
        };

        try {
            const response = await updateCourseById(id as string, updatedCourse);
            if (response.ok) {
                setSuccessMessage('Course updated successfully!');
                setTimeout(() => navigate('/CourseManagement'), 1000);
            } else {
                setSuccessMessage('Failed to update course!');
            }
        } catch (error) {
            alert('Error updating course!');
        }
    };

    if (!course) {
        return <div style={{ padding: 24 }}>Loading...</div>;
    }

    return (
        <div className="add-task-form">
            <h2>Edit Course</h2>
            {successMessage && (
                <div className="success-message">{successMessage}</div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="course-name">Name:</label>
                    <input
                        type="text"
                        id="course-name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="course-description">Description:</label>
                    <textarea
                        id="course-description"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        required
                    ></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="course-category">Category:</label>
                    <select
                        id="course-category"
                        value={categoryId}
                        onChange={e => setCategoryId(e.target.value)}
                        required
                    >
                        <option value="">-- Select Category --</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.categoryName}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="course-status">Status:</label>
                    <select
                        id="course-category"
                        value={categoryId}
                        onChange={e => setCategoryId(e.target.value)}
                        required
                    >
                        <option value="">-- Select Category --</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.categoryName}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="course-image">Image URL:</label>
                    <input
                        type="text"
                        id="course-image"
                        value={imageUrl}
                        onChange={e => setImageUrl(e.target.value)}
                    />
                </div>
                <button type="submit">Update Course</button>
            </form>
        </div>
    );
};

export default EditCourse;