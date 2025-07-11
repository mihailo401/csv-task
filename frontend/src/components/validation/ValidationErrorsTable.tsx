import React from 'react';
import { ValidationError } from '../../types';

interface ValidationErrorsTableProps {
  errors: ValidationError[];
  className?: string;
}

const ValidationErrorsTable: React.FC<ValidationErrorsTableProps> = ({ 
  errors, 
  className = "" 
}) => {
  return (
    <div className={className}>
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
            {errors.map((error, index) => (
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
  );
};

export default ValidationErrorsTable; 