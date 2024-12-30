import express, { Application } from "express";
import orderRoutes from "./routes/order.routes";
import BullQueueManager from "./utils/bullQueueManager";
import CronJobManager from "./utils/cronJobManager";

const app: Application = express();

app.use(express.json());

BullQueueManager.initializeJobs();
CronJobManager.initializeJobs();

// Routes
app.use("/api/orders", orderRoutes);

export default app;
