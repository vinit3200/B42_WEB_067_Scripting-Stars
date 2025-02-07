import React, { useState } from "react";
import './Login.css'; 

const RegistrationForm = () => {
    const [isSignIn, setIsSignIn] = useState(true);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [data, setData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = {
            username: data.username,
            email: data.email,
            password: data.password,
        };

        const url = isSignIn
            ? "https://b42-web-067-scripting-stars.onrender.com/user/login"
            : "https://b42-web-067-scripting-stars.onrender.com/user/signup";

        try {
            const res = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (res.ok) {
                const result = await res.json();
                alert(`${isSignIn ? "Login" : "Signup"} successfully 😉! User ID ${result.username}`);
                setData({
                    username: "",
                    email: "",
                    password: "",
                });
            } else {
                alert(`${isSignIn ? "Login" : "Signup"} Failed. Try Again 🙁`);
            }
        } catch (error) {
            alert("Error occurred during signup 😕");
        }
    };

    return (
        <div className={`container ${isSignIn ? "log-in" : "sign-up"}`}>
            <div className="box">
                <div className="container-forms">
                    {/* Toggle between Sign In and Sign Up */}
                    <div className="form-toggle">
                        <button
                            className={`toggle-btn ${isSignIn ? "active" : ""}`}
                            onClick={() => setIsSignIn(true)}
                        >
                            Sign In
                        </button>
                        <button
                            className={`toggle-btn ${!isSignIn ? "active" : ""}`}
                            onClick={() => setIsSignIn(false)}
                        >
                            Sign Up
                        </button>
                    </div>

                    <div className="container-form">
                        <div className={`form-item ${isSignIn ? "log-in" : "sign-up"}`}>
                            <form onSubmit={handleSubmit}>
                                {/* Only show this for signup */}
                                {!isSignIn && (
                                    <div>
                                        <label htmlFor="username"></label>
                                        <input
                                            placeholder="Enter your Username"
                                            type="text"
                                            name="username"
                                            value={data.username}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                )}

                                <div>
                                    <label htmlFor="email"></label>
                                    <input
                                        placeholder="email@gmail.com"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="password-input-container">
                                    <label htmlFor="password"></label>
                                    <input
                                        type={passwordVisible ? "text" : "password"}
                                        placeholder="***"
                                        name="password"
                                        value={data.password}
                                        onChange={handleChange}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setPasswordVisible(!passwordVisible)}
                                    >
                                        {passwordVisible ? "😎" : "🙄"}
                                    </button>
                                </div>

                                <button type="submit" className="password-toggle">
                                    {isSignIn ? "Log In" : "Register New Account"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegistrationForm;
