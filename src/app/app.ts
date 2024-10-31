import express from "express";
import { createBookFeature } from "../features";

export function createApp() {
  const app = express();

  app.get("/status", async (req, res) => {
    res.json({ status: "ready" });
  });

  const bookFeature = createBookFeature();

  app.use("/api/books", bookFeature.getRouter());

  return app;
}
