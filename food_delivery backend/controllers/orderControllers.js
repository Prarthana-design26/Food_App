// This file contains the controller logic for order-related operations.
// It exports functions that will be used by the router (orderRoutes.js).
// It should NOT import orderRoutes.js.

import Stripe from 'stripe';
import dotenv from 'dotenv';
dotenv.config();
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";


// CRITICAL: Ensure dotenv.config() is called at the very top of your main server file (e.g., server.js)
// BEFORE this file is imported, so process.env.STRIPE_SECRET_KEY is defined.
if (!process.env.STRIPE_SECRET_KEY) {
  console.error("❌ ERROR: STRIPE_SECRET_KEY is not defined in environment variables.");
  console.error("Please ensure you have a .env file in your backend root with STRIPE_SECRET_KEY=your_key_here,");
  console.error("and that dotenv.config() is called at the very top of your server's entry file (e.g., server.js).");
  // In a production app, you might want to exit the process here to prevent further errors:
  // process.exit(1);
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


const placeOrder = async (req, res) => {
  console.log("Stripe key status for session creation:", process.env.STRIPE_SECRET_KEY ? "Loaded" : "Undefined");

  const frontend_url = "http://localhost:5173";

  try {
    console.log("📦 Incoming order request:", req.body);

    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });

    await newOrder.save();
    console.log("✅ Order saved:", newOrder._id);

    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });
    console.log("🛒 Cart cleared for user:", req.body.userId);

    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(item.price * 100), // Stripe expects amount in cents
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 2 * 100, // $2.00 for delivery
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: 'payment',
      success_url: `${frontend_url}/verify?orderId=${newOrder._id}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${frontend_url}/cancel?orderId=${newOrder._id}`,
    });

    console.log("✅ Stripe session created:", session.url);

    res.json({ success: true, session_url: session.url });

  } catch (error) {
    console.error("❌ Error placing order:", error);
    res.status(500).json({ success: false, message: "Something went wrong while placing the order. Please try again." });
  }
};

const verifyStripeSession = async (req, res) => {
  const { session_id, orderId } = req.body;

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status === "paid") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      console.log(`✅ Order ${orderId} payment status updated to paid.`);
      res.json({ success: true, message: "Payment verified successfully!" });
    } else {
      console.log(`⚠️ Payment for order ${orderId} is not completed. Current status: ${session.payment_status}`);
      res.json({ success: false, message: "Payment not completed." });
    }
  } catch (error) {
    console.error("❌ Stripe verify error:", error);
    res.status(500).json({ success: false, message: "Error verifying payment. Please try again." });
  }
};

//users order for frontend

const userOrders = async (req,res) =>
{
    try
    {
        const orders = await orderModel.find({userId :req.body.userId});
        res.json({success:true,data:orders});
    }
    catch(error)
    {
        console.log(error);
        res.json({success:false,message:"Error"})
    }

}

// Listing orders fro admin panel

const listOrders = async (req,res) =>
{
  try{

    const orders = await orderModel.find({});
    res.json({success:true,data:orders});
  }
  catch(error)
  {
    console.log(error);
    res.json({success:false,message:"Error"})
  }


}
const updateStatus = async (req, res) => {
  try {
    console.log("Updating Order:", req.body.orderId, "to Status:", req.body.status);

    const updatedOrder = await orderModel.findByIdAndUpdate(
      req.body.orderId,
      { status: req.body.status },
      { new: true } // ✅ Ensure you get the updated document
    );

    if (!updatedOrder) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    console.log("✅ Updated Order:", updatedOrder);

    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.error("❌ Error updating status:", error);
    res.status(500).json({ success: false, message: "Error updating status" });
  }
};

export { placeOrder, verifyStripeSession,userOrders,listOrders,updateStatus};
