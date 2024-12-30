import Bull from "bull";
import { BullQueues } from "../models/order.models";
import OrderService from "../services/order.services";

class BullQueueManager {
  private static expirationQueue = new Bull(BullQueues.ORDER_EXPIRATION_QUEUE);

  public static initializeJobs(): void {
    this.expirationQueue.process(10, async (job: any) => {
      const { orderId } = job.data;
      await OrderService.expireOrder(orderId);
    });

    console.log("🐂🐂🐂 Bull Queue for order expiration initialized. 🐂🐂🐂");
  }

  public static async pushOrderToQueue(orderId: string): Promise<void> {
    try {
      this.expirationQueue.add(
        { orderId },
        {
          delay: 2 * 60 * 60 * 1000, // 2 hours
          jobId: orderId,
          removeOnComplete: true,
          removeOnFail: true,
        }
      );

      console.log(`Scheduled expiration job for order ${orderId}`);
    } catch (error) {
      console.error(
        `Failed to schedule expiration job for order ${orderId}:`,
        error
      );
    }
  }

  public static async removeOrderFromExpirationQueue(
    orderId: string
  ): Promise<void> {
    try {
      const job = await this.expirationQueue.getJob(orderId); // Fetch job by ID
      if (job) {
        await job.remove(); // Remove the job from the queue
        console.log(`Removed expiration job for order ${orderId}`);
      } else {
        console.log(`No expiration job found for order ${orderId}`);
      }
    } catch (error) {
      console.error(
        `Failed to remove expiration job for order ${orderId}:`,
        error
      );
    }
  }
}

export default BullQueueManager;
