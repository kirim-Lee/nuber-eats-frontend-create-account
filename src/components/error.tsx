import React from 'react';

interface IError {
  message: string;
}
export const ErrorMessage: React.FC<IError> = ({ message }) => {
  return (
    <div className="h-screen flex justify-center items-center">
      <span className="font-medium text-xl tracking-wide">{message}</span>
    </div>
  );
};
