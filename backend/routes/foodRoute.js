import express from "express"
// import the addFood function from foodController.js
import { addFood } from "../controllers/foodController.js"
// Multer is a Node.js middleware used for handling multipart/form-data, which is primarily used for uploading files. It is often used in Express applications to allow users to upload files, such as images, videos, or other types of documents.
import multer from "multer"

const foodRouter = express.Router()


// Create one Image Storage Engine
const storage = multer.diskStorage({
  // name where you wanna store the image
  destination:"uploads",
  filename:(req, file, cb)=>{
    // cb = callback function
    return cb(null, `${Date.now()}${file.originalname}`)
  }
})

const upload = multer({storage:storage})

foodRouter.post("/add", upload.single("image"),addFood)




// set this router in server.js file
export default foodRouter;