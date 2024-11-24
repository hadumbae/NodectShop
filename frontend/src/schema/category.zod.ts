import {z} from "zod";

export const CategoryZod = z.object({
    _id: z.string().readonly(),
    category: z.string().min(3, "Category must be at least 3 characters long."),
    mode: z.string().optional(),
    modeType: z.union([z.null(), z.string()]),
    modeTags: z.array(z.string()),
    products: z.array(z.object({})),
    attributes: z.array(z.object({})),

    productCount: z.optional(z.number()),
});

export type ZCategory = z.infer<typeof CategoryZod>;

export const CategorySubmitSchema = z.object({
    category: z.string().min(3, "Category must be at least 3 characters long."),
    mode: z.string().optional(),
    modeType: z.string().optional(),
    modeTags: z.string().optional(),
}).superRefine((input: any, ctx: any) => {
    if (input.mode === "TYPE" && (!input.modeType || input.modeType === "")) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['modeType'],
            message: 'Mode Type is required!'
        })
    }

    if (input.mode === "TAGS" && (!input.modeTags || input.modeTags === "")) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['modeTags'],
            message: 'Mode Tags is required!'
        })
    }
});

export type CategorySubmitType = z.infer<typeof CategorySubmitSchema>;
