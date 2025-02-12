import axios from "axios";

const API_URL = "http://localhost:5000/api/auth"; // Adjust this URL

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data;
};

export const signup = async (username, email, password) => {
  const response = await axios.post(`${API_URL}/signup`, { username, email, password });
  return response.data;
};

export const forgotPassword = async (email) => {
  const response = await axios.post(`${API_URL}/forgot-password`, { email });
  return response.data;
};

export const resetPassword = async (email, otp, newPassword) => {
  const response = await axios.post(`${API_URL}/reset-password`, { email, otp, newPassword });
  return response.data;
};
