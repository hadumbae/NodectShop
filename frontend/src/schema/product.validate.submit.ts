import { z } from "zod";

const tagTransform = (input: any) => (!input || input === "") ? [] : input.toUpperCase().split(",");

export const ProductSubmitSchema = z.object({
    title: z.string({required_error: "Title is required.", invalid_type_error: "Title must be an error."}).min(1, "Title is required."),
    description: z.string({required_error: "Description is required.", invalid_type_error: "Description must be an error."}).min(1, "Description is required."),
    image: z.instanceof(File, {message: "Image is required."}),
    types: z.string().trim().optional().transform(tagTransform),
    tags: z.string().trim().optional().transform(tagTransform),
});

export type ProductSubmitType = z.infer<typeof ProductSubmitSchema>

export const ProductUpdateSchema = z.object({
    title: z.string({required_error: "Title is required.", invalid_type_error: "Title must be an error."}).min(1, "Title is required."),
    description: z.string({required_error: "Description is required.", invalid_type_error: "Description must be an error."}).min(1, "Description is required."),
    image: z.optional(z.instanceof(File, {message: "Image is required."})),
    types: z.string().trim().optional().transform(tagTransform),
    tags: z.string().trim().optional().transform(tagTransform),
});

export type ProductUpdateType = z.infer<typeof ProductUpdateSchema>