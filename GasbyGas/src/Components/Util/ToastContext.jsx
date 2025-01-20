import React, { createContext, useContext } from 'react';
import { toast } from 'react-toastify';

// Create a context to manage the toast alerts
const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

// Create a provider component to wrap your app
export const ToastProvider = ({ children }) => {
  const showToast = (message, type = 'info') => {
    // Display a toast based on the type
    switch (type) {
      case 'success':
        toast.success(message);
        break;
      case 'error':
        toast.error(message);
        break;
      case 'info':
        toast.info(message);
        break;
      case 'warning':
        toast.warning(message);
        break;
      default:
        toast(message);
        break;
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
    </ToastContext.Provider>
  );
};
