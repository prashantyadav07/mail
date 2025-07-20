import React, { useState } from 'react';
import api from '../../services/api';
import Spinner from '../../components/common/Spinner';

const GenerateAiForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [generatedForm, setGeneratedForm] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    setGeneratedForm(null);

    try {
      const response = await api.post('/ai-form/generate', { title, description, prompt });
      setSuccess(response.data.message);
      setGeneratedForm(response.data.form);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to generate form.');
    } finally {
      setLoading(false);
    }
  };

  return (
    // --- RESPONSIVE CHANGE: Padding adjusted ---
    <div className="container mx-auto p-4 sm:p-6 bg-white rounded-lg shadow-md mt-0 md:mt-10">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">Generate Form with AI</h2>
      
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{error}</div>}
      {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">{success}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Form Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Form Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">AI Prompt</label>
          <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} required rows="4" placeholder="e.g., 'Create a customer feedback survey...'" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
        </div>
        {/* --- RESPONSIVE CHANGE: Button is full-width on mobile, right-aligned on desktop --- */}
        <div className="text-right">
          <button type="submit" disabled={loading} className="w-full sm:w-auto inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300">
            {loading ? <Spinner /> : 'Generate Form'}
          </button>
        </div>
      </form>
      
      {generatedForm && (
        <div className="mt-8 p-4 sm:p-6 border rounded-lg bg-gray-50">
          <h3 className="text-xl font-semibold text-gray-700">Generated Form Preview:</h3>
          <h4 className="text-lg font-bold mt-4">{generatedForm.title}</h4>
          <p className="text-gray-600 mb-4">{generatedForm.description}</p>
          <div className="space-y-4">
            {generatedForm.fields.map((field, index) => (
              <div key={index} className="p-4 border rounded bg-white">
                <p><strong>Label:</strong> {field.label}</p>
                <p><strong>Type:</strong> {field.type}</p>
                <p><strong>Required:</strong> {field.required ? 'Yes' : 'No'}</p>
                {field.options && field.options.length > 0 && (
                  <p><strong>Options:</strong> {field.options.join(', ')}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GenerateAiForm;