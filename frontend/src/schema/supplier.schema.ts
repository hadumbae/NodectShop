import {z} from 'zod';

export const SupplierContactPersonSchema = z.object({
    name: z.string(), title: z.string(), email: z.string(), phone: z.string(),
});

export const SupplierAddressSchema = z.object({
    street: z.string(), city: z.string(), state: z.string(), country: z.string(), postalCode: z.string()
});

export const SupplierSchema = z.object({
    _id: z.string().readonly(),
    name: z.string(),
    website: z.string(),
    contact: z.object({
        email: z.union([z.string(), z.null()]),
        phone: z.union([z.string(), z.null()]),
        fax: z.union([z.string(), z.null()]),
    }),
    address: SupplierAddressSchema,
    contactPersons: z.array(SupplierContactPersonSchema),
});


export type SupplierType = z.infer<typeof SupplierSchema>;

