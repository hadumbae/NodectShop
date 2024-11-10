import {FC, useRef, useState} from 'react';
import {Product, ProductSKU} from "../../../types/ProductTypes.ts";
import {FaMagnifyingGlass, FaPencil} from "react-icons/fa6";
import {FaTrash} from "react-icons/fa";
import {ProductAttributeOptionType} from "../../../types/ProductAttributeTypes.ts";
import Pill from "../../container/Pill.tsx";
import ProductSKUService from "../../../services/product/ProductSKUService.ts";
import useAdminToken from "../../../hooks/useAdminToken.ts";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";
import _ from "lodash";

interface Props {
    sku: ProductSKU;
    product: Product;

    onDelete: () => void;
}

const ProductSKUListCard: FC<Props> = ({sku, product, onDelete}) => {
    const {token} = useAdminToken();
    const [isLoading, setIsLoading] = useState(false);

    const image = useRef<string | null>(null);

    if (sku.images.length > 0) {
         const primary = sku.images.find(i  => i.isPrimary);
         if (primary) {
             image.current = primary.secure_url;
         }
    }

    const deleteSKU = async () => {
        setIsLoading(true);

        const {status, payload} = await ProductSKUService.deleteProductSKU(product._id, sku._id, token);

        if (status === 200) {
            toast.success("Product SKU deleted successfully.");
            onDelete();
        } else {
            toast.error("Oops. Something bad happened!");
            console.error(`${status} : ${payload.message}`);
        }

        setIsLoading(false);
    }

    // Template

    return (
        <div className="bg-white shadow-md rounded-xl flex h-60">

            {/* Image */}

            <div className="rounded-l-lg bg-gray-100 w-3/5 h-full flex justify-center items-center overflow-hidden">
                {image.current ? <img src={image.current} className="object-cover w-full h-full"/> : <span>No Image</span>}
            </div>


            <div className="p-3 w-full h-full flex flex-col justify-center space-y-4">
                {/*Header*/}

                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-3xl font-bold">{sku.code}</h1>
                        <h1 className="text-sm text-gray-400 font-light">{sku.supplier.name}</h1>
                    </div>
                    <h1 className="text-xl font-extrabold">${sku.unitPrice}</h1>
                </div>

                {/* Stock And Options */}

                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-semibold">
                            {sku.unitStock} <span className="text-xs">/ {sku.reorderLevel}</span> units
                        </h1>
                    </div>
                    <div className="flex flex-wrap space-x-2">
                        {
                            sku.options.length > 0 ?
                                sku.options.map((option: ProductAttributeOptionType) => <Pill key={option._id}>{option.name}</Pill>) :
                                <Pill textClasses="text-red-500" borderClasses="border-red-500">No Options</Pill>
                        }
                    </div>
                </div>

                {/* Discontinued */}

                <div className="flex justify-between">
                    <div
                        className={`border p-3 rounded-3xl ${sku.isDiscontinued ? "text-red-500 border-red-500" : "text-green-500 border-green-500"}`}>
                        {sku.isDiscontinued ? "Is Discontinuted" : "Available"}
                    </div>

                    {/* Modify Links */}

                    <div className="flex justify-end space-x-3">
                        <Link
                            to={`/admin/product/find/${product._id}/${_.kebabCase(product.title)}/sku/${sku._id}/${_.kebabCase(sku.code)}`}
                              className="border text-sm rounded-3xl p-4 hover:bg-black hover:text-white">
                            <FaMagnifyingGlass/>
                        </Link>
                        <Link
                            to={`/admin/product/edit/${product._id}/${_.kebabCase(product.title)}/sku/${sku._id}/${_.kebabCase(sku.code)}`}
                              className="border text-sm rounded-3xl p-4 hover:bg-black hover:text-white">
                            <FaPencil/>
                        </Link>
                        <button disabled={isLoading} className="border text-sm rounded-3xl p-4 hover:bg-black hover:text-white" onClick={deleteSKU}>
                            <FaTrash/>
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProductSKUListCard;
