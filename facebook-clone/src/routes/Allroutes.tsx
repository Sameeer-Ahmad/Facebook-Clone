import { Route, Routes } from "react-router-dom"
import Home from "../pages/navbar/Home"
import Friends from "../pages/navbar/Friends"
import Watch from "../pages/navbar/Watch"
import Marketplace from "../pages/navbar/Marketplace"
import Groups from "../pages/navbar/Groups"


import Signup from "../pages/Signup"
import Login from "../pages/Login/Login"
import Profile from "../pages/profile/Profile"
import Nav from "../components/Navbar"
import PrivateRoute from "./PrivateRoutes"
import { useEffect, useState } from "react"
import { getAuth, onAuthStateChanged } from "@firebase/auth"
import { app } from "../firebase"


const AllRoutes=()=>{
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  
    useEffect(() => {
        const auth = getAuth(app);
    
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          setIsLoggedIn(!!user); // Set isLoggedIn to true if user is authenticated, otherwise false
        });
    
        return () => unsubscribe(); // Cleanup function
      }, []);


    return(
        <div>

{isLoggedIn && <Nav />}

            <Routes>

                <Route element={<PrivateRoute/>}>

                <Route path="/" element={<Home />} />
                <Route path="/friends" element={<Friends />} />
                <Route path="/watch" element={<Watch />} />
                <Route path="/marketplace" element={<Marketplace />} />
                <Route path="/groups" element={<Groups />} />
                </Route>
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/:username/:uid" element={<Profile/>} />
            </Routes>
        </div>
    )
}
export default AllRoutes