import {FC, useState} from 'react';
import useProductParam from "../../../hooks/product/useProductParam.ts";
import useAdminToken from "../../../hooks/useAdminToken.ts";
import useFetchProduct from "../../../hooks/product/useFetchProduct.ts";
import HeaderText from "../../../components/header/HeaderText.tsx";
import PageHeaderLink from "../../../components/header/PageHeaderLink.tsx";
import PageHeaderButton from "../../../components/header/PageHeaderButton.tsx";
import ProductService from "../../../services/product/ProductService.ts";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {GoArrowSwitch} from "react-icons/go";
import ProductSKUCardList from "../../../components/product/skus/ProductSKUCardList.tsx";

const ProductDetailsPage: FC = () => {
    const navigate = useNavigate();
    const {token} = useAdminToken();
    const {productID, productSlug} = useProductParam();
    const {product, isLoading, error} = useFetchProduct(productID!, token);

    const [viewMode, setViewMode] = useState<string>("SKU");

    const deleteProduct = async () => {
        const {status, payload} = await ProductService.deleteProduct(product!._id, token);

        if (status === 200){
            toast.success("Product deleted successfully.")
            return navigate("/admin/product/list");
        } else {
            console.error(`${status} : ${payload.message}`);
        }
    };

    return (
        <div className="flex flex-col space-y-3">
            {!isLoading && <div className="flex justify-between items-center">
                <HeaderText>{product!.title}</HeaderText>
                <div className="flex justify-end space-x-4">
                    <PageHeaderLink link={`/admin/product/list`}>
                        &lt; Products
                    </PageHeaderLink>
                    <PageHeaderLink link={`/admin/product/edit/${productID}/${productSlug}`}>
                        Edit
                    </PageHeaderLink>
                    <PageHeaderButton onClick={deleteProduct}>
                        Delete
                    </PageHeaderButton>
                </div>
            </div>}

            {error && <div className="text-center">
                <h1 className="text-xl text-red-500">{error}</h1>
            </div>}

            {(!isLoading && product) && <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="flex flex-col space-y-5">
                    <div>
                        <span className="text-sm text-gray-400">Category</span>
                        <h1 className="text-xl font-medium">{product!.category?.category}</h1>
                    </div>

                    <div>
                        <span className="text-sm text-gray-400">Description</span>
                        <div className="border rounded-2xl p-5 text-xs">
                            <blockquote className="text-justify">
                                {product?.description}
                            </blockquote>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2 flex flex-col space-y-4">
                    <div className="flex justify-end">
                        <div className="border flex space-x-4 p-2 rounded-xl items-center">
                            <div>
                                <GoArrowSwitch />
                            </div>
                            <button onClick={() => setViewMode("SKU")}
                                className={`text-gray-400 hover:text-black hover:underline hover:underline-offset-8 ${viewMode === "SKU" && "text-black"}`}>
                                SKU
                            </button>
                            <button onClick={() => setViewMode("Orders")}
                                className={`text-gray-400 hover:text-black hover:underline hover:underline-offset-8 ${viewMode === "Orders" && "text-black"}`}>
                                Orders
                            </button>
                        </div>
                    </div>

                    {viewMode === "SKU" && <div>
                        <ProductSKUCardList product={product} />
                    </div>}

                    {viewMode === "Orders" && <div>
                        Orders
                    </div>}
                </div>
            </div>}

        </div>
    );
};

export default ProductDetailsPage;
