import "./App.css";
import { PostPage } from "./components/MiddleFeedParts/PostPage";
import Nav from "./components/Navbar";
import AllRoutes from "./routes/Allroutes";

function App() {
  return (
    <div className="App">
      <Nav />
      <AllRoutes />
      <PostPage />
    </div>
  );
}

export default App;
