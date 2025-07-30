import mongoose from "mongoose";

export const connectDB = async () =>
{
    await mongoose.connect('mongodb+srv://22040010:Manisha_23@cluster0.omyxz7s.mongodb.net/Tomato').then(() =>
    {
        console.log("DB CONNECTED")
    })
}





















