import React, { useState } from 'react';
import { FileUploadArea, ValidationResults, ErrorDisplay } from '../components';
import { ValidationResult } from '../types';

const CSVValidationPage: React.FC = () => {
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleValidationComplete = (result: ValidationResult) => {
    setValidationResult(result);
    setError(null);
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
    setValidationResult(null);
  };

  const handleReset = () => {
    setValidationResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Data Quality Gateway
          </h1>
          <p className="text-lg text-gray-600">
            Validate German Real Estate CSV Data (Immobilien-Stammdaten)
          </p>
        </div>

        <FileUploadArea 
          onValidationComplete={handleValidationComplete}
          onError={handleError}
          onReset={handleReset}
        />

        {error && <ErrorDisplay error={error} />}

        {validationResult && <ValidationResults result={validationResult} />}
      </div>
    </div>
  );
};

export default CSVValidationPage; 