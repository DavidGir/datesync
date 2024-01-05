import useAuthToken from "../../hooks/useAuthToken";

const TestAuthToken = () => {
  const fetchAccessToken = useAuthToken();

  const handleFetchToken = async () => {
    try {
      const token = await fetchAccessToken();
      console.log('Token fetched:', token); 
    } catch (error) {
      console.error('Error in fetching token:', error);
    }
  };

  return (
    <div>
      <button onClick={handleFetchToken}>Fetch Auth0 Token</button>
    </div>
  );
};

export default TestAuthToken;
