import { Router } from "express";
import { v4 as uuidv4 } from "uuid";
import OrderService from "../services/order.services";
import BullQueueManager from "../utils/bullQueueManager";
import { OrderDeliveryStatus } from "../models/order.models";

const router = Router();

// Create a new order
router.post("/", async (req, res) => {
  const order = {
    id: uuidv4(),
    details: req.body.details,
    createdAt: new Date(),
    OrderDeliveryStatus: OrderDeliveryStatus.PENDING,
  };

  const createdOrder = OrderService.addOrder(order);
  await BullQueueManager.pushOrderToQueue(order.id);

  res.status(201).json({
    success: true,
    message: "Order created successfully",
    data: createdOrder
  });
});

// Get all orders
router.get("/", (req, res) => {
  const orders = OrderService.getOrders();
  res.json(orders);
});

export default router;
