import express from "express";
import { createBookFeature } from "../features";

function createDb() {
  return {
    getAll: async () => [],
  };
}

export function createApp() {
  const app = express();
  app.use(express.json());

  app.get("/status", async (req, res) => {
    res.json({ status: "ready" });
  });

  const db = createDb();
  const bookFeature = createBookFeature(db);

  app.use("/api/books", bookFeature.getRouter());

  return app;
}
