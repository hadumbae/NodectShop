import { z } from "zod";

export const ProductSKUSubmitSchema = z.object({
    supplier: z.string({
        required_error: "Supplier is required.",
        invalid_type_error: "Supplier must be a valid ID"
    }).min(1, "Supplier is required."),

    name: z.string().min(1, "Name is required."),
    code: z.string().min(1, "Code is required."),

    unitPrice: z.coerce.number().gt(0, "Unit Price must be larger than 0."),
    unitStock: z.coerce.number().gt(0, "Unit Stock must be larger than 0."),
    reorderLevel: z.coerce.number().gt(0, "Reorder level must be larger than 0."),

    shouldReorder: z.boolean({invalid_type_error: "Should Reorder must be a boolean."}).default(false),
    isDiscontinued: z.boolean({invalid_type_error: "Is Discontinued must be a boolean."}).default(false),
});

export type ProductSKUSubmitType = z.infer<typeof ProductSKUSubmitSchema>;