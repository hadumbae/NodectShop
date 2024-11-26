import {z} from "zod";
import {Types} from "mongoose";

export const ProductSKUSchema = z.object({
    _id: z.instanceof(Types.ObjectId),
    product: z.union([z.object({}), z.instanceof(Types.ObjectId)]),
    supplier: z.union([z.object({}), z.instanceof(Types.ObjectId)]),
    name: z.string(),
    code: z.string(),
    unitPrice: z.number(),
    unitStock: z.number(),
    reorderLevel: z.number(),
    shouldReorder: z.boolean(),
    isDiscontinued: z.boolean(),
    images: z.array(z.any()),
    options: z.array(z.any()),
})

export type ZProductSKU = z.infer<typeof ProductSKUSchema>;

export const ProductSKUDataSchema = z.object({
    product: z.string({
        required_error: "Product is required.",
        invalid_type_error: "Product must be a valid ID"
    }).min(1, "Product is required."),

    supplier: z.string({
        required_error: "Supplier is required.",
        invalid_type_error: "Supplier must be a valid ID"
    }).min(1, "Supplier is required."),

    name: z.string().min(1, "Name is required."),
    code: z.string().min(1, "Code is required."),

    unitPrice: z.number().gt(0, "Unit Price must be larger than 0."),
    unitStock: z.number().gt(0, "Unit Stock must be larger than 0."),
    reorderLevel: z.number().gt(0, "Reorder level must be larger than 0."),

    isDiscontinued: z.boolean({invalid_type_error: "Should Reorder must be a boolean."}).default(false),
}).transform(
    (sku) => ({...sku, shouldReorder: sku.unitStock < sku.reorderLevel})
);