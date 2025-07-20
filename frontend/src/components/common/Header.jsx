import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import logo from '../../assets/review.png'; // <-- 1. Import the logo image

// Simple Bell icon component
const BellIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>
);

const Header = () => {
  const { user, logout, notificationCount } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div>
          {/* --- 2. This is the updated logo section --- */}
          <Link to="/" className="flex items-center space-x-3">
            <img src={logo} alt="FormAI Logo" className="h-8 w-auto" />
            <span className="text-2xl font-bold text-indigo-600">
              CommunicateAI
            </span>
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              {/* Notification Bell for employee role */}
              {user.role === 'employee' && (
                <Link to="/user/dashboard" className="relative text-gray-600 hover:text-indigo-600">
                  <BellIcon />
                  {notificationCount > 0 && (
                    <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white">
                      {notificationCount}
                    </span>
                  )}
                </Link>
              )}
              <span className="text-gray-700 hidden sm:block">Welcome, {user.name}!</span>
              {user.role === 'admin' ? (
                 <Link to="/admin/dashboard" className="px-4 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100">
                  Admin Dashboard
                </Link>
              ) : (
                <Link to="/user/dashboard" className="px-4 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100">
                  Dashboard
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="px-4 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100">
                Login
              </Link>
              <Link to="/register" className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;