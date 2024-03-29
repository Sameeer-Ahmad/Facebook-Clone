
import './App.css';


import Profile from './pages/profile/Profile';

import AllRoutes from './routes/Allroutes';
import Nav from './components/Navbar';

import Login from './pages/Login/Login';

function App() {
  return (

 <div className='App'>

    {/* <Nav /> */}
      <AllRoutes />
     <Login/>
  </div>

  );
}

export default App;


