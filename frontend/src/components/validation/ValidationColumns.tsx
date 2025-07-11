import React from 'react';

interface ValidationColumnsProps {
  columns: string[];
  className?: string;
}

const ValidationColumns: React.FC<ValidationColumnsProps> = ({ 
  columns, 
  className = "" 
}) => {
  return (
    <div className={className}>
      <h3 className="text-lg font-medium text-gray-900 mb-3">Columns Found</h3>
      <div className="flex flex-wrap gap-2">
        {columns.map((column, index) => (
          <span
            key={index}
            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
          >
            {column}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ValidationColumns; 