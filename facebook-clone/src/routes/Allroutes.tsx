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
import { Center, Spinner } from "@chakra-ui/react";

const AllRoutes = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
      setIsLoading(false); // Set loading to false once authentication state is determined
    });
    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return<Center></Center>
  }

  const shouldRenderNav = isLoggedIn && location.pathname !== "/login" && location.pathname !== "/signup";

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
        {!isLoggedIn && <Route path="*" element={<Navigate to="/login" />} />}
      </Routes>
    </div>
  );
};

export default AllRoutes;
