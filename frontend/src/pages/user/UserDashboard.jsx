import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import Spinner from '../../components/common/Spinner';

const UserDashboard = () => {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Notification clearing logic is removed from here
  
  useEffect(() => {
    const fetchForms = async () => {
      try {
        setLoading(true);
        const res = await api.get('/forms');
        setForms(res.data.forms);
      } catch (err) {
        setError('Failed to fetch forms.');
      } finally {
        setLoading(false);
      }
    };
    fetchForms();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Available Forms</h2>
      {loading && <div className="flex justify-center items-center"><Spinner /></div>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {forms.length > 0 ? (
            forms.map(form => (
              <div key={form._id} className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-xl mb-2 text-gray-800">{form.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{form.description}</p>
                </div>
                <div className="mt-4">
                  {form.isSubmitted ? (
                    <span className="w-full text-center block bg-gray-400 text-white font-bold py-2 px-4 rounded cursor-not-allowed">
                      Completed
                    </span>
                  ) : (
                    <Link
                      to={`/form/${form._id}/submit`}
                      className="w-full text-center block bg-indigo-600 text-white font-bold py-2 px-4 rounded hover:bg-indigo-700"
                    >
                      Fill Out Form
                    </Link>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p>No forms are available at the moment.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default UserDashboard;