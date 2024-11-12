import {z} from "zod";

export const CategorySchema = z.object({
    _id: z.optional(z.string()).readonly(),
    category: z.string().min(3, "Category must be at least 3 characters long.")
});

export type CategoryType = z.infer<typeof CategorySchema>;