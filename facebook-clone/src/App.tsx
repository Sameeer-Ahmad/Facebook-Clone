
import './App.css';
import Nav from './components/Navbar';
import AllRoutes from './routes/Allroutes';

import Signup from "./pages/Signup";
import { PostPage } from './components/MiddleFeedParts/PostPage';
function App() {
  return (
 <div className='App'>
    {/* <Signup/> */}
    <Nav />
    <AllRoutes />
    <PostPage />
  </div>
  );
}

export default App;
