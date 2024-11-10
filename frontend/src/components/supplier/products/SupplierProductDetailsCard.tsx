import {FC, useRef} from 'react';
import {ProductSKU} from "../../../types/ProductTypes.ts";
import {CiBoxes} from "react-icons/ci";

interface Props {
    product: ProductSKU;
}

const SupplierProductDetailsCard: FC<Props> = ({product}) => {
    const image = useRef<string | null>(
        product.images.length > 0 ? product.images[0].secure_url : null
    );

    return (
        <div className="bg-white shadow-md rounded-xl grid grid-cols-3">
            <div className="rounded-l-xl bg-gray-400 flex justify-center items-center overflow-hidden">
                {image.current ? <img src={image.current} className="object-cover h-full" /> : <span>No Image</span>}
            </div>
            <div className=" p-3 rounded-r-xl col-span-2 flex flex-col space-y-4">
                <div className="flex justify-between">
                    <div>
                        <h1 className="text-lg">{product.product.title}</h1>
                        {product.product.category &&
                            <span className="text-sm text-gray-400 relative bottom-2">
                                {`${product.product.category.category} | `}
                        </span>}
                        <span className="text-sm text-gray-400 relative bottom-2">
                                {product.code}
                        </span>
                    </div>
                    <h1 className="text-xl">${product.unitPrice}</h1>

                </div>

                {product.options.length > 0 &&
                <div>
                    {product.options.map((option: any) => <span key={option._id}>{option.name}</span>)}
                </div>}

                <div className="px-7 flex justify-center">
                    <blockquote
                        className="text-sm text-gray-400 text-justify line-clamp-3">{product.product.description}</blockquote>
                </div>

                <div className="flex justify-between items-center text-md">
                    <span className="flex space-x-2 items-center">
                        <CiBoxes />
                        <span>{product.unitStock} units / {product.reorderLevel} RoL</span>
                    </span>

                    <span className={product.isDiscontinued ? "text-red-500" : "text-green-500"}>
                        {product.isDiscontinued ? "Discontinued" : "Available"}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default SupplierProductDetailsCard;
