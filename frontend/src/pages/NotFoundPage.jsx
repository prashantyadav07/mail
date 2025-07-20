import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center h-full px-4 py-20">
      <h1 className="text-6xl font-extrabold text-indigo-600">404</h1>
      <h2 className="mt-2 text-3xl font-bold text-gray-900">Page Not Found</h2>
      <p className="mt-4 text-lg text-gray-600">
        Sorry, we couldn’t find the page you’re looking for.
      </p>
      <Link
        to="/"
        className="mt-8 inline-block rounded-md bg-indigo-600 px-6 py-3 text-lg font-semibold text-white shadow-lg hover:bg-indigo-700"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFoundPage;