import React from "react";
import { Link } from "react-router-dom";
import "../styles/page/Dashboard.css";

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <h1 className="dashboard-title">🎓 Dashboard</h1>
      <nav className="dashboard-nav">
        <Link to="/" className="dashboard-link">
          <span role="img" aria-label="home">🏠</span> Home
        </Link>

        <Link to="/CourseManagement" className="dashboard-link">
          <span role="img" aria-label="course">📚</span> Quản Lý Khóa Học
        </Link>

        <Link to="/UserManagement" className="dashboard-link">
          <span role="img" aria-label="user">👨‍🎓</span> Quản Lý Học Viên
        </Link>

        <Link to="/CategoryManagement" className="dashboard-link">
          <span role="img" aria-label="category">🗂️</span> Quản Lý Danh Mục
        </Link>
      </nav>
    </div>
  );
};

export default Dashboard;
