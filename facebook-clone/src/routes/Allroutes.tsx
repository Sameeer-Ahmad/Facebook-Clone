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

const AllRoutes=()=>{
    return(
        <div>
           <Nav/>
            <Routes>
                <Route element={<PrivateRoute/>}>
                <Route path="/home" element={<Home />} />
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