import React from "react";
import { GoogleLogin } from "react-google-login";

const CLIENT_ID = process.env.REACT_APP_GGL_CLIENT_ID;

const Login = () => {
  return (
    <div className="signInButton">
      <GoogleLogin
        clientId={CLIENT_ID}
        buttonText="Login"
        isSignedIn
        onFailure={() => (window.location.href = "/")}
        onSuccess={() => (window.location.href = "/search")}
      />
    </div>
  );
};

export default Login;
