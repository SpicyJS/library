import { Router } from "express";

type Pancake = unknown;
type Db = {
  getAll: () => Promise<Pancake[]>;
};

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
