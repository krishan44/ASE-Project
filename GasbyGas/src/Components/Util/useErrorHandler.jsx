// useErrorHandler.js
import { toast } from "react-toastify";

const useErrorHandler = () => {
  const handleError = (error) => {

    if (error) {
      // Server responded with an error
      const errorMessage = error?.message || "An error occurred.";

      toast.error(`Error: ${errorMessage}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    } else if (error.request) {
      // Request was made but no response received
      toast.error("No response from server. Please try again later.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    } else {
      // Other types of errors (network issues, etc.)
      toast.error("An unexpected error occurred.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    }
  };

  return { handleError };
};

export default useErrorHandler;
