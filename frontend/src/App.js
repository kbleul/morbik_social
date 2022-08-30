import Navbar from "./components/navbar/Navbar"
import {  Routes , Route } from "react-router-dom"
import Feed from "./pages/Feed"
import Home from "./pages/Home"


function App() {
  return (
    <div className="relative">

        <Navbar />

          <Routes>
            <Route path="/" element= { <Feed />} />
            <Route path="/myhome" element= { <Home />} />
     
          </Routes>
  
    </div>
  );
}

export default App;
// <Route path="/Home" element= { <Home />} />
// <Route path="*" element={<NoPage />} />