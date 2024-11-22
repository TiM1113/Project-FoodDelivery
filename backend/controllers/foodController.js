// This is an API
import foodModel from "../models/foodModel.js";

// importing the fs (file system) module in Node.js.import fs like this, it allows you to use file-related operations such as:
// Reading files.
// Writing to files.
// Deleting files.
// Renaming files.
// Creating directories, etc.
import fs from 'fs'

// add food item (this is a controller)
const addFood = async(req, res) => {

  
// Get both filename and path
  let image_filename = req.file ? `${req.file.filename}` : null;

  const food = new foodModel({
    name:req.body.name,
    description:req.body.description,
    price:req.body.price,
    category:req.body.category,
    image:`uploads/${req.file.filename}` // Store the full path instead of just filename
  })

  try{
    await food.save();
    res.json({success: true, message: "Food Added"})
  }
  catch(error){
    console.log(error)
    res.json({success:false, message:"Error"})
  }

}

export {addFood}