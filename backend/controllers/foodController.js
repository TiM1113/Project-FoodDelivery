// This is an API
import foodModel from '../models/foodModel.js';

// importing the fs (file system) module in Node.js.import fs like this, it allows you to use file-related operations such as:
// Reading files.
// Writing to files.
// Deleting files.
// Renaming files.
// Creating directories, etc.
import fs from 'fs';

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

export {addFood};
