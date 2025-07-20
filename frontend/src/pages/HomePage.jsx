import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const HomePage = () => {
  const { user } = useAuth();

  return (
    <div className="bg-gray-50 flex flex-col items-center justify-center text-center px-4 py-16 sm:py-20">
      <div className="max-w-2xl">
        {/* --- RESPONSIVE CHANGE: Font size adjusted for mobile --- */}
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
          Welcome to <span className="text-indigo-600">FormAI</span>
        </h1>
        <p className="mt-4 text-lg sm:text-xl text-gray-600">
          The intelligent platform for creating, managing, and analyzing forms with the power of AI.
        </p>
        {/* --- RESPONSIVE CHANGE: Buttons stack on mobile, horizontal on larger screens --- */}
        <div className="mt-8 flex flex-col sm:flex-row sm:justify-center gap-4">
          {user ? (
            <Link
              to={user.role === 'admin' ? '/admin/dashboard' : '/user/dashboard'}
              className="inline-block rounded-md bg-indigo-600 px-8 py-3 text-lg font-semibold text-white shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="inline-block rounded-md bg-indigo-600 px-8 py-3 text-lg font-semibold text-white shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Get Started
              </Link>
              <Link
                to="/register"
                className="inline-block rounded-md bg-white px-8 py-3 text-lg font-semibold text-indigo-600 shadow-lg hover:bg-gray-100"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;