import { Router } from "express";

type Db = any;

export function createBookFeature(db: Db) {
  return {
    getRouter() {
      const router = Router();
      router.get("/", async (req, res) => {
        res.json(await db.getAll());
      });

      return router;
    },
  };
}

const books = [{ author: "Достоевский", title: "Преступления и наказание" }];
