import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css"; // Importing CSS Module

const RegistrationForm = ({ setUser }) => {
    const navigate = useNavigate();
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
                alert(`${isSignIn ? "Login" : "Signup"} successful!`);
                setUser(result);  
                navigate("/"); 
            } else {
                alert("Login Failed. Try Again.");
            }
        } catch (error) {
            alert("Error occurred during login.");
        }
    };

    return (
        <div className={`${styles.container} ${isSignIn ? styles["log-in"] : styles["sign-up"]}`}>
            <div className={styles.box}>
                <div className={styles["container-forms"]}>
                    {/* Toggle between Sign In and Sign Up */}
                    <div className={styles["form-toggle"]}>
                        <button
                            className={`${styles["toggle-btn"]} ${isSignIn ? styles.active : ""}`}
                            onClick={() => setIsSignIn(true)}
                        >
                            Sign In
                        </button>
                        <button
                            className={`${styles["toggle-btn"]} ${!isSignIn ? styles.active : ""}`}
                            onClick={() => setIsSignIn(false)}
                        >
                            Sign Up
                        </button>
                    </div>

                    <div className={styles["container-form"]}>
                        <div className={`${styles["form-item"]} ${isSignIn ? styles["log-in"] : styles["sign-up"]}`}>
                            <form onSubmit={handleSubmit}>
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

                                <div className={styles["password-input-container"]}>
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
                                        {passwordVisible ? "🧐" : "😎"}
                                    </button>
                                </div>

                                <button type="submit" className={styles["password-toggle"]}>
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
