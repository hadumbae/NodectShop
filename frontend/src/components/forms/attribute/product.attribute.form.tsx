import {FC} from 'react';

import {useForm} from "react-hook-form";
import {useMutation} from "@tanstack/react-query";
import {zodResolver} from "@hookform/resolvers/zod";

import {Form} from "@/components/ui/form.tsx";
import {Button} from "@/components/ui/button.tsx";
import FormFieldInput from "@/components/forms/FormFieldInput.tsx";

import {
    ProductAttributeSubmitSchema, ZProductAttribute,
    ZProductAttributeSubmit,
} from "@/schema/product-attribute/product.attribute.validation.ts";
import ProductAttributeService from "@/services/product/attribute/ProductAttributeService.ts";
import useAdminToken from "@/hooks/useAdminToken.ts";
import {FetchError} from "@/utils/CustomErrors.ts";
import {toast} from "react-toastify";

interface Props {
    className?: string;
    attribute?: ZProductAttribute;
    onSuccess: (attribute: ZProductAttribute) => void;
}

const ProductAttributeForm: FC<Props> = ({className = "", onSuccess, attribute}) => {
    const {token} = useAdminToken();
    const mutationKey = "create-product-attribute-submit";

    const form = useForm<ZProductAttributeSubmit>({
        resolver: zodResolver(ProductAttributeSubmitSchema),
        defaultValues: attribute ? { name: attribute.name } : {name: "" }
    });

    const {mutate} = useMutation({
        mutationKey: [mutationKey],
        mutationFn: async (values: ZProductAttributeSubmit) => {
            const {response, result} = attribute ?
                await ProductAttributeService.updateProductAttribute(attribute._id, values, token) :
                await ProductAttributeService.createProductAttribute(values, token);

            if (response.ok) return result.data;
            throw new FetchError(response, result.message, result.errors);
        },
        onSuccess: (result: ZProductAttribute) => {
            form.reset();
            toast.success("Product Attribute created.");
            onSuccess(result);
        },
        onError: (error: FetchError) => {
            if (error.errors) {
                for (const validationError of error.errors) {
                    form.setError(validationError.path, {type: "manual", message: validationError.msg});
                }
            }
        }
    });

    const onSubmit = (values: ZProductAttributeSubmit) => mutate(values);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={`flex flex-col space-y-2 ${className}`}>
                <FormFieldInput form={form} name="name" label="Name" type="text" />
                <Button
                    type="submit"
                    variant="default"
                    className="bg-primary w-full text-gray-600">
                    {attribute ? "Update" : "Create"}
                </Button>
            </form>
        </Form>
    );
};

export default ProductAttributeForm;
