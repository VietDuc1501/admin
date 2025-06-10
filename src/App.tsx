import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
  useNavigate,
} from "react-router-dom";

// Layout
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Dashboard from "./components/Dashboard";

// Pages
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import CourseManagementPage from "./pages/CourseManagementPage";
import UserManagementPage from "./pages/UserManagementPage";
import CategoryManagement from "./pages/CategoryManagement";
import AddCategory from "./components/category/AddCategory";
import EditCategory from "./components/category/EditCategory";

// Auth
import LoginForm from "./components/auth/LoginForm";
import RegisterForm from "./components/auth/RegisterForm";

// Course Management
import AddCourse from "./components/course/AddCourse";
import EditCourse from "./components/course/EditCourse";
import CourseLessons from "./components/lesson/CourseLessons";
import CourseStudents from "./pages/CourseStudents";
// User Management
import AddUser from "./components/user/AddUser";
import EditUser from "./components/user/EditUser";

import "./styles/App.css";

const EditCategoryWrapper: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Placeholder logic for fetching category name
  const currentName = ""; // TODO: Replace with actual fetch logic

  const handleCancel = () => {
    navigate("/CategoryManagement");
  };

  const handleSuccess = () => {
    navigate("/CategoryManagement");
  };

  if (!id) return null;

  return (
    <EditCategory
      id={id}
      currentName={currentName}
      onCancel={handleCancel}
      onSuccess={handleSuccess}
    />
  );
};

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
              {/* Home Page */}
              <Route path="/" element={<HomePage />} />

              {/* Course Management */}
              <Route
                path="/CourseManagement"
                element={<CourseManagementPage />}
              />
              <Route path="/AddCourse" element={<AddCourse />} />
              <Route path="/EditCourse/:id" element={<EditCourse />} />
              <Route
                path="/CourseLessons/:courseId"
                element={<CourseLessons />}
              />
              <Route
                path="/Admin/Course/:courseId/Students"
                element={<CourseStudents />}
              />

              {/* User Management */}
              <Route path="/UserManagement" element={<UserManagementPage />} />
              <Route path="/AddUser" element={<AddUser />} />
              <Route path="/edit-user/:userId" element={<EditUser />} />

              {/* Category Management */}
              <Route
                path="/CategoryManagement"
                element={<CategoryManagement />}
              />
              <Route
                path="/CategoryManagement/AddCategory"
                element={<AddCategory />}
              />
              <Route
                path="/CategoryManagement/EditCategory/:id"
                element={<EditCategoryWrapper />}
              />

              {/* Authentication */}
              <Route path="/login" element={<LoginForm />} />
              <Route path="/signup" element={<RegisterForm />} />

              {/* 404 Fallback */}
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
