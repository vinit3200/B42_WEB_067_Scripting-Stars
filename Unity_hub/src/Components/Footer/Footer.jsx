import React from "react";
import "./Footer.css";

const Footer = () => {
    return (
        <div className="footer-box">
            <h1 style={{ color: "white", textAlign: "center", marginTop: "10px" }}>
                A Computer Science Portal for Unity Hub!
            </h1>
            <div className="footer-container">
                <div className="footer-row">
                    <div className="footer-column">
                        <p className="footer-heading">About Us</p>
                        <a href="#" className="footer-link">Aim</a>
                        <a href="#" className="footer-link">Vision</a>
                        <a href="#" className="footer-link">Testimonials</a>
                    </div>
                    <div className="footer-column">
                        <p className="footer-heading">Services</p>
                        <a href="#" className="footer-link">Writing</a>
                        <a href="#" className="footer-link">Internships</a>
                        <a href="#" className="footer-link">Coding</a>
                        <a href="#" className="footer-link">Teaching</a>
                    </div>
                    <div className="footer-column">
                        <p className="footer-heading">Contact Us</p>
                        <a href="#" className="footer-link">Uttar Pradesh</a>
                        <a href="#" className="footer-link">Ahmedabad</a>
                        <a href="#" className="footer-link">Indore</a>
                        <a href="#" className="footer-link">Mumbai</a>
                    </div>
                    <div className="footer-column">
                        <p className="footer-heading">Social Media</p>
                        <a href="#" className="footer-link">
                            <i className="fab fa-facebook-f"></i> <span>Facebook</span>
                        </a>
                        <a href="#" className="footer-link">
                            <i className="fab fa-instagram"></i> <span>Instagram</span>
                        </a>
                        <a href="#" className="footer-link">
                            <i className="fab fa-twitter"></i> <span>Twitter</span>
                        </a>
                        <a href="#" className="footer-link">
                            <i className="fab fa-youtube"></i> <span>YouTube</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
