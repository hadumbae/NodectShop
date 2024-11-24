import { FC } from 'react';
import useAdminToken from "../../../../hooks/useAdminToken.ts";
import useProductSKUParam from "../../../../hooks/product/useProductSKUParam.ts";
import useFetchProductSKU from "../../../../hooks/product/useFetchProductSKU.ts";
import HeaderText from "../../../../components/header/HeaderText.tsx";
import PageHeaderLink from "../../../../components/navigation/page.header.link.tsx";
import PageHeaderButton from "../../../../components/header/PageHeaderButton.tsx";
import ProductSKUService from "../../../../services/product/sku/ProductSKUService.ts";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

const ProductSKUDetailsPage: FC = () => {
    const navigate = useNavigate();

    const {token} = useAdminToken();
    const {productID, productSlug, skuID, skuSlug} = useProductSKUParam();
    const {sku, isLoading, setIsLoading} = useFetchProductSKU(productID!, skuID!, token);

    const deleteSKU = async () => {
        setIsLoading(true);

        const {status, payload} = await ProductSKUService.deleteProductSKU(productID!, sku!._id, token);

        if (status === 200) {
            toast.success("Product SKU deleted successfully.");
            navigate(`/admin/product/find/${productID}/${productSlug}`);
        } else {
            toast.error("Oops. Something bad happened!");
            console.error(`${status} : ${payload.message}`);
        }

        setIsLoading(false);
    }

    // New Hook && Get Product Attribute Options
    // Use Hook in Options Component, Not In Root

    return (
        <div className="flex flex-col space-y-3">
            {(!isLoading && sku) && <div className="flex justify-between items-center">
                <div>
                    <HeaderText>{sku!.code}</HeaderText>
                    <span>#Replace With Product Title#</span>
                </div>
                <div className="flex justify-end space-x-4">
                    <PageHeaderLink link={`/admin/product/find/${productID}/${productSlug}`}>
                        &lt; Product
                    </PageHeaderLink>
                    <PageHeaderLink link={`/admin/product/find/${productID}/${productSlug}/sku/${skuID}/${skuSlug}/images`}>
                        Images
                    </PageHeaderLink>
                    <PageHeaderLink link={`/admin/product/find/${productID}/${productSlug}/sku/${skuID}/${skuSlug}/options`}>
                        Options
                    </PageHeaderLink>
                    <PageHeaderLink link={`/admin/product/edit/${productID}/${productSlug}/sku/${skuID}/${skuSlug}`}>
                        Edit
                    </PageHeaderLink>
                    <PageHeaderButton onClick={deleteSKU}>
                        Delete
                    </PageHeaderButton>
                </div>
            </div>}
        </div>
    );
};

export default ProductSKUDetailsPage;
