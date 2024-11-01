import express from "express";
import { createBookFeature } from "../features";

export function createApp() {
  const app = express();

  app.get("/status", async (req, res) => {
    res.json({ status: "ready" });
  });

  const db = { getAll: async () => [] };
  const bookFeature = createBookFeature(db);

  app.use("/api/books", bookFeature.getRouter());

  return app;
}
