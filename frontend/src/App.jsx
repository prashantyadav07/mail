import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

import Header from './components/common/Header';
import Footer from './components/common/Footer';
import ProtectedRoute from './components/common/ProtectedRoute';

import HomePage from './pages/HomePage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import NotFoundPage from './pages/NotFoundPage';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import GenerateAiForm from './pages/admin/GenerateAiForm';
import ViewFormResponses from './pages/admin/ViewFormResponses';
import SendBulkMail from './pages/admin/SendBulkMail';
import ManageForms from './pages/admin/ManageForms';
import ManageUsers from './pages/admin/ManageUsers';

// User Pages
import UserLayout from './pages/user/UserLayout'; // <-- Import the new layout
import UserDashboard from './pages/user/UserDashboard';
import SubmitFormPage from './pages/user/SubmitFormPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-gray-50">
          <Header />
          <main className="flex-grow">
            <Routes>
              {/* --- Public Routes --- */}
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* --- Admin Routes --- */}
              <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>}>
                <Route index element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="dashboard" element={<ManageForms />} />
                <Route path="users" element={<ManageUsers />} />
                <Route path="generate-form" element={<GenerateAiForm />} />
                <Route path="send-mail" element={<SendBulkMail />} />
                <Route path="responses/:formId" element={<ViewFormResponses />} />
              </Route>

              {/* --- CORRECTED User Routes --- */}
              <Route path="/user" element={<ProtectedRoute allowedRoles={['employee', 'admin']}><UserLayout /></ProtectedRoute>}>
                 <Route index element={<Navigate to="/user/dashboard" replace />} />
                 <Route path="dashboard" element={<UserDashboard />} />
                 {/* Add other user pages here in the future */}
              </Route>

              <Route
                path="/form/:formId/submit"
                element={
                  <ProtectedRoute allowedRoles={['employee', 'admin']}>
                    <SubmitFormPage />
                  </ProtectedRoute>
                }
              />

              {/* --- Not Found Catch-all Route --- */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;