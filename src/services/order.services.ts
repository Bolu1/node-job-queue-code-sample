import { orders, Order, OrderDeliveryStatus } from "../models/order.models";
import moment from "moment";

class OrderService {
  // Check if an order is expired
  public static isExpired(order: Order): boolean {
    const now = moment();
    const orderCreatedAt = moment(order.createdAt);
    const diffInHours = now.diff(orderCreatedAt, "hours");

    return (
      order.OrderDeliveryStatus === OrderDeliveryStatus.PENDING &&
      diffInHours >= 2
    );
  }

  // Mark an order as expired
  public static async expireOrder(orderId: string): Promise<void> {
    try {
      const order = orders.find((o) => o.id === orderId);

      if (order && this.isExpired(order)) {
        order.OrderDeliveryStatus = OrderDeliveryStatus.EXPIRED;
        console.log(`Order ${orderId} marked as expired.`);
      }
    } catch (error) {
      console.error(`Error processing expiration for order ${orderId}:`, error);
    }
  }

  // Check and expire all orders
  public static async checkAndExpireOrders(): Promise<void> {
    try {
      console.log("Starting periodic check for expired orders...");

      orders.forEach((order) => {
        if (this.isExpired(order)) {
          order.OrderDeliveryStatus = OrderDeliveryStatus.EXPIRED;
          console.log(`Order ${order.id} marked as expired.`);
        }
      });
    } catch (error) {
      console.error("Error during periodic expiration check:", error);
    }
  }

  // Add a new order
  public static addOrder(order: Order): Order {
    orders.push(order);
    console.log(`Order ${order.id} added successfully.`);
    return order;
  }

  // Get all orders
  public static getOrders(): Order[] {
    return orders;
  }
}

export default OrderService;
