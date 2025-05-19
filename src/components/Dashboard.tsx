import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/page/Dashboard.css';

const Dashboard: React.FC = () => {
    return (
        <div className="dashboard">
            <h1>Dashboard</h1>
            <nav className="dashboard-nav">
                <Link to="/" className="dashboard-link">
                    Home
                </Link>
                <Link to="/CourseManagement" className="dashboard-link">
                    Quản Lý Khóa Học
                </Link>
                <Link to="/UserManagement" className="dashboard-link">
                    Quản Lý Học Viên
                </Link>
            </nav>
        </div>
    );
};

export default Dashboard;