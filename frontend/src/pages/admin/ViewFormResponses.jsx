import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';
import Spinner from '../../components/common/Spinner';

const ViewFormResponses = () => {
  const { formId } = useParams();
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/responses/form/${formId}`);
        setResponses(res.data.responses);
      } catch (err) {
        console.error("AxiosError", err);
        setError('Failed to fetch responses. Check console for details.');
      } finally {
        setLoading(false);
      }
    };
    fetchResponses();
  }, [formId]);

  if (loading) return <div className="flex justify-center items-center h-screen"><Spinner /></div>;
  if (error) return <div className="text-red-500 text-center mt-10">{error}</div>;

  return (
    // --- RESPONSIVE CHANGE: Padding adjusted for mobile ---
    <div className="container mx-auto p-4 sm:p-6">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">Form Responses</h2>
      <p className="mb-4 text-gray-600">Total Responses: {responses.length}</p>

      {responses.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">No responses submitted for this form yet.</p>
      ) : (
        <div className="space-y-6">
          {responses.map((response) => (
            // --- RESPONSIVE CHANGE: Card padding adjusted ---
            <div key={response._id} className="bg-white p-4 sm:p-6 rounded-lg shadow-md border">
              <div className="border-b pb-3 mb-4">
                <h3 className="text-xl font-semibold text-indigo-700">
                  {response.user ? response.user.name : 'Anonymous User'}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Email: {response.user ? response.user.email : 'N/A'}
                </p>
                 <p className="text-sm text-gray-500 mt-1">
                  Submitted At: {new Date(response.createdAt).toLocaleString()}
                </p>
              </div>
              
              <div className="space-y-4">
                {response.responses.map((field, index) => (
                  <div key={index} className="bg-gray-50 p-3 sm:p-4 rounded-md">
                    <p className="font-semibold text-gray-800">{field.label}</p>
                    <p className="text-gray-600 break-words">{field.answer || 'No answer provided'}</p>
                  </div>
                ))}
              </div>
               <p className="text-right text-xs text-gray-400 mt-4">
                  Response ID: {response._id}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewFormResponses;