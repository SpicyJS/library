import { Router } from "express";
import { v4 } from "uuid";
import { Book } from "./types";
import { bookSchema } from "./types";


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
        bookSchema.parse(book)
        db.add(book);
        res.status(201).end();
      });

      return router;
    },
  };
}
