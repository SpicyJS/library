import { Router } from "express";
import { v4 } from "uuid";
import { Book } from "./types";
import { bookSchema } from "./types";
import { ZodError } from "zod";

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
        try {
          const book = req.body;
          bookSchema.parse(book);
          db.add(book);
          res.status(201).end();
        } catch (error) {
          const errorMessage = JSON.stringify(error.issues[0].message);
          res.status(400).send(errorMessage);
        }
      });

      return router;
    },
  };
}
