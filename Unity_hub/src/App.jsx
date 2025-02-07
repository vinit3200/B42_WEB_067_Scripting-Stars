import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import RegistrationForm from './Components/Login/Login'
import { BrowserRouter, Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from "./Components/Home/Home"
import Login from "./Components/Login/Login"

function App() {
  const [user, setUser] = useState(null);

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={user ? <Home user={user} /> : <Navigate to="/login" />} />
        <Route path="/login" element={<RegistrationForm setUser={setUser} />} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
