import {FC, useState} from 'react';
import { FaTrash } from "react-icons/fa";
import {useSelector} from "react-redux";
import {toast} from "react-toastify";
import ProductAttributeService from "../../../services/product/attribute/ProductAttributeService.ts";
import {ProductAttributeOption, ProductAttribute} from "../../../types/ProductAttributeTypes.ts";
import ProductAttributeOptionCreateSingleLineForm from "./ProductAttributeOptionCreateSingleLineForm.tsx";
import ProductAttributeOptionPill from "./ProductAttributeOptionPill.tsx";
import ProductAttributeFormWrapper from "@/components/forms/attribute/product.attribute.form.wrapper.tsx";
import {FaPencil} from "react-icons/fa6";

interface props {
    attribute: ProductAttribute,
    onDelete: Function
}

const ProductAttributeDetailsCard: FC<props> = ({attribute, onDelete}) => {
    const {token, isAdmin} = useSelector((state: any) => state.authUser);
    const [options, setOptions] = useState<ProductAttributeOption[]>([...attribute.options]);

    const deleteAttribute = async () => {
        if (!token || !isAdmin) return toast.error("Unauthorized!")

        const {status, payload} = await ProductAttributeService.deleteProductAttribute(attribute._id!, token)

        if (status === 200) {
            toast.success("Product Attribute Deleted.");
            onDelete();
        } else {
            toast.error(`Error: ${status}`)
            toast.error(payload.message);
        }
    }

    const pushOption = (option: ProductAttributeOption) => {
        setOptions([...options, option]);
    }

    const filterOption = (optionID: string) => {
        setOptions(options.filter(option => option._id != optionID));
    }

    return (
        <div className="w-full h-full bg-white shadow-md rounded p-5">
            <div className="flex justify-between">
                <h1 className="text-xl">{attribute.name}</h1>

                <div className="space-x-10">
                    <ProductAttributeFormWrapper onSuccess={() => onDelete()} attribute={attribute}>
                        <button className="text-gray-400 hover:text-blue-500">
                            <FaPencil/>
                        </button>
                    </ProductAttributeFormWrapper>

                    <button className="text-gray-400 hover:text-red-500" onClick={deleteAttribute}>
                        <FaTrash/>
                    </button>
                </div>
            </div>
            <div className="mt-5">
                <ProductAttributeOptionCreateSingleLineForm attributeID={attribute._id!} pushOption={pushOption} />
            </div>
            <div className="flex flex-wrap justify-center space-x-2">
                {options.map((option: any) => <div className="mt-5" key={option._id}>
                    <ProductAttributeOptionPill option={option} onDelete={filterOption} />
                </div>)}
            </div>
        </div>
    );
};

export default ProductAttributeDetailsCard;
