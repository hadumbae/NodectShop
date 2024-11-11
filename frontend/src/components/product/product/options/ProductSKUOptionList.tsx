import {FC} from 'react';
import {ProductAttributeOption} from "../../../../types/ProductAttributeTypes.ts";
import ProductSKUOptionListRow from "./ProductSKUOptionListRow.tsx";

interface Props {
    skuID: string;
    optionList: ProductAttributeOption[];
    onRemove: Function
}

const ProductSKUOptionList: FC<Props> = ({skuID, optionList, onRemove}) => {
    return (
        <div className="bg-white p-5 border rounded-lg shadow-md flex flex-col space-y-4">
            <h1 className="text-2xl font-semibold">Associated Options</h1>

            {optionList.map(
                (option: ProductAttributeOption) => <ProductSKUOptionListRow
                    key={option._id}
                    skuID={skuID}
                    option={option}
                    onRemove={onRemove}  />
            )}
        </div>
    );
};

export default ProductSKUOptionList;
