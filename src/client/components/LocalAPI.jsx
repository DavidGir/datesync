import { useState } from 'react'
import axios from 'axios'

const LocalApi = () => {
  const [text, setText] = useState([]);
  const [error, setError] = useState(null);

  const url = "http://localhost:3000/local";

  const fetchData = () => {
    axios.get(url).then((res) => {
      console.log("data", res.data.local_results);
      setText(res.data.local_results);
      setError(null);
    }).catch(err => {
      // We should handle the error and set the error state
      setError('Failed to fetch data.');
      console.error('API fetch error:', err);
    });
  };

  const handleClick = () => {
    fetchData();
  };

  return (
    <>
      <h1>App</h1>
      <button onClick={handleClick}>Click me to fetch data</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {text.map((data) => (
        <div key={data.position}>
          <img src={data.thumbnail} alt="" />
          <div>{data.title}</div>
          <div>{data.address}</div>
          <div>{data.description}</div>
        </div>
      ))}
    </>
  );
}

export default LocalApi;