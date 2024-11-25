import z from "zod";
import {Types} from "mongoose";

export const ProductSchema =  z.object({
    _id: z.instanceof(Types.ObjectId),
    title: z.string(),
    description: z.string(),

    image: z.object({secure_url: z.string(), public_id: z.string()}),
    skus: z.array(z.union([z.object({}), z.instanceof(Types.ObjectId)])),

    types: z.array(z.string()),
    tags: z.array(z.string()),

    products: z.array(z.string()),
});

export type ZProduct = z.infer<typeof ProductSchema>

export const ProductDataSchema = z.object({
    title: z.string(),
    description: z.string(),
    types: z.array(z.string().trim()).optional().transform((input) => input.map((tag) => tag.toUpperCase())),
    tags: z.array(z.string().trim()).optional().transform((input) => input.map((tag) => tag.toUpperCase())),
})