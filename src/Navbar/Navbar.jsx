import React from 'react'
import './Navbar.css'
import { GrLogout } from "react-icons/gr";
import { OktaAuth } from '@okta/okta-auth-js';
import { useOktaAuth } from '@okta/okta-react';
const Navbar = () => {
    const { authState, oktaAuth } = useOktaAuth();
    return (
        <div className="navbar">
            <div className="navbar-header">
                Navbar
            </div>
            {authState && authState.isAuthenticated && <div className="logout cursor" >
                <GrLogout className="cursor" onClick={() => { oktaAuth.signOut() }} />
            </div>}
        </div >
    )
}

export default Navbar