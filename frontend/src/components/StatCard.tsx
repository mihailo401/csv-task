import React from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  className?: string;
  valueClassName?: string;
  labelClassName?: string;
}

const StatCard: React.FC<StatCardProps> = ({ 
  label, 
  value, 
  className = "bg-gray-50 rounded-lg p-4",
  valueClassName = "text-2xl font-bold text-gray-900",
  labelClassName = "text-sm font-medium text-gray-500"
}) => {
  return (
    <div className={className}>
      <p className={labelClassName}>{label}</p>
      <p className={valueClassName}>{value}</p>
    </div>
  );
};

export default StatCard; 