import { FC } from 'react';
import {ZSupplier} from "@/schema/supplier.validate.schema.ts";
import {useForm} from "react-hook-form";
import {ProductSKUSubmitSchema, ProductSKUSubmitType} from "@/schema/product.sku.validate.submit.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form} from "@/components/ui/form.tsx";
import {Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useMutation} from "@tanstack/react-query";
import ProductSKUService from "@/services/product/sku/ProductSKUService.ts";
import useAdminToken from "@/hooks/useAdminToken.ts";
import {FetchError} from "@/utils/CustomErrors.ts";
import {useNavigate} from "react-router-dom";
import FormFieldInput from "@/components/forms/FormFieldInput.tsx";
import FormFieldCheckboxInput from "@/components/forms/FormFieldCheckboxInput.tsx";
import FormFieldSelectInput from "@/components/forms/FormFieldSelectInput.tsx";
import {SelectItem} from "@/components/ui/select.tsx";
import {ZProductSKU} from "@/schema/product.sku.validate.schema.ts";
import {Loader} from "lucide-react";

interface Props {
    productID: string;
    productSlug: string;
    suppliers: ZSupplier[];
    sku: ZProductSKU;
}

const ProductSKUForm: FC<Props> = ({productID, productSlug, suppliers, sku}) => {
    const {token} = useAdminToken();
    const navigate = useNavigate();

    const form = useForm<ProductSKUSubmitType>({
        resolver: zodResolver(ProductSKUSubmitSchema),
        defaultValues: sku ?
            {
                supplier: sku.supplier._id,
                name: sku.name,
                code: sku.code,
                unitPrice: sku.unitPrice,
                unitStock: sku.unitStock,
                reorderLevel: sku.reorderLevel,
                isDiscontinued: sku.isDiscontinued,
            } :
            {
                supplier: "",
                name: "",
                code: "",
                unitPrice: 0,
                unitStock: 0,
                reorderLevel: 0,
                isDiscontinued: false,
            }
    });

    const {mutate, isPending} = useMutation({
        mutationKey: ["submit_single_product_sku"],
        mutationFn: async (values: any) => {
            const {response, result} = sku ?
                await ProductSKUService.updateProductSKU(productID, sku._id, values, token):
                await ProductSKUService.createProductSKU(productID, values, token);

            if (response.ok) return result.data;
            throw new FetchError(response, result.message, result.errors);
        },
        onSuccess: () => navigate(`/admin/product/find/${productID}/${productSlug}`),
        onError: (error: FetchError) => {
            if (error.errors) {
                for (const validationError of error.errors) {
                    form.setError(validationError.path, {type: "manual", message: validationError.msg});
                }
            }
        }
    });

    const onSubmit = (values: ProductSKUSubmitType) => mutate(values);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <Card>
                    <CardHeader>
                        <CardTitle>Create Product SKU</CardTitle>
                        <CardDescription>Create Product SKUs here. Click on submit to continue.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <FormFieldSelectInput form={form} name="supplier" label="Supplier" placeholder="Select a supplier.">
                            {
                                suppliers.map(
                                    (supplier) =>
                                        <SelectItem
                                            key={supplier._id}
                                            value={supplier._id}
                                        >
                                            {supplier.name}
                                        </SelectItem>
                                )
                            }
                        </FormFieldSelectInput>

                        <FormFieldInput form={form} name="name" label="Name" placeholder="Name" />
                        <FormFieldInput form={form} name="code" label="Code" placeholder="Code" />
                        <FormFieldInput form={form} type="number" name="unitPrice" label="Unit Price" placeholder="Unit Price" />
                        <FormFieldInput form={form} type="number" name="unitStock" label="Unit Stock" placeholder="Unit Stock" />
                        <FormFieldInput form={form} type="number" name="reorderLevel" label="Reorder Level" placeholder="Reorder Level" />
                        <FormFieldCheckboxInput form={form} name="isDiscontinued" label="Is Discontinued?" />
                    </CardContent>
                    <CardFooter>
                        <Button
                            type="submit"
                            variant="default"
                            className="bg-primary text-gray-600 w-full"
                            disabled={isPending}
                        >
                            {isPending ? <Loader className="animate-spin" /> : "Submit"}
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </Form>
    );
};

export default ProductSKUForm;
