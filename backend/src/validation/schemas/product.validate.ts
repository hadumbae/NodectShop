import z from "zod";
import {Types} from "mongoose";

export const ProductSchema =  z.object({
    _id: z.instanceof(Types.ObjectId),
    title: z.string(),
    type: z.union([z.null(), z.string()]),
    description: z.string(),
    image: z.object({secure_url: z.string(), public_id: z.string()}),
    category: z.union([z.object({}), z.instanceof(Types.ObjectId)]),
    skus: z.array(z.union([z.object({}), z.instanceof(Types.ObjectId)])),
    tags: z.array(z.string()),
});

export const ProductDataSchema = z.object({
    title: z.string(),
    type: z.optional(z.string()),
    description: z.string(),
    category: z.optional(z.string()),
    tags: z.optional(z.array(z.string())),
})