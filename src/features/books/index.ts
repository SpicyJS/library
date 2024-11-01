import { Router } from "express";

type Book = unknown;
type Db = {
  getAll: () => Promise<Book[]>;
};

export function createBookFeature(db: Db) {
  return {
    getRouter() {
      const router = Router();
      router.get("/", async (req, res) => {
        res.json(await db.getAll());
      });

      router.post("/", async (req, res) => {
        res.json({ id: -1 });
      });

      return router;
    },
  };
}

const books = [{ author: "Достоевский", title: "Преступления и наказание" }];
