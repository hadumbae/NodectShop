import {FC} from 'react';
import {toast} from "react-toastify";
import {Loader} from "lucide-react";
import {useForm} from "react-hook-form";
import {useMutation} from "@tanstack/react-query";
import {zodResolver} from "@hookform/resolvers/zod";

import {Form} from "@/components/ui/form.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter} from "@/components/ui/card.tsx";

import FormFieldInput from "@/components/forms/FormFieldInput.tsx";
import FormFieldTextArea from "@/components/forms/FormFieldTextArea.tsx";
import FormFieldFileInput from "@/components/forms/FormFieldFileInput.tsx";

import useAdminToken from "@/hooks/useAdminToken.ts";
import {FetchError} from "@/utils/CustomErrors.ts";

import ProductService from "@/services/product/product.service.ts";
import {ZProduct} from "@/schema/product.validate.schema.ts";
import {ProductUpdateSchema, ProductUpdateType} from "@/schema/product.validate.submit.ts";

interface Props {
    onSuccess: (product: ZProduct) => void;
    product: ZProduct;
}

const ProductCreateForm: FC<Props> = ({onSuccess, product}) => {
    const {token} = useAdminToken();

    const form = useForm<ProductUpdateType>({
        resolver: zodResolver(ProductUpdateSchema),
        defaultValues: {
            title: product.title,
            description: product.description,
            types: product.types.join(", "),
            tags: product.tags.join(", "),
            image: undefined
        }
    });

    const {mutate, isPending} = useMutation({
        mutationKey: ['submit_single_product'],
        mutationFn: async (values: any) => {
            const {response, result} = await ProductService.updateProduct(product._id, values, token);

            if (response.ok) return result.data;
            throw new FetchError(response, result.message, result.errors);
        },
        onSuccess: (result) => {
            console.log(result);
            toast.success("Product updated successfully.");
            onSuccess(result);
        },
        onError: (error: FetchError) => {
            toast.error("Oops. Something bad happened!");
            console.error(error.message);

            if (error.errors) {
                for (const validationError of error.errors) {
                    form.setError(validationError.path, {type: "manual", message: validationError.msg});
                }
            }
        }
    });

    const onSubmit = (submitValues: ProductUpdateType) => {
        const data: any = new FormData();

        for (const key in submitValues) {
            if (key === "tags" || key === "types") {
                for (const val of submitValues[key as keyof ProductUpdateType]) {
                    data.append(`${key}[]`, val);
                }
            } else {
                data.append(key, submitValues[key as keyof ProductUpdateType]);
            }
        }

        if (!submitValues.image) data.delete("image");
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
                        <FormFieldInput form={form} name="types" label="Types" type="text" placeholder="Types (separate by commas)" />
                        <FormFieldTextArea form={form} name="description" label="Description" placeholder="Description" />
                        <FormFieldInput form={form} name="tags" label="Tags" type="text" placeholder="Tags (separate by commas)" />
                        <FormFieldFileInput form={form} name="image" label="Image" />
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" variant="default" className="bg-primary w-full text-gray-600 hover:text-white" disabled={isPending}>
                            {isPending ? <Loader className="animate-spin" /> : "Submit"}
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </Form>
    );
};

export default ProductCreateForm;
