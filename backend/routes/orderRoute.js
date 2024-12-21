import express from "express" // this express used for creating a router
import authMiddleware from "../middleware/auth.js"
// import placeOrder from orderController.js
import { placeOrder, userOrders, verifyOrder } from "../controllers/orderController.js"


// import { verify } from "jsonwebtoken";


// create a router using express, then using this router to create multiple end points
const orderRouter = express.Router();

// 1- place order end point
orderRouter.post("/place", authMiddleware, placeOrder);
// 2- place order verification end point
orderRouter.post("/verify", verifyOrder)

// 3- create end point for userOrders 
orderRouter.post("/userorders", authMiddleware, userOrders);

// export the place order router, and it will be used in service.js file
export default orderRouter;