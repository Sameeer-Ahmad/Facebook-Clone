import { Route, Routes } from "react-router-dom"
import Home from "../pages/navbar/Home"
import Friends from "../pages/navbar/Friends"
import Watch from "../pages/navbar/Watch"
import Marketplace from "../pages/navbar/Marketplace"
import Groups from "../pages/navbar/Groups"
import Nav from "../components/Navbar"



const AllRoutes=()=>{
    return(
        <div>
           <Nav />
            <Routes>
            
                <Route path="/" element={<Home />} />
                <Route path="/friends" element={<Friends />} />
                <Route path="/watch" element={<Watch />} />
                <Route path="/marketplace" element={<Marketplace />} />
                <Route path="/groups" element={<Groups />} />

            </Routes>
        </div>
    )
}
export default AllRoutes