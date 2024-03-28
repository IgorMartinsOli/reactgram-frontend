import './App.css';
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';

//pages
import Home from './pages/Home/Home.jsx';
import Login from './pages/Auth/Login.jsx';
import Register from './pages/Auth/Register.jsx';

//hooks
import {useAuth} from './hooks/useAuth';

//components
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import EditProfile from './pages/EditProfile/EditProfile.js';
import Profile from './pages/Profile/Profile';
import Photo from './pages/Photo/Photo.js';

function App() {
  const {auth, loading} = useAuth();

  if(loading){
    return <div>Loading...</div>
  }
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
        <div className='container'>
          <Routes>
            <Route path='/' element={auth ? <Home /> : <Navigate to='/login'/>}/>
            <Route path="/profile" element={auth ? <EditProfile /> : <Navigate to="/login" />}/>
            <Route path="/users/:id" element={auth ? <Profile /> : <Navigate to="/login" />}/>
            <Route path='/login' element={!auth ? <Login /> : <Navigate to='/'/>}/>
            <Route path='/register' element={!auth ? <Register /> : <Home to='/'/>} />
            <Route path="/photos/:id" element={auth ? <Photo /> : <Navigate to="/login" />}/>
            
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
