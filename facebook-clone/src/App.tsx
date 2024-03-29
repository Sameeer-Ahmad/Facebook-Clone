// import { Flex } from "@chakra-ui/layout";
import "./App.css";


import { useContext, useEffect, useState } from "react";
 // Import the core Firebase module
 // Import the Firebase authentication module
import AllRoutes from "./routes/Allroutes";
import { getAuth } from "firebase/auth";
import Login from "./pages/Login/Login";
import { AuthContext } from "./Context/AuthContextProvider";


function App() {
  const authContext = useContext(AuthContext);  
  // If user is not authenticated, redirect to the login page
  console.log(authContext);
  
  return (
    <div>
      {authContext ? (
        // User is signed in
        <AllRoutes/>
      ) : (
        // User is signed out
        <Login />
      )}
    </div>
  )
}

export default App;