import { z } from "zod";

export const ProductImageSchema = z.object({
    secure_url: z.string(),
    public_id: z.string(),
});

export const ProductSchema = z.object({
    _id: z.string().readonly(),
    title: z.string(),
    types: z.array(z.string()),
    description: z.string(),
    image: ProductImageSchema,
    skus: z.array(z.any()),
    tags: z.array(z.string()),
});

export type ZProduct = z.infer<typeof ProductSchema>;