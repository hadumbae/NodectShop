import {FC} from 'react';
import {ProductAttributeOptionType} from "../../../../types/ProductAttributeTypes.ts";
import {ImCross} from "react-icons/im";
import useAdminToken from "../../../../hooks/useAdminToken.ts";

interface Props {
    optionList: ProductAttributeOptionType[];
}

const ProductSKUOptionList: FC<Props> = ({optionList}) => {
    const {token} = useAdminToken();

    const unassociateOption = () => {

    }

    return (
        <div className="bg-white p-5 border rounded-lg shadow-md flex flex-col space-y-2">
            <h1 className="text-2xl font-semibold">Associated Options</h1>

            {optionList.map((option: ProductAttributeOptionType) => <div
                className="p-3 border rounded-lg shadow-md hover:shadow-lg flex justify-between items-center space-x-2"
            >
                <span>{option.name}</span>
                <button className="rounded-3xl border p-3 text-sm hover:text-red-500 hover:border-red-500">
                    <ImCross />
                </button>
            </div>)}
        </div>
    );
};

export default ProductSKUOptionList;
