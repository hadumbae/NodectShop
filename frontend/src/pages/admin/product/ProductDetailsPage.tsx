import {FC, useState} from 'react';
import useProductParam from "../../../hooks/product/useProductParam.ts";
import useAdminToken from "../../../hooks/useAdminToken.ts";
import useFetchProduct from "../../../hooks/product/useFetchProduct.ts";
import HeaderText from "../../../components/header/HeaderText.tsx";
import PageHeaderLink from "../../../components/navigation/PageHeaderLink.tsx";
import PageHeaderButton from "../../../components/header/PageHeaderButton.tsx";
import ProductService from "../../../services/product/ProductService.ts";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {GoArrowSwitch} from "react-icons/go";
import ProductSKUCardList from "../../../components/product/skus/ProductSKUCardList.tsx";
import IconButtonLink from "@/components/navigation/IconButtonLink.tsx";
import {FaPencil} from "react-icons/fa6";
import IconButton from "@/components/navigation/IconButton.tsx";
import {FaList, FaTrash} from "react-icons/fa";

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
            {!isLoading && <HeaderText>{product!.title}</HeaderText>}

            {error && <div className="text-center">
                <h1 className="text-xl text-red-500">{error}</h1>
            </div>}

            {(!isLoading && product) && <div className="flex justify-center">
                <div className="flex flex-col space-y-5">

                    {/*Category Header*/}

                    <div className="flex justify-between items-center">
                        <div>
                            <span className="text-sm text-gray-400">Category</span>
                            <h1 className="text-xl font-medium">{product!.category?.category}</h1>
                        </div>

                        <div className="flex justify-end space-x-4">
                            <IconButtonLink className="text-sm p-3 hover:border-green-400 hover:text-green-400"
                                            to={`/admin/product/list`}>
                                <FaList />
                            </IconButtonLink>
                            <IconButtonLink className="text-sm p-3 hover:border-blue-400 hover:text-blue-400"
                                            to={`/admin/product/edit/${productID}/${productSlug}`}>
                                <FaPencil/>
                            </IconButtonLink>
                            <IconButton className="hover:border-red-400 hover:text-red-400" onClick={deleteProduct}>
                                <FaTrash/>
                            </IconButton>
                        </div>
                    </div>

                    {/*Description*/}

                    <div>
                        <span className="text-sm text-gray-400">Description</span>
                        <div className="border rounded-2xl p-5 text-xs">
                            <blockquote className="text-justify">
                                {product?.description}
                            </blockquote>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <div className="border flex space-x-4 p-2 rounded-xl items-center">
                            <div>
                                <GoArrowSwitch/>
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

                    <div className={viewMode === "SKU" ? "" : "hidden"}>
                        <ProductSKUCardList product={product}/>
                    </div>

                    <div className={viewMode === "Orders" ? "" : "hidden"}>
                        Orders
                    </div>

                </div>
            </div>}

        </div>
    );
};

export default ProductDetailsPage;
