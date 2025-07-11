import React from 'react';

export type StatusType = 'success' | 'error' | 'warning' | 'info';

interface StatusBadgeProps {
  status: StatusType;
  text: string;
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ 
  status, 
  text, 
  className = "" 
}) => {
  const getStatusStyles = (status: StatusType) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'info':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyles(status)} ${className}`}>
      {text}
    </div>
  );
};

export default StatusBadge; 