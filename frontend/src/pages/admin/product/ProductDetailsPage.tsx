import {FC} from 'react';
import useProductParam from "../../../hooks/product/useProductParam.ts";
import useAdminToken from "../../../hooks/useAdminToken.ts";
import useFetchProduct from "../../../hooks/product/useFetchProduct.ts";
import HeaderText from "../../../components/header/HeaderText.tsx";
import ProductService from "../../../services/product/product.service.ts";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import ProductSKUCardList from "../../../components/product/skus/ProductSKUCardList.tsx";
import Loader from "@/components/utils/Loader.tsx";
import PageHeaderLink from "@/components/navigation/page.header.link.tsx";
import PageHeaderButton from "@/components/header/PageHeaderButton.tsx";

const ProductDetailsPage: FC = () => {
    const navigate = useNavigate();
    const {token} = useAdminToken();
    const {productID, productSlug} = useProductParam();
    const {product, isPending} = useFetchProduct(productID!, token);


    const deleteProduct = async () => {
        const {status, payload} = await ProductService.deleteProduct(product!._id, token);

        if (status === 200){
            toast.success("Product deleted successfully.")
            return navigate("/admin/product/list");
        } else {
            console.error(`${status} : ${payload.message}`);
        }
    };

    if (isPending) return (<div className="h-full flex justify-center items-center">[
        <Loader loading={isPending} />
    </div>);

    return (
        <div className="flex flex-col space-y-3">
            <section className="flex justify-between items-center mt-2">
                <HeaderText>{product!.title}</HeaderText>

                <div className="flex justify-end items-center space-x-4">
                    <PageHeaderLink link={`/admin/product/edit/${productID}/${productSlug}`}>
                        Edit
                    </PageHeaderLink>
                    <PageHeaderButton onClick={deleteProduct}>
                        Delete
                    </PageHeaderButton>
                </div>
            </section>

            <section>
                <span className="text-sm text-gray-400">Description</span>
                <div className="border rounded-2xl p-5 text-xs">
                    <blockquote className="text-justify">
                        {product?.description}
                    </blockquote>
                </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-red-500">
                        <ProductSKUCardList product={product!}/>
                    </div>

                    <div className="bg-purple-500">
                        Orders
                    </div>

            </section>
        </div>
    );
};

export default ProductDetailsPage;
