import React from 'react';

const DynamicFormField = ({ field, value, onChange }) => {
  const { label, type, required, options } = field;

  const renderField = () => {
    switch (type) {
      case 'text':
      case 'email':
        return (
          <input
            type={type}
            value={value}
            onChange={(e) => onChange(label, e.target.value)}
            required={required}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        );
      case 'textarea':
        return (
          <textarea
            value={value}
            onChange={(e) => onChange(label, e.target.value)}
            required={required}
            rows="4"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        );
      case 'radio':
        return (
          <div className="mt-2 space-y-2">
            {options.map((option, index) => (
              <label key={index} className="flex items-center">
                <input
                  type="radio"
                  name={label}
                  value={option}
                  checked={value === option}
                  onChange={(e) => onChange(label, e.target.value)}
                  required={required}
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                />
                <span className="ml-2 text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        );
      case 'select':
        return (
          <select
            value={value}
            onChange={(e) => onChange(label, e.target.value)}
            required={required}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="">Select an option</option>
            {options.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        );
      default:
        return <p>Unsupported field type: {type}</p>;
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {renderField()}
    </div>
  );
};

export default DynamicFormField;