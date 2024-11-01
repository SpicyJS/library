import { title } from "process";
import z from "zod";
export type Book = z.infer<typeof bookSchema>

export const bookSchema = z.object({
  title: z.string(),
  author: z.string(),
  genre: z.string(),
  publishedYear: z.number(),
  isbn: z.string(),
  availability: z.string(),
  rentalInfo: z.null(),
});