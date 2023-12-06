import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export const requiresSignIn=async(req,res,next)=>{
    try {
        const decode=jwt.verify(req.headers.authorization,process.env.JWT_SECRET);
        req.user=decode;
    } catch (error) {
        console.log(error);
    }
}

export const isAdmin=async(req,res,next)=>{
    try {
        const user=await User.findById(req.user._id);
        if(user.role!==1){
            return res.status(401).send({
                success:false,
                message:'Unauthorized access',
            })
        }else{
            next();
        }
    } catch (error) {
       console.log(error);
       res.status(401).send({
        success:false,
        error,
        message:'error in admin middleware',
       });
    }
}