import { GoogleLogout } from "react-google-login";

const CLIENT_ID = process.env.REACT_APP_GGL_CLIENT_ID;

const Logout = () => {
  const onLogoutSuccess = () => {
    console.log("LOGOUT SUCCESSFUL!");
    window.location.href = "/";
  };
  return (
    <div className="signOutButton">
      <GoogleLogout
        clientId={CLIENT_ID}
        buttonText="Logout"
        onLogoutSuccess={onLogoutSuccess}
      />
    </div>
  );
};

export default Logout;
