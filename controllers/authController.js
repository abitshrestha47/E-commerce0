import { User } from "../models/User.js";
import { comparePassword, hashPassword } from "../utils/authUtils.js";
import jwt from 'jsonwebtoken';
export const registerController=async(req,res)=>{
    try {
        const {username,email,password,phone,address,answer}=req.body;
        //validations
        if(!username){
            return res.send({message:'Username is required!'});
        }
        if(!email){
            return res.send({message:'Email is required!'});
        }
        if(!password){
            return res.send({message:'Password is required!'});
        }
        if(!phone){
            return res.send({message:'Phone is required!'});
        }
        if(!address){
            return res.send({message:'Address is required!'});
        }
        if(!answer){
            return res.send({message:'Answer is required!'});
        }

        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(200).send({
                success:false,message:'Already Register please login',
            });
        }
        const hashedPassword=await hashPassword(password);
        const user=await new User({username,email,phone,address,password:hashedPassword,answer}).save();
        res.status(201).send({
            success:true,   
            message:'User Registered successfully',
            user,   
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in registration',
        })
    }
}   

export const loginController=async(req,res)=>{
    try {
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(404).send({
                success:false,
                message:'Invalid email or password'
            });
        }
        const user=await User.findOne({email});
        if(!user){
            return res.status(404).send({   
                success:false,
                message:'Email is not registered',
            });
        }
        const match=await comparePassword(password,user.password);
        if(!match){                                             
            return res.status(200).send({
                success:false,
                message:'Invalid Password',
            });
        }
        const token=await jwt.sign({_id:user._id},process.env.JWT_SECRET,{
            expiresIn:'1hr',
        });
        res.status(200).send({
            success:true,
            message:'login successful',
            user:{
                username:user.username,
                email:user.email,
                phone:user.phone,
                address:user.address,
                role:user.role, 
            },
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in login',
            error
        });
    }
}

//forgot password
export const forgotPasswordController=async(req,res)=>{
    try {
        const {email,answer,newPassword}=req.body;
        if(!email){
            res.status(400).send({message:'Email is required!'});
        }
        if(!answer){
            res.status(400).send({message:'Email is required!'});
        }
        if(!newPassword){
            res.status(400).send({message:'Email is required!'});
        }
        //check email and answer
        const user=await User.findOne({email,answer});
        if(!user){
            return res.status(404).send({
                success:false,
                message:'Wrong Email or Answer',
            });
        }
        const hashed=await hashPassword(newPassword);
        await User.findByIdAndUpdate(user._id,{password:hashed});
        res.status(200).send({
            success:true,
            message:'Password reset successfully.',
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Something went wrong',
            error
        })
    }
}