import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './components/Login';
import RegisterForm from './components/UserRegistration';
import VerFotos from './components/VerFotos';
import EditProfile from './components/EditProfile';
import PaginaPrincipal from './components/PaginaPrincipal';
import EditarAlbumes from './components/EditarAlbumes';
import UploadImage from './components/UploadImage';
import ViewPhotos from './components/ViewPhotos';
function App() {
  return (
    <>
    <Router>
    <Routes>
    <Route path="/" element={<Login/>}/>
    <Route path="/RegisterForm" element={<RegisterForm/>}/>
    <Route path="/VerFotos" element={<VerFotos/>}/>
    <Route path="/PaginaPrincipal" element={<PaginaPrincipal/>}/>
    <Route path="/EditProfile" element={<EditProfile/>}/> 
    <Route path="/EditarAlbumes" element={<EditarAlbumes/>}/>   
    <Route path="/UploadImage" element={<UploadImage/>}/>   
    <Route path="/ViewPhotos" element={<ViewPhotos/>}/> 
    </Routes>
    </Router>
  </>
  );
}

export default App;
