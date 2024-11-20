// Create the basic express server
// set up the express server
import express from "express"
import cors from "cors"




// app config
const app = express()
const port = 4000


// initialize the middleware
app.use(express.json())
app.use(cors())

// use get() to request the data from the server
app.get("/",(req, res)=>{
  res.send("API Working")
})

// to start the express server
app.listen(port,()=>{
  console.log(`Server Started on http://localhost:${port}`)
})