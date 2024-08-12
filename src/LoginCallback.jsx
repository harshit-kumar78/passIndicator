// src/components/LoginCallback.js
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { OktaAuth } from "@okta/okta-auth-js";

const oktaAuth = new OktaAuth({
  clientId: import.meta.env.VITE_OKTA_CLIENT_ID,
  issuer: import.meta.env.VITE_ISSUER_URI,
  redirectUri: window.location.origin + import.meta.env.VITE_REDIRECT_URL,
  scopes: JSON.parse(import.meta.env.VITE_SCOPE),
  pkce: JSON.parse(import.meta.env.VITE_PKCE),
  logLevel: import.meta.env.VITE_LOG_LEVEL,
});

const LoginCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    oktaAuth
      .handleLoginRedirect()
      .then(() => {
        navigate("/protected ");
      })
      .catch((err) => {
        console.error("Error during login callback:", err);
      });
  }, [oktaAuth, navigate]);

  return <div>Logging you in...</div>;
};

export default LoginCallback;
