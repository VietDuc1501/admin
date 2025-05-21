import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import CourseManagementPage from "./pages/CourseManagementPage";
import UserManagementPage from "./pages/UserManagementPage";
import CategoryManagement from "./pages/CategoryManagement";

// Auth
import LoginForm from "./components/auth/LoginForm";
import RegisterForm from "./components/auth/RegisterForm";

// Layout
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Dashboard from "./components/Dashboard";

// Course
import AddCourse from "./components/course/AddCourse";
import EditCourse from "./components/course/EditCourse";
import CourseLessons from "./components/lesson/CourseLessons";

// User
import AddUser from "./components/user/AddUser";
import EditUser from "./components/user/EditUser";

import "./styles/App.css";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <div className="main-content">
          <div className="sidebar">
            <Dashboard />
          </div>
          <div className="page-content">
            <Routes>
              {/* Trang chính */}
              <Route path="/" element={<HomePage />} />

              {/* Quản lý khóa học */}
              <Route path="/CourseManagement" element={<CourseManagementPage />} />
              <Route path="/AddCourse" element={<AddCourse />} />
              <Route path="/EditCourse/:id" element={<EditCourse />} />
              <Route path="/CourseLessons/:courseId" element={<CourseLessons />} />

              {/* Quản lý học viên */}
              <Route path="/UserManagement" element={<UserManagementPage />} />
              <Route path="/AddUser" element={<AddUser />} />
              <Route path="/edit-user/:userId" element={<EditUser />} />

              {/* Quản lý danh mục */}
              <Route path="/CategoryManagement" element={<CategoryManagement />} />

              {/* Xác thực */}
              <Route path="/login" element={<LoginForm />} />
              <Route path="/signup" element={<RegisterForm />} />

              {/* Trang lỗi */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default AppRoutes;
