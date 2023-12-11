import Category from "../models/Category.js";
import slugify from "slugify";

export const createCategoryController=async(req,res)=>{
    try {
        const {name}=req.body;
        if(!name){
            return res.status(201).send({
                success:false,
                message:'Name is required!',
            });
        }
        const existingCategory=await Category.findOne({name});
        if(existingCategory){
            return res.status(200).send({
                success:true,       
                message:'Category already exists!',
            });
        }
        const category=await new Category({name,slug:slugify(name)}).save();
        res.status(201).send({
            success:true,
            message:'New Catagory Created',
            category,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:"Error in category",
        });
    }
}

export const updateCategoryController=async(req,res)=>{
    try {
        const {name}=req.body;
        const {id}=req.params;
        const category=await Category.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true});
        res.status(200).send({
            success:true,
            message:'Category updated successfully',
            category,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:"Error in updating category",
        });
    }
}

export const categoryController=async(req,res)=>{
    try {
        const category=await Category.find({});
        res.status(200).send({
            success:true,
            message:'All category list',
            category,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:"Error in fetching category",
        });
    }
}

export const singleCategoryController=async(req,res)=>{
    try {
        const category=await Category.findOne({slug:req.params.slug});
        res.status(200).send({
            success:true,
            message:'Single category',
            category,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:"Error in fetching single category",
        });
    }
}

export const deleteCategoryController=async(req,res)=>{
    try {
        const {id}=req.params   ;
        await Category.findByIdAndDelete(id);
        res.status(200).send({
            success:true,
            message:'Deleted category successfully',
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:"Error while deleting category",
        });
    }
}

