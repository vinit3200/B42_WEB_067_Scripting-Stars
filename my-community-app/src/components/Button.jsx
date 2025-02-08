/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";
import { motion } from "framer-motion";
import "../styles/community.css";

const Button = ({ text }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="community-btn"
    >
      {text}
    </motion.button>
  );
};

export default Button;
