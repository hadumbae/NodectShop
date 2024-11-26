import {z} from "zod";
import {SupplierSchema} from "@/schema/supplier.validate.schema.ts";
import {ProductSchema} from "@/schema/product.validate.schema.ts";

export const ProductSKUSchema = z.object({
    _id: z.string().readonly(),
    product: ProductSchema,
    supplier: SupplierSchema,
    name: z.string(),
    code: z.string(),

    unitPrice: z.number(),
    unitStock: z.number(),
    reorderLevel: z.number(),

    shouldReorder: z.boolean(),
    isDiscontinued: z.boolean(),

    options: z.array(
        z.union(
            [
                z.string().readonly(),
                z.object(
                    {
                        _id: z.string().readonly(),
                        name: z.string()
                    }
                )
            ]
        )
    ),

    images: z.array(
        z.object(
            {
                _id: z.string().readonly(),
                isPrimary: z.boolean(),
                secure_url: z.string(),
                public_id: z.string()
            }
        )
    ),
})

export type ZProductSKU = z.infer<typeof ProductSKUSchema>;