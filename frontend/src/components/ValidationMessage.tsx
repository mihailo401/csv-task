import React from 'react';
import { ValidationResult } from '../types';

interface ValidationMessageProps {
  result: ValidationResult;
  className?: string;
}

const ValidationMessage: React.FC<ValidationMessageProps> = ({ 
  result, 
  className = "" 
}) => {
  return (
    <div className={className}>
      <h3 className="text-lg font-medium text-gray-900 mb-3">Message</h3>
      <p className={`text-sm p-3 rounded-md ${
        result.total_errors === 0
          ? 'bg-green-50 text-green-800'
          : 'bg-yellow-50 text-yellow-800'
      }`}>
        {result.message}
      </p>
    </div>
  );
};

export default ValidationMessage; 