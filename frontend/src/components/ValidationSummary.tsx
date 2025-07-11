import React from 'react';
import { ValidationResult } from '../types';
import StatCard from './StatCard';

interface ValidationSummaryProps {
  result: ValidationResult;
  className?: string;
}

const ValidationSummary: React.FC<ValidationSummaryProps> = ({ 
  result, 
  className = "" 
}) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 ${className}`}>
      <StatCard 
        label="Total Rows" 
        value={result.total_rows} 
      />
      <StatCard 
        label="Total Errors" 
        value={result.total_errors}
        valueClassName="text-2xl font-bold text-red-600"
      />
      <StatCard 
        label="Columns Found" 
        value={result.columns_found.length} 
      />
    </div>
  );
};

export default ValidationSummary; 