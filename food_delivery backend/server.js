import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import FoodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
// import 'dotenv/config';
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import { EventEmitter } from 'events';
EventEmitter.defaultMaxListeners = 20;

console.log("Stripe key:", process.env.STRIPE_SECRET_KEY);


// app config
const app = express();
const port = 4000;


// middleware

app.use(express.json());
app.use(cors());


// db connection 
connectDB();

//api endpoint
app.use("/api/food",FoodRouter)
app.use("/images" ,express.static('uploads'));
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)


app.get('/', (req,res) =>
{
    res.send("working");
})

app.listen(port,() =>
{
    console.log("server is running");
})

// mongodb+srv://22040010:Manisha_23@cluster0.omyxz7s.mongodb.net/? 



































