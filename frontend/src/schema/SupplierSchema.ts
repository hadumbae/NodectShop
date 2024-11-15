import {z} from 'zod';

export const SupplierSchema = z.object({

    _id: z.optional(z.string()).readonly(),


});

export type SupplierType = z.infer<typeof SupplierSchema>;