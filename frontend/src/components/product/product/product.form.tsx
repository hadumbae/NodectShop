import {FC} from 'react';

import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {ProductSubmitSchema, ProductSubmitType} from "@/schema/product.zod.ts";

import {Form} from "@/components/ui/form.tsx";
import {Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import FormFieldInput from "@/components/forms/FormFieldInput.tsx";
import FormFieldTextArea from "@/components/forms/FormFieldTextArea.tsx";
import FormFieldFileInput from "@/components/forms/FormFieldFileInput.tsx";
import {useMutation} from "@tanstack/react-query";
import ProductService from "@/services/product/product.service.ts";
import useAdminToken from "@/hooks/useAdminToken.ts";
import {FetchError} from "@/utils/CustomErrors.ts";

const ProductForm: FC = () => {
    const {token} = useAdminToken();

    const form = useForm<ProductSubmitType>({
        resolver: zodResolver(ProductSubmitSchema),
        defaultValues: {title: "", description: "", types: "", tags: "", image: undefined}
    });

    const {mutate} = useMutation({
        mutationKey: ['submit_single_product'],
        mutationFn: async (values: any) => {
            const {response, result} = await ProductService.createProduct(values, token);

            if (response.ok) return result.data;
            throw new FetchError(response, result.message, result.errors);
        },
        onSuccess: (result) => {
            console.log(result);
        },
        onError: (error: FetchError) => {
            console.log(error.errors);
        }
    });

    const onSubmit = (values: ProductSubmitType) => {
        const data: any = new FormData();

        for (let key in values) {
            data.append(key, values[key as keyof ProductSubmitType]);
        }

        mutate(data);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <Card>
                    <CardHeader>
                        <CardTitle>Create Product</CardTitle>
                        <CardDescription>Create your products here.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-5">
                        <FormFieldInput form={form} name="title" label="Title" type="text" placeholder="Title" />
                        <FormFieldInput form={form} name="types" label="Types (separate by commas)" type="text" placeholder="Types" />
                        <FormFieldTextArea form={form} name="description" label="Description" placeholder="Description" />
                        <FormFieldInput form={form} name="tags" label="Tags (separate by commas)" type="text" placeholder="Tags" />
                        <FormFieldFileInput form={form} name="image" label="Image" />
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" variant="default" className="bg-primary w-full text-gray-600 hover:text-white">Submit</Button>
                    </CardFooter>
                </Card>
            </form>
        </Form>
    );
};

export default ProductForm;
