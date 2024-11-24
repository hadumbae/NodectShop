import {FC, useRef} from 'react';
import _ from "lodash";
import {Link} from "react-router-dom";
import {FaMagnifyingGlass, FaPencil} from "react-icons/fa6";
import {ZProduct} from "@/schema/product.zod.ts";

interface Props {
    product: ZProduct;
}

const ProductListCard: FC<Props> = ({product}) => {
    const totalStock = useRef(product.skus.reduce((acc, cur) => acc + cur.unitStock, 0));
    const availableSKUs = useRef(product.skus.filter(sku => !sku.isDiscontinued).length);

    return (
        <div className="bg-white shadow-md border rounded-lg h-96">
            <div className="rounded-t-lg bg-gray-400 h-1/3 flex justify-center items-center overflow-hidden">
                <img src={product.image.secure_url} className="object-cover" alt="Product Image" />
            </div>


            <div className="p-3 h-2/3 flex flex-col justify-between space-y-3">
                <div>
                    <h1 className="text-lg line-clamp-2 text-justify">{product.title}</h1>
                </div>

                <blockquote className="line-clamp-3 text-sm text-justify px-6 text-gray-400 hover:text-black">
                    {product.description}
                </blockquote>

                <div className="flex justify-between">
                    <span className="text-sm border p-2 rounded-xl">
                        Available SKUs : <span>{availableSKUs.current} / {product.skus.length}</span>
                    </span>

                    <span className="text-sm border p-2 rounded-xl">
                        Total Stock : <span>{totalStock.current}</span>
                    </span>
                </div>

                <div className="flex justify-center space-x-6">
                    <Link className="text-md p-2 border rounded-3xl text-gray-400 hover:text-green-600 hover:border-green-600" to={`/admin/product/find/${product._id}/${_.kebabCase(product.title)}`}>
                        <FaMagnifyingGlass />
                    </Link>

                    <Link className="text-md p-2 border rounded-3xl text-gray-400 hover:text-blue-600 hover:border-blue-600" to={`/admin/product/edit/${product._id}/${_.kebabCase(product.title)}`}>
                        <FaPencil />
                    </Link>
                </div>
            </div>


        </div>
    );
};

export default ProductListCard;
