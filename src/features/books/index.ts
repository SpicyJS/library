import { Router } from "express";
import { v4 } from "uuid";

export type Book = {
  title: string;
  author: string;
  genre: string;
  publishedYear: number;
  isbn: string;
  availability: string;
  rentalInfo: null;
};

type Db = {
  getAll: () => Promise<Book[]>;
  add: (book: Book) => Promise<void>;
};

export function createBookFeature(db: Db) {
  return {
    getRouter() {
      const router = Router();
      router.get("/", async (req, res) => {
        res.json(await db.getAll());
      });

      router.post("/", async (req, res) => {
        const book = req.body;
        db.add(book);
        res.status(201).end();
      });

      return router;
    },
  };
}
