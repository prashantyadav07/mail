import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import Spinner from '../../components/common/Spinner';

const ManageForms = () => {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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
  
  const handleDelete = async (formId) => {
    if (!window.confirm('Are you sure you want to delete this form and all its responses? This action cannot be undone.')) {
      return;
    }

    try {
      setSuccess('');
      setError('');
      const response = await api.delete(`/forms/${formId}`);
      setForms(prevForms => prevForms.filter(form => form._id !== formId));
      setSuccess(response.data.message);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete the form.');
    }
  };

  if (loading) return <div className="flex justify-center items-center h-full"><Spinner /></div>;

  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">Manage Forms</h2>
      
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{error}</div>}
      {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">{success}</div>}

      {forms.length === 0 && !loading ? (
        <p>No forms found. <Link to="/admin/generate-form" className="text-indigo-600">Create one now!</Link></p>
      ) : (
        // --- RESPONSIVE CHANGE: Added a container to allow horizontal scrolling on small screens ---
        <div className="bg-white shadow rounded-lg overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {forms.map(form => (
                <tr key={form._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{form.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(form.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-4">
                    <Link to={`/form/${form._id}/submit`} target="_blank" className="text-indigo-600 hover:text-indigo-900">Preview</Link>
                    <Link to={`/admin/responses/${form._id}`} className="text-green-600 hover:text-green-900">Responses</Link>
                    <button 
                      onClick={() => handleDelete(form._id)}
                      className="text-red-600 hover:text-red-900 font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageForms;