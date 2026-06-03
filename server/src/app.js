import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import serviceRoutes from "./routes/service.routes.js";
import jobRoutes from "./routes/job.routes.js";
import reviewRoutes from "./routes/review.routes.js";
import bookingRoutes from "./routes/booking.routes.js";
import queryRoutes from "./routes/query.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import workflowRoutes from "./routes/workflow.routes.js";
import trustedClientRoutes from "./routes/trustedClient.routes.js";
import pricingPlanRoutes from "./routes/pricingPlan.routes.js";
import employeeRoutes from "./routes/employee.routes.js";
import { errorHandler, notFound } from "./middleware/error.js";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true
  })
);
app.use(express.json({ limit: "2mb" }));

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/queries", queryRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/workflow-steps", workflowRoutes);
app.use("/api/trusted-clients", trustedClientRoutes);
app.use("/api/pricing-plans", pricingPlanRoutes);
app.use("/api/employees", employeeRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
