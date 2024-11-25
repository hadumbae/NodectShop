import {z} from 'zod';

export const SupplierSchema = z.object({
    _id: z.string().readonly(),
    name: z.string(),
    website: z.string(),
    contact: z.object({
        email: z.union([z.string(), z.null()]),
        phone: z.union([z.string(), z.null()]),
        fax: z.union([z.string(), z.null()]),
    }),
    address: z.object({
        street: z.string(),
        city: z.string(),
        state: z.string(),
        country: z.string(),
        postalCode: z.string()
    }),
    contactPersons: z.array(
        z.object({
            name: z.string(),
            title: z.string(),
            email: z.string(),
            phone: z.string(),
        })
    ),
});


export type ZSupplier = z.infer<typeof SupplierSchema>;

