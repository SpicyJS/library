import express from "express";

export function createApp() {
  const app = express();

  app.get("/status", async (req, res) => {
    res.json({ status: "ready" });
  });

  return app;
}
