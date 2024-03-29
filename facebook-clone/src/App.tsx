import React from "react";
import Nav from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import AllRoutes from "./routes/Allroutes";
import { PostPage } from "./components/MiddleFeedParts/PostPage";

function App() {
  return (
   
        <div className="App">
          <AllRoutes />
          <Sidebar />
          <PostPage />
        </div>


  );
}

export default App;
