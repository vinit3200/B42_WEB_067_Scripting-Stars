import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/authSlice";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await login(email, password);
      dispatch(loginSuccess({ user: data.user, token: data.token }));
      navigate("/dashboard");
    } catch (error) {
      alert("Login failed: " + error.response.data.message);
    }
  };

  return (
    <AuthLayout>
      <h2 className="text-2xl font-bold text-center">Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input type="email" placeholder="Email" className="w-full p-2 border rounded" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" className="w-full p-2 border rounded" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Login</button>
      </form>
    </AuthLayout>
  );
};

export default Login;
