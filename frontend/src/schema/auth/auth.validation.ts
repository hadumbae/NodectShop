import { z } from "zod";

export const LoginSubmitSchema = z.object({
    email: z.string({required_error: "Email is required.", invalid_type_error: "Invalid email type."}).email("Invalid email."),
    password: z.string({required_error: "Password is required.", invalid_type_error: "Invalid password type."}).min(1, "Password required!")
});

export type ZLoginSubmit = z.infer<typeof LoginSubmitSchema>