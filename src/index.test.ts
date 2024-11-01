import { deepEqual } from "node:assert/strict";
import test, { beforeEach } from "node:test";
import request from "supertest";
import { createApp } from "./app";
import { Book } from "./features";

let app;
beforeEach(() => {
  app = createApp();
});

test("Supertest works!", async () => {
  const result = await request(app).get("/status");

  deepEqual(result.status, 200);
  deepEqual(result.body, { status: "ready" });
});

test("GET /api/books", async () => {
  const result = await request(app).get("/api/books");

  deepEqual(result.status, 200);
  deepEqual(result.body, []);
});

test("POST /api/books", async () => {
  const book = {
    title: "Harry Potter and the Philosopher's Stone",
    author: "J.K. Rowling",
    genre: "Fantasy",
    publishedYear: 1997,
    isbn: "9780747532699",
    availability: "available",
    rentalInfo: null,
  };

  const result = await request(app).post("/api/books").send(book);
  deepEqual(result.status, 201);
  const getResult = await request(app).get("/api/books");
  const books = getResult.body;
  deepEqual(books, [book]);
});
