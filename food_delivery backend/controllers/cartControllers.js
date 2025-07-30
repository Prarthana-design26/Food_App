import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';

// Add item to cart
const addToCart = async (req, res) => {

    try {
        const userId = req.body.userId; // Now directly use the ID set by middleware
        console.log("Received itemId:", req.body.itemId);
        console.log("User ID:", userId);

        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const cartData = userData.cartData || {};

        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        } else {
            cartData[req.body.itemId] += 1;
        }

        await userModel.findByIdAndUpdate(userId, { cartData });

        res.json({ success: true, message: "Item added successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server error", error });
    }
};

const removeFromCart = async (req, res) => {

    try{
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if(cartData[req.body.itemId]>0)
        {
            cartData[req.body.itemId]--;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:"Removed from cart"})
        }
    catch(error)
    {
        console.log(error);
        res.json({success:false,message:"Error"})
    }

}

const getCart = async (req, res) => {

    try{
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        res.json({success:true,cartData})
    }
    catch(error)
    {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
    
}

export {addToCart,removeFromCart,getCart};