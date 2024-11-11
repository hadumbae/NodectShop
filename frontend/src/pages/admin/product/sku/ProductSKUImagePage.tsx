import {FC} from 'react';
import useAdminToken from "../../../../hooks/useAdminToken.ts";
import useProductSKUParam from "../../../../hooks/product/useProductSKUParam.ts";
import useFetchProductSKUWithImages from "../../../../hooks/product/useFetchProductSKUWithImages.ts";
import HeaderText from "../../../../components/header/HeaderText.tsx";
import PageHeaderLink from "../../../../components/header/PageHeaderLink.tsx";
import ProductSKUImageUploadCard from "../../../../components/product/product/images/ProductSKUImageUploadCard.tsx";
import {ProductSKUImage} from "../../../../types/ProductTypes.ts";
import ProductSKUImageCard from "../../../../components/product/product/images/ProductSKUImageCard.tsx";

const ProductSKUImagePage: FC = () => {
    const {token} = useAdminToken();
    const {productID, productSlug, skuID, skuSlug} = useProductSKUParam();
    const {sku, isLoading, images, setImages} = useFetchProductSKUWithImages(productID!, skuID!, token);

    const onImageChange = (fetchedImages: any[]) => {
        setImages(fetchedImages);
    }

    // New Hook && Fetch SKU And Images

    return (
        <div className="flex flex-col space-y-3">
            {(!isLoading && sku) &&
            <div className="flex justify-between items-center">
                <div>
                    <HeaderText>{sku!.code}</HeaderText>
                    <span className="text-gray-600 text-sm font-extralight">{sku!.product.title}</span>
                </div>
                <div className="flex justify-end space-x-4">
                    <PageHeaderLink link={`/admin/product/find/${productID}/${productSlug}/sku/${skuID}/${skuSlug}`}>
                        &lt; SKU
                    </PageHeaderLink>
                </div>
            </div>}

            {sku && <div className="flex justify-center">
                <div className="w-5/6 grid grid-cols-3 gap-4">
                    <div>
                        <ProductSKUImageUploadCard onUpload={onImageChange} skuID={skuID!}/>
                    </div>
                    <div className="col-span-2 grid grid-cols-2 gap-4">
                        {images!.map((image: ProductSKUImage) => <ProductSKUImageCard key={image._id} image={image} onChange={onImageChange} />)}
                    </div>
                </div>
            </div>}
        </div>
    );
};

export default ProductSKUImagePage;
