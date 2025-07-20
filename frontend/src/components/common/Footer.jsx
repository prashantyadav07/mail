import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white shadow-t mt-auto">
      <div className="container mx-auto px-6 py-4 text-center text-gray-600">
        <p>© {new Date().getFullYear()} FormAI. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;