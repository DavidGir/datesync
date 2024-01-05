import useAuthToken from './useAuthToken.js';
import axios from 'axios';

const useProtectedApi = () => {
  const fetchAccessToken = useAuthToken();

  const callProtectedEndpoint = async (url, method = 'GET', data = null) => {
    try {
      const token = await fetchAccessToken();
      const options = {
        method: method,
        headers: { Authorization: `Bearer ${token}` },
        url,
      };
      if (data) {
        options.data = data;
      }
      const response = await axios(options);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error making authenticated API request:", error);
      throw error;
    }
  };

  return callProtectedEndpoint;
};

export default useProtectedApi;
