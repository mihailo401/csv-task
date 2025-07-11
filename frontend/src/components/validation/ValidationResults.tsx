import React from 'react';
import { ValidationResult } from '../../types';
import ValidationSummary from './ValidationSummary';
import ValidationErrorsTable from './ValidationErrorsTable';
import ValidationColumns from './ValidationColumns';
import ValidationMessage from './ValidationMessage';
import StatusBadge from '../StatusBadge';

interface ValidationResultsProps {
  result: ValidationResult;
  className?: string;
  showSummary?: boolean;
  showErrors?: boolean;
  showColumns?: boolean;
  showMessage?: boolean;
}

const ValidationResults: React.FC<ValidationResultsProps> = ({
  result,
  className = "bg-white rounded-lg shadow-md p-6",
  showSummary = true,
  showErrors = true,
  showColumns = true,
  showMessage = true,
}) => {
  const getStatusType = (): 'success' | 'error' => {
    return result.total_errors === 0 ? 'success' : 'error';
  };

  const getStatusText = (): string => {
    return result.total_errors === 0 ? 'Valid' : `${result.total_errors} Error(s)`;
  };

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Validation Results</h2>
        <StatusBadge 
          status={getStatusType()} 
          text={getStatusText()} 
        />
      </div>

      {showSummary && <ValidationSummary result={result} className="mb-6" />}
      
      {showMessage && <ValidationMessage result={result} className="mb-6" />}
      
      {showErrors && result.errors.length > 0 && (
        <ValidationErrorsTable errors={result.errors} />
      )}

      {showColumns && result.columns_found.length > 0 && (
        <ValidationColumns columns={result.columns_found} className="mt-6" />
      )}
    </div>
  );
};

export default ValidationResults; 