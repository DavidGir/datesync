import { Routes, Route } from 'react-router-dom';
import "./App.css";

import CreateDate from "./routes/CreateDate";
import Dashboard from "./routes/Dashboard";
import LandingPage from "./routes/LandingPage";


function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='/create-date' element={<CreateDate />} />
      <Route path= '/dashboard' element={<Dashboard />} />
    </Routes>
    </>
  )
}

export default App;
