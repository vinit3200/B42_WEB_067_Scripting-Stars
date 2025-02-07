import React from "react";
import Navbar from "../Navbar/Navbar"

const Home = ({ user }) => {
    return (
        <>
        <Navbar/>
        <div className="home-container">
            <h1>Welcome, {user.username}!</h1>
            <p>This is your home page.</p>
        </div>
        </>
    );
};

export default Home;
