import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth0();

  return ( 
    // User needs to be authenticated to see the log out button:
    isAuthenticated && (
      <button onClick={() => logout()}>
        Log Out
      </button>
    )
  )
};

export default LogoutButton;

