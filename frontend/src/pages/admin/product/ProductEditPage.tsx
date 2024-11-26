import {FC} from 'react';
import useAdminToken from "../../../hooks/useAdminToken.ts";
import useProductParam from "../../../hooks/product/useProductParam.ts";
import useFetchProduct from "../../../hooks/product/useFetchProduct.ts";
import HeaderText from "../../../components/header/HeaderText.tsx";
import PageHeaderLink from "../../../components/navigation/page.header.link.tsx";
import Loader from "@/components/utils/Loader.tsx";
import {ZProduct} from "@/schema/product.validate.schema.ts";
import {useNavigate} from "react-router-dom";
import _ from "lodash";
import ProductEditForm from "@/components/forms/product/product.edit.form.tsx";

const ProductEditPage: FC = () => {
    const {token} = useAdminToken();
    const {productID, productSlug} = useProductParam();
    const {product, isPending, isSuccess, isError, error} = useFetchProduct(productID!, token);

    const navigate = useNavigate();

    const onSuccess = (product: ZProduct) => {
        navigate(`/admin/product/find/${product._id}/${_.kebabCase(product.title)}`);
    };

    if (isPending) return (<div className="h-full flex justify-center items-center">
        <Loader loading={isPending} />
    </div>);

    if (isError) return (<div className="h-full flex flex-col justify-center items-center">
        <span className="text-red-500">Oops! Something bad happened!</span>
        <span className="text-gray-400">{error!.message}</span>
    </div>);

    return (
        <div className="flex flex-col space-y-4">
            <section className="flex justify-between items-center">
                <HeaderText className="truncate">Edit Product</HeaderText>
                <PageHeaderLink link={`/admin/product/find/${productID}/${productSlug}`}>
                    &lt; Details
                </PageHeaderLink>
            </section>

            {isSuccess && <section className="flex justify-center">
                <div className="w-full lg:w-1/3">
                    <ProductEditForm product={product} onSuccess={onSuccess}/>
                </div>
            </section>}
        </div>
    );
};

export default ProductEditPage;
