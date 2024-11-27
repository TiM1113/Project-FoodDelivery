// This is an API
import foodModel from '../models/foodModel.js';

// importing the fs (file system) module in Node.js.import fs like this, it allows you to use file-related operations such as:
// Reading files.
// Writing to files.
// Deleting files.
// Renaming files.
// Creating directories, etc.
import fs from 'fs';

// All business logic should be presented in controller functions.
// add food item (this is a controller)
const addFood = async (req, res) => {
	// Log the request file and body for debugging
	console.log(req.file); // To see if the file is received
	console.log(req.body); // To check if the other form data is received

	// Get both filename and path

	try {
		let image_filename = `${req.file.filename}`;

		const food = new foodModel({
			name: req.body.name,
			description: req.body.description,
			price: req.body.price,
			category: req.body.category,
			image: image_filename, // Store the full path instead of just filename
		});
		await food.save();
		res.json({success: true, message: 'Food Added'});
	} catch (error) {
		console.log(error);
		res.json({success: false, message: 'Error'});
	}
};

// All food list
// Food list API endpoint
const listFood = async (req, res) => {
	try {
		// Using foodModel model to fitch all the food items
		const foods = await foodModel.find({});
		// Create one response using the Json object
		res.json({success: true, data: foods});
	} catch (error) {
		console.log(error);
		res.json({success: false, message: 'Error'});
	}
};

//Remove food items
const removeFood = async (req, res) => {
	try {
		// read id from the post request
		const food = await foodModel.findById(req.body.id);
		// delete the according id files(images) in uploads folder
    // Should be extremely mind that `uploads/${food.image}` is used backticks(``) instead of single quotes('').
		fs.unlink(`uploads/${food.image}`, () => {});

		await foodModel.findByIdAndDelete(req.body.id);
		res.json({success: true, message: 'Food Removed'});
	} catch (error) {
		console.log(error);
		res.json({success: false, message: 'Error'});
	}
};

// New solution of Remove food items
// import { unlink } from 'fs/promises';

// const removeFood = async (req, res) => {
//     try {
//         // read id from the post request
//         const food = await foodModel.findById(req.body.id);
        
//         // First check if food exists
//         if (!food) {
//             return res.json({ success: false, message: 'Food item not found' });
//         }

//         // delete the file from uploads folder
//         try {
//             await unlink(`uploads/${food.image}`);
//         } catch (unlinkError) {
//             console.log('Error deleting file:', unlinkError);
//             // Continue execution even if file deletion fails
//         }

//         // delete from database
//         await foodModel.findByIdAndDelete(req.body.id);
//         res.json({ success: true, message: 'Food Removed' });
        
//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: 'Error' });
//     }
// };

export default removeFood;

// Pass the addFood function into export
// Pass the above listFood function into export
export {addFood, listFood, removeFood};
