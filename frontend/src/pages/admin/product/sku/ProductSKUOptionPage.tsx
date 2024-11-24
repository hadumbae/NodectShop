import {FC, useEffect, useState} from 'react';
import useAdminToken from "../../../../hooks/useAdminToken.ts";
import useFetchProductAttributes from "../../../../hooks/attribute/useFetchProductAttributes.ts";
import useFetchProductSKU from "../../../../hooks/product/useFetchProductSKU.ts";
import useProductSKUParam from "../../../../hooks/product/useProductSKUParam.ts";
import HeaderText from "../../../../components/header/HeaderText.tsx";
import PageHeaderLink from "../../../../components/navigation/page.header.link.tsx";
import ProductSKUOptionList from "../../../../components/product/product/options/ProductSKUOptionList.tsx";
import ProductSKUAttributeOptionSelector
    from "../../../../components/product/product/options/ProductSKUAttributeOptionSelector.tsx";
import {ProductAttributeOption} from "../../../../types/ProductAttributeTypes.ts";

const ProductSKUOptionPage: FC = () => {
    const {token} = useAdminToken();
    const {productID, productSlug, skuID, skuSlug} = useProductSKUParam();

    const {sku, isLoading: isSKULoading} = useFetchProductSKU(productID!, skuID!, token);
    const {attributes, isLoading: isAttributeLoading} = useFetchProductAttributes(token);

    const [options, setOptions] = useState<ProductAttributeOption[]>([]);

    useEffect(() => {
        setOptions(sku ? sku.options : []);
    }, [sku])

    return (
        <div className="flex flex-col space-y-5">

            {/*Header*/}

            <div className="flex justify-between items-center">
                <div>
                    {sku && <div>
                        <HeaderText>{sku!.code}</HeaderText>
                        <span className="text-gray-600 text-sm font-extralight">{sku!.product.title}</span>
                    </div>}
                </div>
                <div className="flex justify-end space-x-4">
                    <PageHeaderLink link={`/admin/product/find/${productID}/${productSlug}/sku/${skuID}/${skuSlug}`}>
                        &lt; SKU
                    </PageHeaderLink>
                </div>
            </div>

            {/* Options Grid */}

            <div className="grid grid-cols-3 gap-4">
                <div className="p-3">
                    {
                        !isSKULoading &&
                        <ProductSKUOptionList
                            skuID={skuID!}
                            optionList={options}
                            onRemove={(skuOptions: ProductAttributeOption[]) => setOptions(skuOptions)}
                        />}
                </div>
                <div className="col-span-2 flex flex-col space-y-4">
                    <h1 className="text-3xl font-bold">Attributes</h1>

                    {
                        !isAttributeLoading &&
                        <ProductSKUAttributeOptionSelector
                            skuID={skuID!}
                            attributes={attributes}
                            options={options}
                            onSuccess={(skuOptions: ProductAttributeOption[]) => setOptions(skuOptions)}
                    />}
                </div>
            </div>
        </div>
    );
};

export default ProductSKUOptionPage;
