import {FC} from 'react';
import {ProductAttribute, ProductAttributeOption} from "../../../../types/ProductAttributeTypes.ts";
import ProductSKUAttributeOptionAddButton from "./ProductSKUAttributeOptionAddButton.tsx";

interface Props {
    skuID: string;
    attributes: ProductAttribute[],
    options: ProductAttributeOption[],
    onSuccess: Function;
}

const ProductSKUAttributeOptionSelector: FC<Props> = ({skuID, attributes, options, onSuccess}) => {
    const productOptions: string[] = options.reduce(
        (acc: any[], cur: ProductAttributeOption) => [...acc, cur._id],
        []
    );

    return (
        <div className="grid grid-cols-2 gap-4">
            {attributes.map((attribute: ProductAttribute) => <div
                key={attribute._id}
                className="bg-white border rounded-lg shadow-md p-5 flex flex-col space-y-3"
            >
                <h1 className="text-xl font-bold">{attribute.name}</h1>

                <div className="grid grid-cols-2 gap-4">
                    {attribute.options.map((option: ProductAttributeOption) => <ProductSKUAttributeOptionAddButton
                        skuID={skuID}
                        option={option}
                        onSuccess={onSuccess}
                        productOptions={productOptions}
                    />)}
                </div>
            </div>)}
        </div>
    );
};

export default ProductSKUAttributeOptionSelector;
