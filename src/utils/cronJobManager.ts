import cron from "node-cron";
import OrderService from "../services/order.services";

class CronJobManager {
  public static initializeJobs(): void {
    cron.schedule("*/10 * * * *", async () => {
      console.log("Running periodic cron job to check expired orders...");
      await OrderService.checkAndExpireOrders();
    });
  }
}

export default CronJobManager;
