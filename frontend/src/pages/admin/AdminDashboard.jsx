import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const AdminDashboard = () => {
  const activeLinkClass = "bg-indigo-100 text-indigo-700";
  const inactiveLinkClass = "text-gray-600 hover:bg-gray-100 hover:text-gray-900";

  return (
    // --- RESPONSIVE CHANGE: Layout stacks vertically on mobile, horizontally on medium+ screens ---
    <div className="flex flex-col md:flex-row">
      {/* --- RESPONSIVE CHANGE: Sidebar is full-width on mobile, fixed on desktop --- */}
      <aside className="w-full md:w-64 bg-white shadow-md md:h-screen p-4">
        <h2 className="text-xl font-bold mb-6 text-gray-800">Admin Menu</h2>
        <nav className="space-y-2">
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) => `${isActive ? activeLinkClass : inactiveLinkClass} block rounded-md px-3 py-2 text-sm font-medium`}
          >
            Manage Forms
          </NavLink>
          <NavLink
            to="/admin/users"
            className={({ isActive }) => `${isActive ? activeLinkClass : inactiveLinkClass} block rounded-md px-3 py-2 text-sm font-medium`}
          >
            Manage Users
          </NavLink>
          <NavLink
            to="/admin/generate-form"
            className={({ isActive }) => `${isActive ? activeLinkClass : inactiveLinkClass} block rounded-md px-3 py-2 text-sm font-medium`}
          >
            Generate AI Form
          </NavLink>
          <NavLink
            to="/admin/send-mail"
            className={({ isActive }) => `${isActive ? activeLinkClass : inactiveLinkClass} block rounded-md px-3 py-2 text-sm font-medium`}
          >
            Send Bulk Mail
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

export default AdminDashboard;