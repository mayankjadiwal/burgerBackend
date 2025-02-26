import { response } from "express";
import foodModel from "../models/foodModel.js";
import fs from 'fs'


// add food items


const addFood = async (req, res) => {
    try {
        console.log("Request Body Debug:", req.body); // Debugging line
        console.log("Uploaded File Debug:", req.file); // Debugging line

        if (!req.body.price) {
            return res.json({ success: false, message: "Price is required" });
        }

        if (!req.file) {
            return res.json({ success: false, message: "Image upload failed. Make sure you are sending an image." });
        }

        let image_filename = req.file.filename;

        const food = new foodModel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,  // Ensure this is being received
            category: req.body.category,
            image: image_filename,
        });

        await food.save();
        res.json({ success: true, message: "Food Added" });

    } catch (error) {
        console.log("Error in addFood:", error);
        res.json({ success: false, message: "Error", error: error.message });
    }
};



//all food list
const listFood = async (req,res) => {
    try {
        const foods = await foodModel.find({});
        res.json({success:true,data:foods})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}


// remove food item
const removeFood = async ( req,res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`, ()=>{})

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true, message:"Food Removed"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})

    }
}

export {addFood, listFood, removeFood}