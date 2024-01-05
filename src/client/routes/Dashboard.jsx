import axios from "axios";
import useAuthToken from "../hooks/useAuthToken"; 

const Dashboard = () => {
  const fetchAccessToken = useAuthToken();

  const fetchData = async () => {
    try {
      // const token = await fetchAccessToken();

      const hardcodedToken = import.meta.env.VITE_AUTH0_TEST_TOKEN;

      const response = await axios.get('http://localhost:3000/protected/dashboard', {
        headers: {
          Authorization: `Bearer ${hardcodedToken}`
        }
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching protected data:', error);
    }
  };

  return (
    <div>
      <button onClick={fetchData}>Load Data</button>
    </div>
  );
};

export default Dashboard;
