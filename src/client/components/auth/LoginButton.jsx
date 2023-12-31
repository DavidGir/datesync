import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return ( 
    // User that is not authenticated will see the log in button:
    !isAuthenticated && (
      <button onClick={() => loginWithRedirect()}>
        Log In
      </button>
    )
  )
};

export default LoginButton;
