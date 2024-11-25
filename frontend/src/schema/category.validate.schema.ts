import {z} from "zod";

export const CategoryZod = z.object({
    _id: z.string().readonly(),
    category: z.string().min(3, "Category must be at least 3 characters long."),

    mode: z.string().optional(),
    modeTypes: z.array(z.string()),
    modeTags: z.array(z.string()),

    products: z.array(z.object({})),
    attributes: z.array(z.object({})),

    productCount: z.optional(z.number()),
});

export type ZCategory = z.infer<typeof CategoryZod>;