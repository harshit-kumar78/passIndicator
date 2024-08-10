import React from "react";
import { Link } from "react-router-dom";

const Home = () => (
    <div>
        <h1>Home</h1>
        <Link to="protected">Go to Password Strength Indicator</Link>
    </div>
);

export default Home;
