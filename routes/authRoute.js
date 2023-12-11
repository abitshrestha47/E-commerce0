import express from 'express';
import { registerController,loginController,forgotPasswordController } from '../controllers/authController.js';
import { requiresSignIn,isAdmin } from '../middleware/authMiddleware.js';

//routing object
const router=express.Router();

router.post('/register',registerController);

router.post('/login',loginController);

//protected route
router.get("/user-auth", requiresSignIn, (req, res) => {
    res.status(200).send({ ok: true });
});

router.get("/admin-auth", requiresSignIn,isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
});
//forgot password
router.post('/forgot-password',forgotPasswordController);

export default router;  