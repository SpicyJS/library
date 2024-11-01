import express from "express";
import { createBookFeature } from "../features";
import { Book } from "../features/books/types";

function createDb() {
  const books: Book[] = [];
  return {
    getAll: async () => books,
    add: async (book: Book) => {
      books.push(book);
    },
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
