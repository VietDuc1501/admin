import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import CourseManagementPage from './pages/CourseManagementPage';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Dashboard from './components/Dashboard';
import './styles/App.css';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import AddCourse from './components/course/AddCourse';
import EditCourse from './components/course/EditCourse';
import UserManagementPage from './pages/UserManagementPage';
import AddUser from './components/user/AddUser';
import CourseLessons from './components/lesson/CourseLessons';
import EditUser from './components/user/EditUser';
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
              <Route path="/" element={<HomePage />} />
              <Route path="/CourseManagement" element={<CourseManagementPage />} />
              <Route path="/UserManagement" element={<UserManagementPage />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/signup" element={<RegisterForm />} />
              <Route path="/AddCourse" element={<AddCourse />} />
              <Route path="/AddUser" element={<AddUser />} />
              <Route path="*" element={<NotFoundPage />} />
              <Route path="/EditCourse/:id" element={<EditCourse />} />
              <Route path="/CourseLessons/:courseId" element={<CourseLessons />} />
              <Route path="/edit-user/:userId" element={<EditUser />} />
            </Routes>
          </div>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default AppRoutes;