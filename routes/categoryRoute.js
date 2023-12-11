import express from 'express';
import { isAdmin, requiresSignIn } from '../middleware/authMiddleware.js';
import { createCategoryController,updateCategoryController,categoryController,singleCategoryController,deleteCategoryController } from '../controllers/categoryController.js';

const router=express.Router();

//routes
router.post('/create-category',requiresSignIn,isAdmin,createCategoryController);

router.put('/update-category/:id',requiresSignIn,isAdmin,updateCategoryController);

router.get('/get-category',categoryController);

router.get('/single-category/:slug',singleCategoryController);

router.delete('/delete-category/:id',requiresSignIn,isAdmin,deleteCategoryController);

export default router;