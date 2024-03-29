
import './App.css';
import Nav from './components/Navbar';
import Sidebar from './components/Sidebar';
import AllRoutes from './routes/Allroutes';

function App() {
  return (

 <div className='App'>

    
    <Nav />
      <AllRoutes />
      <Sidebar/>

  </div>

  );
}

export default App;


