import { Routes, Route, Navigate} from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import "./App.css";

import CreateDate from "./routes/CreateDate";
import Dashboard from "./routes/Dashboard";
import LandingPage from "./routes/LandingPage";
import LoginButton from './components/auth/LoginButton';
import LogoutButton from './components/auth/LogoutButton';
import Profile from './components/auth/Profile';
import TestAuthToken from './components/auth/TestAuthToken';

function App() {
  const {isLoading, error, isAuthenticated } = useAuth0();

  return (
    <main className="column">
      <h1> Auth0 Login </h1>
      {error && <p>Authentication Error</p>}
      {/* If no error and is in isLoading state Loading will display; this is a perfect place to add a loading spinner or something */}
      {!error && isLoading && <p>Loading...</p>}
      {!error && !isLoading && (
        <>
          <LoginButton />
          <LogoutButton />
          <Profile />
        </>
      )}
      <>
        <TestAuthToken />
      </>
    <Routes>
      {/* Public Routes */}
      <Route path='/' element={<LandingPage />} />
      <Route path='/create-date' element={<CreateDate />} />
      {/* Protected Routes */}
      <Route path= '/dashboard' element={isAuthenticated ? <Dashboard /> : <Navigate to='/' />} />
    </Routes>
    </main>
  )
}

export default App;
