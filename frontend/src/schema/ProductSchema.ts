import z from "zod";
import {CategorySchema} from "@/schema/CategorySchema.ts";

export const ProductImageSchema = z.object({
    secure_url: z.string(),
    public_id: z.string(),
});

export const ProductSchema = z.object({
    _id: z.optional(z.string()).readonly(),
    title: z.string(),
    type: z.optional(z.string()),
    description: z.string(),
    image: ProductImageSchema,
    category: z.optional(CategorySchema),
    skus: z.array(z.any()),
    tags: z.array(z.string()),
});

export type ProductType = z.infer<typeof ProductSchema>;