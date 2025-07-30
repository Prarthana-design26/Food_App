import express from 'express';
import authMiddleware from '../middlewares/auth.js'; // Assuming you have an authMiddleware
import { placeOrder, verifyStripeSession ,userOrders, listOrders, updateStatus} from '../controllers/orderControllers.js';

const orderRouter = express.Router();

// Route to place a new order. It uses authMiddleware to protect the route.
orderRouter.post("/place", authMiddleware, placeOrder);

// Route to verify the Stripe session.
// Removed authMiddleware as per original code, but consider if this route should be protected.
// For a production app, you might want to add a webhook endpoint for Stripe to verify payments securely.
orderRouter.post("/verify-session", verifyStripeSession); 
orderRouter.post("/userorders",authMiddleware,userOrders)
orderRouter.get("/list",listOrders)
orderRouter.post("/status",updateStatus);

export default orderRouter;
