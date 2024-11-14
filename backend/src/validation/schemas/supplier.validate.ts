import z from "zod";

export const ContactPersonDataSchema = z.object({
    name: z.string(),
    title: z.string(),
    email: z.string().email(),
    phone: z.string(),
});

export type ContactPersonType = z.infer<typeof  ContactPersonDataSchema>
