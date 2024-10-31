import { deepEqual } from "node:assert/strict";
import test from "node:test";
import express from "express";
import request from "supertest";

test("Supertest works!", async () => {
  const app = express();

  app.get("/status", async (req, res) => {
    res.json({ status: "ready" });
  });

  const result = await request(app).get("/status");

  deepEqual(result.status, 200);
  deepEqual(result.body, { status: "ready" });
});
