import express from 'express';
import { isAdmin, requiresSignIn } from '../middleware/authMiddleware.js';
import { createProductController,deleteProductController,getProductController,getSingleController,productFiltersController,productPhotoController, updateProductController,productCountController,productListController } from '../controllers/productController.js';
import formidable from 'express-formidable';

const router=express.Router();

router.post('/create-product',requiresSignIn,isAdmin,formidable(),createProductController);

router.get('/get-product',getProductController);

router.get('/get-product/:slug',getSingleController);

router.get('/product-photo/:pid',productPhotoController);

router.delete('/delete-product/:id',deleteProductController);

router.put('/update-product/:pid',requiresSignIn,isAdmin,formidable(),updateProductController);

//filter product
router.post('/product-filters',productFiltersController);

router.get('/product-count',productCountController);

router.get('/product-list/:page',productListController);

export default router;