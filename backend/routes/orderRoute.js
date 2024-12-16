import express from "express" // this express used for creating a router
import authMiddleware from "../middleware/auth.js"
// import placeOrder from orderController.js
import { placeOrder } from "../controllers/orderController.js"

// create a router using express, then using this router to create multiple end points
const orderRouter = express.Router();

// 1- place order end point
orderRouter.post("/place", authMiddleware, placeOrder);

// export the place order router, and it will be used in service.js file
export default orderRouter;