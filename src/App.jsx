import React, { useEffect, useState, Suspense, lazy } from "react";
import { gapi } from "gapi-script";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Code Spliting
import ErrorBoundary from "./components/error-boundry";
import { fallback } from "./components/suspense-ui";

// Middleware
import ProtectedRoute from "./components/protected-route";

// General Pages
const Home = lazy(() => import("./pages/home"));
const Search = lazy(() => import("./pages/search"));

// Error Pages
const NotFound = lazy(() => import("./pages/not-found"));

const CLIENT_ID = process.env.REACT_APP_GGL_CLIENT_ID;

const App = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const start = () => {
      gapi.auth2
        .init({
          client_id: CLIENT_ID,
          scope:
            "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://mail.google.com/",
          // ----- THE NEXT 3 LINES DONT WORK ON LOCALHOST -----
          // ux_mode: "redirect",
          // cookie_policy: "single_host_origin",
          // redirect_uri: "http://localhost:3000/search"
        })
        .then(() => setLoading(false));
    };
    gapi.load("auth2", start);
  }, []);

  if (loading) return fallback;

  return (
    <ErrorBoundary>
      <Suspense fallback={fallback}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/search"
              element={<ProtectedRoute element={Search} />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </Suspense>
    </ErrorBoundary>
  );
};

export default App;
