import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home/Home";
import RegistrationForm from "./Components/Login/Login";
import EditProfile from "./Components/Community/EditProfile"; // ✅ Ensure correct import path

function App() {
  const [user, setUser] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false); // ✅ Added state

  return (
    <BrowserRouter>
      <Navbar user={user} setUser={setUser} setShowEditProfile={setShowEditProfile} />

      <Routes>
        <Route 
          path="/" 
          element={<Home 
            user={user} 
            setUser={setUser} 
            setShowAuth={setShowAuth} 
            showEditProfile={showEditProfile} 
            setShowEditProfile={setShowEditProfile} // ✅ Pass this to Home
          />} 
        />
        <Route path="/login" element={<RegistrationForm setUser={setUser} />} />
      </Routes>

      {/* ✅ Render EditProfile as a modal, not as a page */}
      {showEditProfile && (
        <div className="popup-overlay">
          <div className="popup-content">
            <EditProfile 
              user={user} 
              setUser={setUser} 
              onClose={() => setShowEditProfile(false)} 
            />
          </div>
        </div>
      )}
    </BrowserRouter>
  );
}

export default App;
