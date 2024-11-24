import {z} from "zod";

export const ProductAttributeSchema = z.object({
    _id: z.string().readonly(),
    name: z.string(),
    options: z.array(z.any()),
});

export type ZProductAttribute = z.infer<typeof ProductAttributeSchema>;

export const ProductAttributeSubmitSchema = z.object({
    name: z.string({required_error: "Attribute name is required.", invalid_type_error: "Attribute name must be a string."})
        .min(1, "Attribute name is required."),
});

export type ZProductAttributeSubmit = z.infer<typeof ProductAttributeSubmitSchema>