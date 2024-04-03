import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Context/AuthContextProvider";

const PrivateRoute: React.FC = ( children ) => {
  let { currentUser } = useAuth();
  if (currentUser) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;
