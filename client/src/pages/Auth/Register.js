import React,{useState} from 'react'
import Layout from '../../components/Layout/Layout'
import toast from 'react-hot-toast';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [username,setUsername]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [phone,setPhone]=useState('');
    const [address,setAddress]=useState('');
    const [answer,setAnswer]=useState('');
    const navigate=useNavigate();
    //form sumbission
    const handleSubmit=async (e)=>{
        e.preventDefault();
        try {
            const res=await axios.post(`http://localhost:8080/api/v1/auth/register`,{username,email,password,phone,address,answer});
            if(res && res.data.success){
                toast.success(res.data.message);
                navigate('/login');
            }else{
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        }
    }

  return (
    <Layout title={'Register App'}>
        <div className='register'>
        <h1>Register Page</h1>
        <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <input type="username" value={username} onChange={(e)=>setUsername(e.target.value)} className="form-control" id="exampleInputUsername" placeholder='enter your username...' required/>
        </div>              
        <div className="mb-3">
            <input type="Email" onChange={(e)=>setEmail(e.target.value)} className="form-control" id="exampleInputEmail" placeholder='enter your email...' value={email} required/>
        </div>
        <div className="mb-3">
            <input type="phone" onChange={(e)=>setPhone(e.target.value)} className="form-control" id="exampleInputphone" placeholder='enter your phone...' value={phone} required/>
        </div>
        <div className="mb-3">
            <input type="address" onChange={(e)=>setAddress(e.target.value)} className="form-control" id="exampleInputAddress" placeholder='enter your address...' value={address} required/>
        </div>
        <div className="mb-3">
            <input type="password" onChange={(e)=>setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder='enter your password...' value={password} required/>
        </div>
        <div className="mb-3">
            <input type="text" onChange={(e)=>setAnswer(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder='What is your Favorite sport?' value={answer} required/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        </div>
    </Layout>   
  )
}

export default Register