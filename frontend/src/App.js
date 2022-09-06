import Navbar from "./components/navbar/Navbar"
import {  Routes , Route , Navigate } from "react-router-dom"
import Feed from "./pages/Feed"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"

import { useState } from "react"

import { useAuthContext } from "./customHooks/useContext"


function App() {
    const [shownav , set_shownav] = useState(true)
    const { user } = useAuthContext()

  return (
    <div className="relative">

       { user && <Navbar />}

          <Routes>
            <Route path="/" element= { user ?  <Feed /> : <Navigate to="/login" /> } />

            <Route path="/login" element= { !user ?   <Login /> : <Navigate to="/" /> } />
            <Route path="/signup" element= { !user ?  <Signup /> : <Navigate to="/" />  } />

            <Route path="/myhome" element= { user ?  <Home /> : <Navigate to="/login" /> } />
          </Routes>
  
    </div>
  );
}

export default App;