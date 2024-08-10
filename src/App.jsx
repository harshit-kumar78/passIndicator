
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Indicator from './Indicator/Indicator';
import { OktaAuth } from '@okta/okta-auth-js';
import { Security, } from "@okta/okta-react";
import LoginCallback from '../src/LoginCallback';
import Home from './Home/Home';
import Navbar from './Navbar/Navbar';

// okta config setup
const oktaAuth = new OktaAuth({
  clientId: import.meta.env.VITE_OKTA_CLIENT_ID,
  issuer: import.meta.env.VITE_ISSUER_URI,
  redirectUri: window.location.origin + import.meta.env.VITE_REDIRECT_URL,
  scopes: JSON.parse(import.meta.env.VITE_SCOPE),
  pkce: JSON.parse(import.meta.env.VITE_PKCE),
  logLevel: import.meta.env.VITE_LOG_LEVEL,
})

const restoreOriginalUri = async (_oktaAuth, originalUri) => {
  navigate(originalUri || "/", { replace: true });
};

function App() {
  return (
    <BrowserRouter>
      <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/protected' element={<Indicator />} />
          <Route path="/login/callback" element={<LoginCallback />} />
        </Routes>
      </Security>
    </BrowserRouter>
  )
}

export default App
