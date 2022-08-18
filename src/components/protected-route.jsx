import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { gapi } from "gapi-script";
import { fallback } from "./suspense-ui";

/**
 * Protects routes from global use.
 * @param {Object} `Object gets descructed~
 */
const ProtectedRoute = ({ element: Component, ...rest }) => {
  const [isAuthenticated, setAuthenticated] = useState(null);
  const [g_user, setGUser] = useState(null);
  const [g_auth, setGAuth] = useState(null);
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      const instance = gapi.auth2.getAuthInstance();
      const authed = instance.isSignedIn.get();
      setAuthenticated(authed);
      if (authed) {
        const profile = instance.currentUser.get().getBasicProfile();
        setGUser({
          id: profile.getId(),
          name: profile.getName(),
          image: profile.getImageUrl(),
          email: profile.getEmail(),
        });
        setGAuth(instance.currentUser.get().getAuthResponse());
      }
    }
    return () => (mounted = false);
  }, []);

  if (isAuthenticated === null) return fallback;

  if (isAuthenticated)
    return <Component {...rest} g_user={g_user} g_auth={g_auth} />;
  return <Navigate to="/" replace />;
};

export default ProtectedRoute;
