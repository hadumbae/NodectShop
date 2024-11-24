import { z } from "zod";

export const ProductImageSchema = z.object({
    secure_url: z.string(),
    public_id: z.string(),
});

export const ProductSchema = z.object({
    _id: z.optional(z.string()).readonly(),
    title: z.string(),
    types: z.optional(z.string()),
    description: z.string(),
    image: ProductImageSchema,
    skus: z.array(z.any()),
    tags: z.array(z.string()),
});

export type ZProduct = z.infer<typeof ProductSchema>;

const tagTransform = (input: any) => (!input || input === "") ? [] : input.split(",");

export const ProductSubmitSchema = z.object({
    title: z.string({required_error: "Title is required.", invalid_type_error: "Title must be an error."})
        .min(1, "Title is required."),

    description: z.string({required_error: "Description is required.", invalid_type_error: "Description must be an error."})
        .min(1, "Description is required."),

    image: z.instanceof(File, {message: "Image is required."}),
    types: z.string().trim().optional().transform(tagTransform),
    tags: z.string().trim().optional().transform(tagTransform),
});

export type ProductSubmitType = z.infer<typeof ProductSubmitSchema>