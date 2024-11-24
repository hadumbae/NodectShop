import {FC, useState} from 'react';

import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {useMutation} from "@tanstack/react-query";
import {zodResolver} from "@hookform/resolvers/zod";

import {useDispatch} from "react-redux";
import {login, logout} from "@/state/slices/authUserSlice.ts";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button";
import {Form} from "@/components/ui/form.tsx";

import {LoginSubmitSchema, ZLoginSubmit} from "@/schema/auth/auth.validation.ts";
import FormFieldInput from "@/components/forms/FormFieldInput.tsx";
import AuthService from "@/services/auth/auth.service.ts";
import {FetchError} from "@/utils/CustomErrors.ts";
import {getExpiryDate} from "@/utils/TimeUtils.ts";

const LoginFormCard: FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);

    const form = useForm<ZLoginSubmit>({
        resolver: zodResolver(LoginSubmitSchema),
        defaultValues: {email: "", password: ""}
    });

    const {mutate} = useMutation({
        mutationKey: ["user-sign-in"],
        mutationFn: async (data: ZLoginSubmit) => {
            const {response, result} = await AuthService.login(data);

            if (response.ok) return result.data;
            throw new FetchError(response, result.message, result.errors);
        },
        onSuccess: (result) => {
            setError(null);

            dispatch(login({
                token: result.token,
                isAdmin: result.isAdmin,
                expiresIn: getExpiryDate(6).getTime()
            }));

            toast.success("Logged In Successfully!");
            return navigate("/auth/login/redirect");
        },
        onError: (error: FetchError) => {
            dispatch(logout());

            if (error.res.status === 400 || error.res.status === 404) {
                setError(error.message);
            }
        }
    });

    const onSubmit = (values: ZLoginSubmit) => {
        console.log(values);
        mutate(values);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">Sign In</CardTitle>
                        <CardDescription>Enter your credentials to sing in. Happy shopping!</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-5">
                        <FormFieldInput form={form} name="email" label="Email" type="text" />
                        <FormFieldInput form={form} name="password" label="Password" type="password" />

                        {error && <div className="text-center">
                            <span className="text-red-500">{error}</span>
                        </div>}
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" variant="default" className="bg-primary text-gray-600 w-full hover:text-white">Sign In</Button>
                    </CardFooter>
                </Card>
            </form>
        </Form>
    );
};

export default LoginFormCard;
