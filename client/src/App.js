import {Routes,Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import About from './pages/About';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import PageNotFound from './pages/PageNotFound';
import Register from './pages/Auth/Register';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Auth/Login';
import Dashboard from './pages/user/Dashboard';
function App() {
  return (
    <>
      <Routes>
        <Route>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>      
          <Route path='/register' element={<Register/>}/>    
          <Route path='/login' element={<Login/>}/>     
          <Route path='/about' element={<About/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/policy' element={<Policy/>}/>
          <Route path='*' element={<PageNotFound/>}/>     
        </Route>
      </Routes>
    </>
  );
}

export default App;
