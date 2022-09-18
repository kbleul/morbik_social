import Navbar from "./components/navbar/Navbar"
import { AUTH_ACTIONS } from "./contex/authContext"

import {  Routes , Route , Navigate } from "react-router-dom"
import Feed from "./pages/Feed"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"


import { useAuthContext } from "./customHooks/useMyContext"

function App() {

  const { user  } = useAuthContext()
  

  return (
    <div className="relative" >

       { user && <Navbar />}

          <Routes>
            <Route path="/" element= { user ?  <Feed /> : <Navigate to="/login" /> } />

            <Route path="/login" element= { !user ?   <Login /> : <Navigate to="/" /> } />
            <Route path="/signup" element= { !user ?  <Signup /> : <Navigate to="/" />  } />

            <Route path="/myhome/:id" element= { user ?  <Home /> : <Navigate to="/login" /> } />

     
          </Routes>
  
    </div>
  );
}

export default App;

/*

       <Route path="/myhome/:id" element= { user ?  <Home /> : <Navigate to="/login" /> } />
*/