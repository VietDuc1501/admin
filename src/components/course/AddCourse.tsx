import React, { useState, useEffect } from 'react';
import '../../styles/course/AddCourse.css';
import Category from '../../types/Category';
import { useNavigate } from 'react-router-dom';
// You should have a createCourseApi and categoriesCourse hook for courses
import createCourseApi from '../../hooks/course/createCourse';
import categoriesCourse from '../../hooks/category/categoriesCourse';

const AddCourse: React.FC = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [categories, setCategories] = useState<Category[]>([]);
    const [courseStatus, setCourseStatus] = useState('ACTIVE');
    const [imageUrl, setImageUrl] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        categoriesCourse()
            .then(data => setCategories(data))
            .catch(() => setCategories([]));
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newCourse = {
            name,
            description,
            categoryId,
            courseStatus,
            imageUrl: imageUrl || null
        };

        try {
            const response = await createCourseApi(newCourse);
            if (response.ok) {
                setSuccessMessage('Course added successfully!');
                setName('');
                setDescription('');
                setCategoryId('');
                setCourseStatus('ACTIVE');
                setImageUrl('');
                navigate('/CourseManagement');
            } else {
                setSuccessMessage('Failed to add course!');
            }
        } catch (error) {
            alert('Error adding course!');
        }
    };

    return (
        <div className="add-course-form">
            <h2>Add New Course</h2>
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
                        id="course-status"
                        value={courseStatus}
                        onChange={e => setCourseStatus(e.target.value)}
                        required
                    >
                        <option value="ACTIVE">ACTIVE</option>
                        <option value="INACTIVE">INACTIVE</option>
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
                <button type="submit">Add Course</button>
            </form>
        </div>
    );
};

export default AddCourse;