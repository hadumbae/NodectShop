import {FC, useState} from 'react';
import useAdminToken from "../../../../hooks/useAdminToken.ts";
import useFetchProductAttributes from "../../../../hooks/attribute/useFetchProductAttributes.ts";
import useFetchProductSKU from "../../../../hooks/product/useFetchProductSKU.ts";
import useProductSKUParam from "../../../../hooks/product/useProductSKUParam.ts";
import HeaderText from "../../../../components/header/HeaderText.tsx";
import PageHeaderLink from "../../../../components/header/PageHeaderLink.tsx";
import Pill from "../../../../components/container/Pill.tsx";
import {ProductAttributeOptionType} from "../../../../types/ProductAttributeTypes.ts";
import ProductSKUOptionList from "../../../../components/product/product/options/ProductSKUOptionList.tsx";

const ProductSKUOptionPage: FC = () => {
    const {token} = useAdminToken();
    const {productID, productSlug, skuID, skuSlug} = useProductSKUParam();

    const {sku} = useFetchProductSKU(productID!, skuID!, token);
    const {attributes} = useFetchProductAttributes(token);

    const [options, setOptions] = useState<ProductAttributeOptionType[]>(sku ? sku.options : []);

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
                    <PageHeaderLink link={`/admin/product/find/${productID}/${productSlug}`}>
                        Product
                    </PageHeaderLink>
                    <PageHeaderLink link={`/admin/product/find/${productID}/${productSlug}/sku/${skuID}/${skuSlug}`}>
                        SKU
                    </PageHeaderLink>
                </div>
            </div>

            {/* Options Grid */}

            <div className="grid grid-cols-3 gap-4">
                <div className="p-3">
                    {sku && <ProductSKUOptionList optionList={sku.options} />}
                </div>
            </div>
        </div>
    );
};

export default ProductSKUOptionPage;
