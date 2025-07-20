import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import Spinner from '../../components/common/Spinner';
import DynamicFormField from '../../components/forms/DynamicFormField';

const SubmitFormPage = () => {
  const { formId } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [responses, setResponses] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchForm = async () => {
      try {
        // NOTE: Assumes an endpoint GET /api/forms/:id to fetch a single form's structure
        const res = await api.get(`/forms/${formId}`);
        setForm(res.data);
        // Initialize responses state
        const initialResponses = {};
        res.data.fields.forEach(field => {
          initialResponses[field.label] = '';
        });
        setResponses(initialResponses);
      } catch (err) {
        setError('Failed to load form.');
      } finally {
        setLoading(false);
      }
    };
    fetchForm();
  }, [formId]);

  const handleChange = (label, value) => {
    setResponses(prev => ({ ...prev, [label]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const formattedResponses = Object.keys(responses).map(label => ({
      label,
      answer: responses[label],
    }));

    try {
      await api.post('/responses/submit', {
        formId,
        responses: formattedResponses,
      });
      setSuccess('Form submitted successfully! Redirecting...');
      setTimeout(() => navigate('/user/dashboard'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit form.');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !form) return <div className="flex justify-center items-center h-screen"><Spinner /></div>;
  if (error) return <div className="text-red-500 text-center mt-10">{error}</div>;

  return (
    <div className="container mx-auto p-6">
      {form && (
        <div className="bg-white p-8 rounded-lg shadow-md mt-10 max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-2 text-gray-800">{form.title}</h2>
          <p className="text-gray-600 mb-8">{form.description}</p>
          
          {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
          {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">{success}</div>}

          <form onSubmit={handleSubmit} className="space-y-6">
            {form.fields.map((field) => (
              <DynamicFormField
                key={field._id}
                field={field}
                value={responses[field.label]}
                onChange={handleChange}
              />
            ))}
            <div className="text-right">
              <button type="submit" disabled={loading} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300">
                {loading ? <Spinner /> : 'Submit Response'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default SubmitFormPage;