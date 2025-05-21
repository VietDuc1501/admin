import React from "react";
import { Link } from "react-router-dom";
import "../styles/page/HomePage.css";

const HomePage: React.FC = () => {
  return (
    <div className="home-container">
      <div className="home-hero">
        <h1 className="home-title">🎓 Admin Course Dashboard</h1>
        <p className="home-subtitle">
          Manage your courses and users effectively.
        </p>
      </div>

      <div className="features-section">
        <h2 className="features-title">🚀 Key Features</h2>
        <div className="features-grid">
          <Link to="/CourseManagement" className="feature-card">
            <h3>📚 Course Management</h3>
            <p>Create, update, and organize all your courses.</p>
          </Link>
          <Link to="/UserManagement" className="feature-card">
            <h3>👥 User Management</h3>
            <p>View, add, and manage platform users.</p>
          </Link>
          <Link to="/Category" className="feature-card">
            <h3>🏷️ Category Management</h3>
            <p>Add, edit, and delete course categories.</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
