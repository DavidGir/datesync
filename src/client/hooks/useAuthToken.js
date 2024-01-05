import { useAuth0 } from "@auth0/auth0-react";

// The following is a custom hook that retrieves the Auth0 access token:
const useAuthToken = () => {
  // Using the useAuth0 hook from Auth0's React SDK to get authentication functions:
  const { getAccessTokenSilently } = useAuth0();

  const fetchAccessToken = async () => {
    try {
      // This is the attempt to get the token silently without user interaction once the user registers or logs-in:
      const token = await getAccessTokenSilently({
        audience: "https://dateplannerapi.com"
      });
      console.log("Access Token:", token);
      return token;
    } catch (error) {
      console.error("Error fetching access token:", error);
      throw error; 
    }
  };

  return fetchAccessToken;
};

export default useAuthToken;
