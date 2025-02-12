import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
//import Signup from "./pages/Signup";
import Login from "./pages/Login";
// import ForgotPassword from "./pages/ForgotPassword";
// import ResetPassword from "./pages/ResetPassword";
// import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {/* <Route path="/signup" element={<Signup />} /> */}
          <Route path="/login" element={<Login />} />
          {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}
          {/* <Route path="/reset-password" element={<ResetPassword />} /> */}
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
