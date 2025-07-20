import React, { useState } from 'react';
import api from '../../services/api';
import Spinner from '../../components/common/Spinner';

// Helper arrays for time dropdowns
const hours = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));
const minutes = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));

const SendBulkMail = () => {
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [recipients, setRecipients] = useState('');

  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleHour, setScheduleHour] = useState('09');
  const [scheduleMinute, setScheduleMinute] = useState('00');
  const [schedulePeriod, setSchedulePeriod] = useState('AM');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const clearMessages = () => {
    setError('');
    setSuccess('');
  };

  const resetForm = () => {
    setSubject('');
    setBody('');
    setRecipients('');
    setScheduleDate('');
  };

  // No changes needed for handleSendNow
  const handleSendNow = async () => {
    clearMessages();
    setLoading(true);
    const recipientArray = recipients.split(',').map(email => email.trim()).filter(Boolean);
    if (recipientArray.length === 0 || !subject || !body) {
      setError('Recipients, Subject, and Body are required.');
      setLoading(false);
      return;
    }
    try {
      const response = await api.post('/mail/send', { subject, body, recipients: recipientArray });
      setSuccess(response.data.message || 'Emails sent successfully!');
      resetForm();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send emails.');
    } finally {
      setLoading(false);
    }
  };


  // --- **MAJOR CORRECTIONS AND IMPROVEMENTS IN THIS FUNCTION** ---
  const handleSchedule = async () => {
    clearMessages();

    // 1. **Initial Validation**
    if (!scheduleDate) {
      setError('Please select a date to schedule the email.');
      return;
    }
    const recipientArray = recipients.split(',').map(email => email.trim()).filter(Boolean);
    if (recipientArray.length === 0 || !subject || !body) {
      setError('Recipients, Subject, and Body are required to schedule.');
      return;
    }
    
    // 2. **Set Loading State Correctly**
    setLoading(true);

    try {
      // 3. **Time Conversion Logic**
      let hour24 = parseInt(scheduleHour, 10);
      if (schedulePeriod === 'PM' && hour24 < 12) hour24 += 12;
      if (schedulePeriod === 'AM' && hour24 === 12) hour24 = 0;

      const formattedHour = String(hour24).padStart(2, '0');
      const istDateTimeString = `${scheduleDate}T${formattedHour}:${scheduleMinute}:00+05:30`;
      
      console.log("Generated IST String:", istDateTimeString); // For debugging

      const dateInIST = new Date(istDateTimeString);
      if (isNaN(dateInIST.getTime())) {
        // This handles cases where the browser creates an "Invalid Date"
        throw new Error("Invalid date or time selected. Please check your inputs.");
      }

      const scheduleAtUTC = dateInIST.toISOString();
      console.log("Converted UTC String to be sent:", scheduleAtUTC); // For debugging

      // 4. **API Call**
      const response = await api.post('/mail/schedule', {
        subject,
        body,
        recipients: recipientArray,
        scheduleAt: scheduleAtUTC,
      });

      setSuccess(response.data.message || 'Email scheduled successfully!');
      resetForm(); // Clear the form on success

    } catch (err) {
      // 5. **Robust Error Handling**
      console.error("Scheduling Error:", err); // Log the full error
      if (err.response) {
        // Error from Backend (e.g., validation failed, server error)
        setError(err.response.data.message || 'An error occurred on the server.');
      } else if (err.request) {
        // Network error (couldn't connect to server)
        setError('Could not connect to the server. Please check your network.');
      } else {
        // Other errors (like our "Invalid date" error)
        setError(err.message);
      }
    } finally {
      // 6. **Ensure Loading is Always Stopped**
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 bg-white rounded-lg shadow-md mt-0 md:mt-10">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">Send Bulk Email</h2>
      
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{error}</div>}
      {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">{success}</div>}

      <div className="space-y-4">
        {/* Input fields remain the same */}
        <div><label className="block text-sm font-medium text-gray-700">Recipients</label><textarea value={recipients} onChange={(e) => setRecipients(e.target.value)} required placeholder="Enter emails, separated by commas" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"/></div>
        <div><label className="block text-sm font-medium text-gray-700">Subject</label><input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"/></div>
        <div><label className="block text-sm font-medium text-gray-700">Email Body</label><textarea value={body} onChange={(e) => setBody(e.target.value)} required rows="10" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"/></div>
        
        <div className="border-t pt-4">
          <p className="block text-sm font-medium text-gray-700 mb-2">Schedule for Later (Indian Standard Time)</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1"><label className="block text-xs font-medium text-gray-500">Date</label><input type="date" value={scheduleDate} onChange={(e) => setScheduleDate(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"/></div>
            <div className="flex-grow-0 flex items-end gap-2">
              <div><label className="block text-xs font-medium text-gray-500">Hour</label><select value={scheduleHour} onChange={(e) => setScheduleHour(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm">{hours.map(h => <option key={h} value={h}>{h}</option>)}</select></div>
              <div><label className="block text-xs font-medium text-gray-500">Minute</label><select value={scheduleMinute} onChange={(e) => setScheduleMinute(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm">{minutes.map(m => <option key={m} value={m}>{m}</option>)}</select></div>
              <div><label className="block text-xs font-medium text-gray-500">Period</label><select value={schedulePeriod} onChange={(e) => setSchedulePeriod(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"><option value="AM">AM</option><option value="PM">PM</option></select></div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-end sm:space-x-4 space-y-2 sm:space-y-0 mt-4">
          <button onClick={handleSchedule} disabled={loading || !scheduleDate} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed">
            {loading ? <Spinner /> : 'Schedule Mail'}
          </button>
          <button onClick={handleSendNow} disabled={loading} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400">
            {loading ? <Spinner /> : 'Send Now'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SendBulkMail;