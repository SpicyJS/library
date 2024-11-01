import { deepEqual } from "node:assert/strict";
import test from "node:test";
import request from "supertest";
import { createApp } from "./app";

test("Supertest works!", async () => {
  const app = createApp();
  const result = await request(app).get("/status");

  deepEqual(result.status, 200);
  deepEqual(result.body, { status: "ready" });
});

test("GET /api/books", async () => {
  const app = createApp();
  const result = await request(app).get("/api/books");

  deepEqual(result.status, 200);
  deepEqual(result.body, []);
});
