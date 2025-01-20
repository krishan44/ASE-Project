const BASE_URL = 'http://localhost:8080/api/v1/gazbygaz';

const ApiService = {
  /**
   * Makes a GET request to the given endpoint.
   * @param {string} endpoint - The API endpoint (e.g., '/users').
   * @returns {Promise<any>} - A promise that resolves to the response data.
   */
  get: async (endpoint) => {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`);
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.message}`);
      }
      return response.json();
    } catch (error) {
      console.error(`GET request failed: ${error.message}`);
      throw error;
    }
  },

  /**
   * Makes a POST request to the given endpoint.
   * @param {string} endpoint - The API endpoint (e.g., '/users').
   * @param {object} payload - The data to send in the body of the request.
   * @returns {Promise<any>} - A promise that resolves to the response data.
   */
  post: async (endpoint, payload) => {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json(); // Assuming error response contains a message
        throw new Error(`error ${response.status}: ${errorData.message || response.statusText}`,);
      }

      return response.json();
    } catch (error) {
      console.error(`POST request failed: ${error.message}`);
      throw error;
    }
  },
};

export default ApiService;
