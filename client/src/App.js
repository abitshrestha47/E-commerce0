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
import PrivateRoute from './components/Routes/Private';
import ForgotPassword from './pages/Auth/ForgotPassword';
import AdminRoute from './components/Routes/AdminRoute';
import AdminDashboard from './pages/admin/AdminDashboard';
import CreateCategory from './pages/admin/CreateCategory';
import CreateProduct from './pages/admin/CreateProduct';
import Users from './pages/admin/Users';
import Orders from './pages/user/Orders';
import Profile from './pages/user/Profile';
import Products from './pages/admin/Products';
import UpdateProduct from './pages/admin/UpdateProduct';
function App() {
  return (
    <>
      <Routes>
        <Route>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/dashboard' element={<PrivateRoute/>}>
            <Route path='user' element={<Dashboard/>}/>   
            <Route path='user/orders' element={<Orders/>}/>      
            <Route path='user/profile' element={<Profile/>}/>      
          </Route>
          <Route path='/dashboard' element={<AdminRoute/>}>
            <Route path='admin' element={<AdminDashboard/>}/>
            <Route path='admin/create-category' element={<CreateCategory/>}/>
            <Route path='admin/create-product' element={<CreateProduct/>}/>
            <Route path='admin/product/:slug' element={<UpdateProduct/>}/>
            <Route path='admin/users' element={<Users/>}/>
            <Route path='admin/products' element={<Products/>}/>
          </Route>
          <Route path='/register' element={<Register/>}/>   
          <Route path='/forgot-password' element={<ForgotPassword/>}/>    
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
