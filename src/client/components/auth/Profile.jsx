import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
      <article className='column'>
        {/* If user picture or avatar exists it will display it as well as name */}
        {user?.picture && <img src={user.picture} alt={user?.name} />}
        <h2>{user?.name}</h2>
        {/* Below ul is to display what you get from the JSON obj keys for readability; also helps to target keys */}
        {/* <ul>
          {Object.keys(user).map((objKey, index) => <li key={index}>{objKey}: {user[objKey]} </li>)}
        </ul> */}
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        
      </article>
    )
  );
};

export default Profile;
