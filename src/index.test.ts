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
    author: "J. K. Rowling",
    title: "Harry Potter and the Philosopher's Stone",
    year: 2014,
  };

  const result = await request(app).post("/api/books").send(book);

  console.log(result.body);

  deepEqual(result.status, 201);

  const getResult = await request(app).get("/api/books");
  console.log(getResult);

  const books = getResult.body.map((book) => {
    return {
      author: book.author,
      title: book.title,
      year: book.year,
    };
  });

  deepEqual(books, [book]);
});
