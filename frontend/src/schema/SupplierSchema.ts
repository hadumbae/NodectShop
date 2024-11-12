import {z} from 'zod';

export const SupplierSchema = z.object({

});

export type SupplierType = z.infer<typeof SupplierSchema>;