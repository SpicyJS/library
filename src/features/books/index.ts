import { Router } from "express";
import { v4 } from "uuid";

export type Book = {
  id: string;
  title: string;
  author: string;
  year: number;
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
        const { title, author, year } = req.body;
        const id = v4();
        const book = { id, title, author, year };
        db.add(book);
        res.status(201).end();
      });

      return router;
    },
  };
}

const books = [{ author: "Достоевский", title: "Преступления и наказание" }];
