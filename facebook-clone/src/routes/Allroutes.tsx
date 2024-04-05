import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Home from "../pages/navbar/Home";
import Friends from "../pages/navbar/Friends";
import Watch from "../pages/navbar/Watch";
import Marketplace from "../pages/navbar/Marketplace";
import Groups from "../pages/navbar/Groups";
import Signup from "../pages/Signup";
import Login from "../pages/Login/Login";
import Profile from "../pages/profile/Profile";
import Nav from "../components/Navbar";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import { app } from "../firebase";

const AllRoutes = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, []);
  const shouldRenderNav = isLoggedIn && location.pathname !== "/login";
  return (
    <div>
      {shouldRenderNav && <Nav />}
      <Routes>
        <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
        <Route path="/friends" element={isLoggedIn ? <Friends /> : <Navigate to="/login" />} />
        <Route path="/watch" element={isLoggedIn ? <Watch /> : <Navigate to="/login" />} />
        <Route path="/marketplace" element={isLoggedIn ? <Marketplace /> : <Navigate to="/login" />} />
        <Route path="/groups" element={isLoggedIn ? <Groups /> : <Navigate to="/login" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile/:displayName/:uid" element={<Profile />} />
      </Routes>
    </div>
  );
};

export default AllRoutes;
