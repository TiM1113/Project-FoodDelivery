// Create the basic express server
// set up the express server
import express from "express"
import cors from "cors"
// DB connection has been imported from config file
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"




// app config
const app = express()
const port = 4000


// initialize the middleware
app.use(express.json())
app.use(cors())

// DB connection
connectDB();

// API endpoints
app.use("/api/food", foodRouter)


// use get() to request the data from the server
app.get("/",(req, res)=>{
  res.send("API Working")
})

// to start the express server
app.listen(port,()=>{
  console.log(`Server Started on http://localhost:${port}`)
})

// mongodb+srv://yuantian1113:Yt7517299879@cluster0.llnlj.mongodb.net/?