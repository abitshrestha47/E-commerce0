import express from 'express';
import { registerController,loginController } from '../controllers/authController.js';
import { requiresSignIn } from '../middleware/authMiddleware.js';

//routing object
const router=express.Router();

router.post('/register',registerController);

router.post('/login',loginController);

//protected route
router.get('/user-auth',requiresSignIn,(req,res)=>{
    res.status(200).send({ok:true});
});

export default router;

