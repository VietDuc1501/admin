import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/page/HomePage.css';

const HomePage: React.FC = () => {
    return (
        <div className="home-container">
            <h1 className="home-title">Welcome to the Admin Course</h1>
            <p className="home-subtitle">Manage your courses, tasks, and users efficiently!</p>

            <div className="features-section">
                <h2 className="features-title">Features</h2>
                <ul className="features-list">
                    <li>
                        <Link to="/CourseManagement" className="feature-link">Course Management</Link> - Create, update, and manage your courses.
                    </li>
                    <li>
                        <Link to="/TaskManagement" className="feature-link">Task Management</Link> - Create, update, and manage your tasks.
                    </li>
                    <li>
                        <Link to="/categories" className="feature-link">Category Management</Link> - Organize courses and tasks by categories.
                    </li>
                    <li>
                        <Link to="/UserManagement" className="feature-link">User Management</Link> - Manage users in the system.
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default HomePage;