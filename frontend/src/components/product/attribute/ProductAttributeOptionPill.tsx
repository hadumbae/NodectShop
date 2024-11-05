import {FC, useState} from "react";
import {useSelector} from "react-redux";
import {toast} from "react-toastify";

import {ProductAttributeOptionType} from "../../../types/ProductAttributeTypes.ts";
import ProductAttributeOptionService from "../../../services/product/attribute/ProductAttributeOptionService.ts"

interface props {
    option: ProductAttributeOptionType,
    onDelete: (id: string) => void
}

const ProductAttributeOptionPill: FC<props> = ({option, onDelete}) => {
    const {token, isAdmin} = useSelector((state: any) => state.authUser);
    if (!token || !isAdmin) return toast.error("Unauthorized!");

    const [isLoading, setIsLoading] = useState(false);

    const handleDelete = async () => {
        setIsLoading(true);

        const {status, payload} = await ProductAttributeOptionService
            .deleteProductAttributeOption(option.attribute, option._id!, token);

        if(status === 200) {
            onDelete(option._id!);
        } else {
            toast.error("Error!")
            toast.error(payload.message);
        }

        setIsLoading(false);
    }

    return (
        <div className="border rounded-xl">
            <span key={option._id} className="pl-3 pr-2">{option.name}</span>
            <button
                className="px-3 h-full rounded-r-xl text-white bg-black hover:bg-red-500 disabled:bg-gray-300"
                onClick={handleDelete}
                disabled={isLoading}
            >X</button>
        </div>
    );
};

export default ProductAttributeOptionPill;
