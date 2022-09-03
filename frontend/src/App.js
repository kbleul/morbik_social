import Navbar from "./components/navbar/Navbar"
import {  Routes , Route } from "react-router-dom"
import Feed from "./pages/Feed"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"

import { useState } from "react"



function App() {
    const [shownav , set_shownav] = useState(true)
  return (
    <div className="relative">

       { shownav && <Navbar />}

          <Routes>
            <Route path="/" element= { <Login set_shownav={set_shownav}/>} />
            <Route path="/signup" element= { <Signup set_shownav={set_shownav}/>} />

            <Route path="/timeline" element= { <Feed />} />
            <Route path="/myhome" element= { <Home />} />
          </Routes>
  
    </div>
  );
}

export default App;
// <Route path="/Home" element= { <Home />} />
// <Route path="*" element={<NoPage />} />