import Product from "../models/Product.js";
import fs from 'fs';
import slugify from "slugify";

export const createProductController=async(req,res)=>{
    try {
        const {name,description,slug,price,category,quantity,shipping}=req.fields;
        const {photo}=req.files;
        //validations
        switch(true){
            case !name:
                return res.status(500).send({error:'Name is required!'});
            case !description:
                 return res.status(500).send({error:'Description is required!'});
            case !price:
                 return res.status(500).send({error:'Price is required!'});
            case !quantity:
                return res.status(500).send({error:'Quantity is required!'});
            case photo && photo.size>1000000:
                return res.status(500).send({error:'Photo is required and should be less than 1MB!'});
        }
        const products=new Product({...req.fields,slug:slugify(name)});
        if(photo){
            products.photo.data=fs.readFileSync(photo.path);
            products.photo.contentType=photo.type
        }
        await products.save();
        res.status(201).send({
            success:true,
            message:'Product created successfully',
            products,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:'Error in creating product',
        });
    }
}

export const getProductController=async(req,res)=>{
    try {
        const products=await Product.find({}).populate('category').select('-photo').limit(12).sort({createdAt:-1})
        res.status(200).send({
            success:true,
            countTotal:products.length,
            message:'All products',
            products,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:'Error in getting product',
        });
    }
}

export const getSingleController=async(req,res)=>{
    try {
        const product=await Product.findOne({slug:req.params.slug}).select('-photo').populate('category');
        res.status(200).send({
            success:true,
            message:'Single Product Fetched',
            product,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:'Error while getting single product',
        });
    }
}

export const productPhotoController=async(req,res)=>{
    try {
        const product=await Product.findById(req.params.pid).select('photo');
        if(product.photo.data){
            res.set('Content-type',product.photo.contentType)
            return res.status(200).send(product.photo.data);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:'Error while getting photo',
        });
    }
}

export const deleteProductController=async(req,res)=>{
    try {
        await Product.findByIdAndDelete(req.params.id).select('-photo');
        res.status(200).send({
            success:true,
            message:'Product deleted successfully',
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:'Error while deleting photo',
        });
    }
}

export const updateProductController=async(req,res)=>{
    try {
        const {name,description,slug,price,category,quantity,shipping}=req.fields;
        const {photo}=req.files;
        //validations
        switch(true){
            case !name:
                return res.status(500).send({error:'Name is required!'});
            case !description:
                 return res.status(500).send({error:'Description is required!'});
            case !price:
                 return res.status(500).send({error:'Price is required!'});
            case !quantity:
                return res.status(500).send({error:'Quantity is required!'});
            case photo && photo.size>1000000:
                return res.status(500).send({error:'Photo is required and should be less than 1MB!'});
        }
        const products=await Product.findByIdAndUpdate(req.params.pid,
            {
                ...req.fields,slug:slugify(name)
            },{new:true});  
        if(photo){
            products.photo.data=fs.readFileSync(photo.path);
            products.photo.contentType=photo.type
        }
        await products.save();
        res.status(201).send({
            success:true,
            message:'Product updated successfully',
            products,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:'Error while updating photo',
        });
    }
}

export const productFiltersController=async(req,res)=>{
    try {
        const {checked,radio}=req.body;
        let args={};
        if(checked.length>0) args.category=checked;
        if(radio.length) args.price={$gte:radio[0],$lte:radio[1]};
        const products=await Product.find(args);
        res.status(200).send({
            success:true,
            products,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:'Error while filtering photo',
        });
    }
}

export const productCountController=async(req,res)=>{
    try {
        const total=await Product.find({}).estimatedDocumentCount();
        res.status(200).send({
            success:true,
            total,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:'Error while filtering photo',
        });
    }
}

export const productListController=async(req,res)=>{
    try {
        const perPage=2;
        const page=req.params.page?req.params.page:1;
        const products=await Product.find({}).select('-photo').skip((page-1)*perPage).limit(perPage).sort({createdAt:-1});
        res.status(200).send({
            success:true,
            products,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:'Error in per page',
        });
    }
}