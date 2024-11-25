import {z} from "zod";
import {transformCommaStringToArray} from "@/utils/FormUtils.ts";

export const CategorySubmitSchema = z.object({
    category: z.string().min(3, "Category must be at least 3 characters long."),
    mode: z.string().min(1, "Mode is required."),
    modeTypes: z.string().trim(),
    modeTags: z.string().trim(),
}).transform((category: any) => ({
    ...category,
    modeTypes: transformCommaStringToArray(category.modeTypes),
    modeTags: transformCommaStringToArray(category.modeTags),
}));

export type CategorySubmitType = z.infer<typeof CategorySubmitSchema>;
