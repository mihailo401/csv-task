import React from 'react';
import { ValidationResult } from '../types';

interface ValidationResultsProps {
  result: ValidationResult;
}

const ValidationResults: React.FC<ValidationResultsProps> = ({ result }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Validation Results</h2>
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${
          result.total_errors === 0
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        }`}>
          {result.total_errors === 0 ? 'Valid' : `${result.total_errors} Error(s)`}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm font-medium text-gray-500">Total Rows</p>
          <p className="text-2xl font-bold text-gray-900">{result.total_rows}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm font-medium text-gray-500">Total Errors</p>
          <p className="text-2xl font-bold text-red-600">{result.total_errors}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm font-medium text-gray-500">Columns Found</p>
          <p className="text-2xl font-bold text-gray-900">{result.columns_found.length}</p>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-3">Message</h3>
        <p className={`text-sm p-3 rounded-md ${
          result.total_errors === 0
            ? 'bg-green-50 text-green-800'
            : 'bg-yellow-50 text-yellow-800'
        }`}>
          {result.message}
        </p>
      </div>

      {result.errors.length > 0 && (
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-3">Validation Errors</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Row
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Column
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Error Message
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {result.errors.map((error, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {error.row}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {error.column}
                    </td>
                    <td className="px-6 py-4 text-sm text-red-600">
                      {error.error}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {result.columns_found.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-3">Columns Found</h3>
          <div className="flex flex-wrap gap-2">
            {result.columns_found.map((column, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
              >
                {column}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ValidationResults; 