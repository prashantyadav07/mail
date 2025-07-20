import React, { useState } from 'react';
import api from '../../services/api';
import Spinner from '../../components/common/Spinner';

const SendBulkMail = () => {
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [recipients, setRecipients] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const recipientArray = recipients.split(',').map(email => email.trim()).filter(Boolean);

    if (recipientArray.length === 0) {
      setError('Please provide at least one recipient.');
      setLoading(false);
      return;
    }

    try {
      const response = await api.post('/mail/send', { 
        subject, 
        body, 
        recipients: recipientArray 
      });
      setSuccess(`${response.data.message} to ${response.data.recipients} recipients.`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send emails.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Send Bulk Email</h2>
      
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{error}</div>}
      {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">{success}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Recipients</label>
          <textarea value={recipients} onChange={(e) => setRecipients(e.target.value)} required placeholder="Enter email addresses, separated by commas" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Subject</label>
          <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email Body</label>
          <textarea value={body} onChange={(e) => setBody(e.target.value)} required rows="10" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
        </div>
        <div className="text-right">
          <button type="submit" disabled={loading} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300">
            {loading ? <Spinner /> : 'Send Emails'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SendBulkMail;