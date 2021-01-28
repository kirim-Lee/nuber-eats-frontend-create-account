import React from 'react';

interface IButtonProps {
  isValid: boolean;
  loading: boolean;
  text: string;
  onClick?: () => void;
  className?: string;
}

export const Button: React.FC<IButtonProps> = ({
  isValid,
  loading,
  text,
  onClick,
  className,
}) => (
  <button
    onClick={onClick}
    className={`text-white py-3 focus:outline-none hover:bg-blue-400 transition-colors duration-500 ${
      isValid && !loading ? 'bg-blue-300' : 'bg-gray-200 pointer-events-none'
    } ${className || ''}`}
    disabled={loading ? true : false}
  >
    {loading ? 'Loading...' : text}
  </button>
);
