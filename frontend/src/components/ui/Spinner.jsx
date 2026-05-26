import React from 'react';

export const Spinner = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-6 h-6 border-2',
    lg: 'w-8 h-8 border-3',
  };
  
  return (
    <div className={`animate-spin rounded-full border-t-accent border-r-accent border-b-accent/20 border-l-accent/20 ${sizes[size]} ${className}`}></div>
  );
};
