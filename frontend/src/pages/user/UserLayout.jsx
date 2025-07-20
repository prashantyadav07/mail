import React, { useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const BellIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>
);

const UserLayout = () => {
  const { notificationCount, clearNotificationCount } = useAuth();
  const activeLinkClass = "bg-indigo-100 text-indigo-700";
  const inactiveLinkClass = "text-gray-600 hover:bg-gray-100 hover:text-gray-900";

  useEffect(() => {
    clearNotificationCount();
  }, [clearNotificationCount]);

  return (
    // --- RESPONSIVE CHANGE: Layout stacks vertically on mobile, horizontally on medium+ screens ---
    <div className="flex flex-col md:flex-row">
      {/* --- RESPONSIVE CHANGE: Sidebar is full-width on mobile, fixed on desktop --- */}
      <aside className="w-full md:w-64 bg-white shadow-md md:h-screen p-4">
        <h2 className="text-xl font-bold mb-6 text-gray-800">User Menu</h2>
        <nav className="space-y-2">
          <NavLink
            to="/user/dashboard"
            className={({ isActive }) => `${isActive ? activeLinkClass : inactiveLinkClass} flex items-center rounded-md px-3 py-2 text-sm font-medium relative`}
          >
            <BellIcon />
            <span>Available Forms</span>
            {notificationCount > 0 && (
              <span className="ml-auto flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white">
                {notificationCount}
              </span>
            )}
          </NavLink>
        </nav>
      </aside>
      {/* --- RESPONSIVE CHANGE: Padding adjusted for different screen sizes --- */}
      <main className="flex-1 p-4 sm:p-8 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default UserLayout;