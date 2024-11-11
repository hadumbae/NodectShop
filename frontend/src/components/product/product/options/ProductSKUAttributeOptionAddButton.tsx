import {FC, useState} from 'react';
import {FaPlus} from "react-icons/fa";
import ProductSKUOptionService from "../../../../services/product/sku/ProductSKUOptionService.ts";
import {toast} from "react-toastify";
import useAdminToken from "../../../../hooks/useAdminToken.ts";
import {ProductAttributeOption} from "../../../../types/ProductAttributeTypes.ts";
import {GiCycle} from "react-icons/gi";

interface Props {
    skuID: string;
    option: ProductAttributeOption;
    onSuccess: Function;
    productOptions: string[];
}

const ProductSKUAttributeOptionAddButton: FC<Props> = ({skuID, option, onSuccess, productOptions}) => {
    const {token} = useAdminToken();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const associateAttribute = async (optionID: string) => {
        setIsLoading(true);

        const {status, payload} = await ProductSKUOptionService.associateOption(skuID, optionID, token);

        if (status === 200) {
            toast.success("Option added to SKU.")
            onSuccess(payload.data.options);

            setError(null);
            setIsLoading(false);
        } else {
            toast.error("Oops. Something bad happened!");
            console.error(`${status} : ${payload.message}`);

            setError(payload.message);
            setIsLoading(false);
        }
    }

    return (
        <div className="flex flex-col justify-center space-y-1">
            <button
                key={option._id}
                onClick={() => associateAttribute(option._id)}
                disabled={productOptions.includes(option._id) || isLoading}
                className="p-3 border rounded-lg shadow-md flex justify-between items-center disabled:text-gray-400 w-full"
            >
                <span>{option.name}</span>
                {isLoading ? <GiCycle className="animate-spin" /> : <FaPlus/>}
            </button>

            {error && <span className="text-red-500 text-center">
                {error}
            </span>}
        </div>
    );
};

export default ProductSKUAttributeOptionAddButton;
