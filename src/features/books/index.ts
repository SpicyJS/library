import { Router } from "express";

export function createBookFeature() {
  return {
    getRouter() {
      const router = Router();
      router.get("/", async (req, res) => {
        res.json([]);
      });

      return router;
    },
  };
}
