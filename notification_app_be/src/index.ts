import express from "express";
import cors from "cors";
import { Log, configureLogger } from "logging-middleware";
import { notificationRouter } from "./routes/notifications";

if (process.env.LOGGER_TOKEN) {
  configureLogger(process.env.LOGGER_TOKEN);
}

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use("/api/notifications", notificationRouter);

app.get("/api/health", (_req, res) => {
  Log("backend", "debug", "route", "Health check endpoint called");
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  Log("backend", "info", "service", `Server started on port ${PORT}`);
});
