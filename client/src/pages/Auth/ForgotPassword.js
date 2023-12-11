import React,{useState} from 'react'
import Layout from '../../components/Layout/Layout'
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const [email,setEmail]=useState('');
    const [newPassword,setNewPassword]=useState('');
    const [answer,setAnswer]=useState('');
    const navigate=useNavigate();
    //form sumbission
    const handleSubmit=async (e)=>{
        e.preventDefault();
        try {
            const res=await axios.post(`http://localhost:8080/api/v1/auth/forgot-password`,{email,newPassword,answer});
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
    <Layout title={'Forgot-Password'}> 
        <div className='form-container'>
        <h1>Reset Password</h1>
        <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <input type="Email" onChange={(e)=>setEmail(e.target.value)} className="form-control" id="exampleInputEmail" placeholder='enter your email...' value={email} required/>
        </div>
        <div className="mb-3">
            <input type="text" onChange={(e)=>setAnswer(e.target.value)} className="form-control" id="exampleInputEmail" placeholder='enter your fovortie sport...' value={answer} required/>
        </div>
        <div className="mb-3">
            <input type="password" onChange={(e)=>setNewPassword(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder='enter your password...' value={newPassword} required/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        </div>
    </Layout>
  )
}

export default ForgotPassword