import {z} from 'zod';

// Types

const EmptyString = z
    .union([z.string().length(0), z.string().min(1, "Must not be empty.")])
    .optional()
    .transform(input =>  input === "" ? undefined : input);

const EmptyEmail = z
    .union([z.string().length(0, "Must be a valid email."), z.string().email("Must be a valid email.")])
    .optional()
    .transform(input => input === "" ? undefined : input );

// Submit Schema

export const SupplierContactSubmitSchema = z.object({
    email: EmptyEmail,
    phone: EmptyString,
    fax: EmptyString
});

export const SupplierContactPersonSubmitSchema = z.object({
    name: z.string().min(1, "name is required."),
    title: z.string().min(1, "title is required."),
    email: z.string().min(1, "email is required.").email("Must be a valid email."),
    phone: z.string().min(1, "phone is required."),
});

export const SupplierAddressSubmitSchema = z.object({
    street: z.string().min(1, "Street is required."),
    city: z.string().min(1, "City is required."),
    state: z.string().min(1, "State is required."),
    country: z.string().min(1, "Country is required."),
    postalCode: z.string().min(1, "Postal Code is required."),
});

export const SupplierSubmitSchema = z.object({
    name: z.string().min(1, "Name is required."),
    website: z.string().min(1, "Website is required.").url(),
    contact: SupplierContactSubmitSchema,
    address: SupplierAddressSubmitSchema
});

export type SupplierSubmitType = z.infer<typeof SupplierSubmitSchema>;
export type SupplierContactSubmitType = z.infer<typeof SupplierContactSubmitSchema>;
export type SupplierContactPersonSubmitType = z.infer<typeof SupplierContactPersonSubmitSchema>;
export type SupplierAddressSubmitType = z.infer<typeof SupplierAddressSubmitSchema>;