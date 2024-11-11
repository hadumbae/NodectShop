import {FC, useState} from 'react';
import {ProductAttributeOption} from "../../../../types/ProductAttributeTypes.ts";
import {ImCross} from "react-icons/im";
import ProductSKUOptionService from "../../../../services/product/sku/ProductSKUOptionService.ts";
import useAdminToken from "../../../../hooks/useAdminToken.ts";
import {toast} from "react-toastify";
import {GiCycle} from "react-icons/gi";

interface Props {
    skuID: string;
    option: ProductAttributeOption;
    onRemove: Function;
}

const ProductSKUOptionListRow: FC<Props> = ({skuID, option, onRemove}) => {
    const {token} = useAdminToken();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const unassociateOption = async () => {
        setIsLoading(true);
        const {status, payload} = await ProductSKUOptionService.dissociateOption(skuID, option._id, token);

        if (status === 200) {
            toast.success("Option removed from SKU.");
            onRemove(payload.data.options);

            setIsLoading(false);
            setError(null);
        } else {
            toast.error("Oops. Something bad happened!");
            console.error(`${status} : ${payload.message}`);

            setIsLoading(false);
            setError(payload.message);
        }
    };

    return (
        <>
            <div
                key={option._id}
                className="p-3 border rounded-lg shadow-md hover:shadow-lg flex justify-between items-center space-x-2"
            >
                <span>{option.name}</span>
                <button
                    disabled={isLoading}
                    onClick={unassociateOption}
                    className={`rounded-3xl border p-3 text-sm hover:text-red-500 ${isLoading ? "border-blue-400" : "hover:border-red-500"}`}
                >
                    {isLoading ? <GiCycle className="animate-spin text-blue-400"/> : <ImCross/>}
                </button>
            </div>
            {error && <div className="text-center text-red-500">{error}</div>}
        </>
    );
};

export default ProductSKUOptionListRow;
