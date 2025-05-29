import React from "react";
import { Link } from "react-router-dom";
import "../styles/page/Dashboard.css";

const links = [
  { to: "/", label: "Home", emoji: "🏠", alt: "home" },
  {
    to: "/CourseManagement",
    label: "Course Management",
    emoji: "📚",
    alt: "course",
  },
  { to: "/UserManagement", label: "User Management", emoji: "👨‍🎓", alt: "user" },
  {
    to: "/CategoryManagement",
    label: "Category Management",
    emoji: "🗂️",
    alt: "category",
  },
];

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <h1 className="dashboard-title">
        <span role="img" aria-label="dashboard" style={{ fontSize: "2.4rem" }}>
          🎓
        </span>
        Dashboard
      </h1>

      <nav className="dashboard-nav" aria-label="Main dashboard navigation">
        {links.map(({ to, label, emoji, alt }) => (
          <Link key={to} to={to} className="dashboard-link">
            <span role="img" aria-label={alt}>
              {emoji}
            </span>
            {label}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Dashboard;
