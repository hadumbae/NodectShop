import {FC, useState} from 'react';
import useAdminToken from "../../../hooks/useAdminToken.ts";
import {GiCycle} from "react-icons/gi";
import FormInput from "../../inputs/FormInput.tsx";
import useFetchSuppliers from "../../../hooks/supplier/useFetchSuppliers.ts";
import Button from "../../inputs/Button.tsx";
import FormSelect from "../../inputs/FormSelect.tsx";
import {Supplier} from "../../../types/SupplierTypes.ts";
import {fetchValidationError} from "../../../utils/FormUtils.ts";
import ProductSKUService from "../../../services/product/sku/ProductSKUService.ts";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {ProductSKU} from "../../../types/ProductTypes.ts";
import FormCheckbox from "../../inputs/FormCheckbox.tsx";

interface Props {
    productID: string;
    productSlug: string;
    sku?: ProductSKU;
}

const ProductSKUForm: FC<Props> = ({ productID, productSlug, sku }) => {
    const navigate = useNavigate();
    const {token} = useAdminToken();
    const {suppliers} = useFetchSuppliers(token);

    const [validationErrors, setValidationErrors] = useState([]);


    const [supplier, setSupplier] = useState(sku ? sku.supplier._id : "None");
    const [name, setName] = useState(sku ? sku.name : "");
    const [code, setCode] = useState(sku ? sku.code : "");
    const [unitPrice, setUnitPrice] = useState(sku ? sku.unitPrice : "");
    const [unitStock, setUnitStock] = useState(sku ? sku.unitStock : "");
    const [reorderLevel, setReorderLevel] = useState(sku ? sku.reorderLevel : "");
    const [isDiscontinued, setIsDiscontinued] = useState(sku ? sku.isDiscontinued : false);

    const submitHandler = async (event: any) => {
        event.preventDefault();

        const data = {
            product: productID,
            supplier: supplier === "None" ? null : supplier,
            code: code,
            name: name,
            unitPrice: unitPrice,
            unitStock: unitStock,
            reorderLevel: reorderLevel,
            isDiscontinued: isDiscontinued,
        };

        const {status, payload} = sku ?
            await ProductSKUService.updateProductSKU(productID, sku._id, data, token) :
            await ProductSKUService.createProductSKU(productID, data, token);

        if (status === 200) {
            toast.success("Product SKU created successfully.");
            navigate(`/admin/product/find/${productID}/${productSlug}`)
        } else {
            if (payload.errors) setValidationErrors(payload.errors);
            console.error(`${status} : ${payload.message}`);
        }


    };

    const resetForm = () => {
        setSupplier("None");
        setCode("");
        setName("");
        setUnitPrice("");
        setUnitStock("");
        setReorderLevel("");
        setIsDiscontinued(false);
    }

    return (
        <div className="bg-white border rounded-xl p-3 flex flex-col space-y-4">
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-bold">{sku ? "Update" : "Create"} Product SKU</h1>

                <button onClick={resetForm}
                    className="p-3
                        hover:border hover:border-green-500 hover:rounded-3xl
                        hover:text-green-500 hover:animate-spin">
                    <GiCycle />
                </button>
            </div>

            <form onSubmit={submitHandler} className="flex flex-col space-y-4">
                <FormSelect
                    label="Supplier"
                    name="Supplier"
                    value={supplier}
                    changeHandler={setSupplier}
                    errors={fetchValidationError("supplier", validationErrors)}>
                        <option>None</option>
                        {suppliers.map((supplier: Supplier) => <option key={supplier._id}
                            value={supplier._id}>
                            {supplier.name}
                        </option>)}
                </FormSelect>

                <FormInput
                    label="Code"
                    inputType="text"
                    name={"code"}
                    errors={fetchValidationError("code", validationErrors)}
                    value={code}
                    changeHandler={setCode} />

                <FormInput
                    label="Name"
                    inputType="text"
                    name={"name"}
                    errors={fetchValidationError("name", validationErrors)}
                    value={name}
                    changeHandler={setName} />

                <FormInput
                    label="Unit Price"
                    inputType="number"
                    name={"unitPrice"}
                    step={0.01}
                    errors={fetchValidationError("unitPrice", validationErrors)}
                    value={unitPrice}
                    changeHandler={setUnitPrice} />

                <FormInput
                    label="Unit Stock"
                    inputType="number"
                    name={"unitStock"}
                    errors={fetchValidationError("unitStock", validationErrors)}
                    value={unitStock}
                    changeHandler={setUnitStock} />

                <FormInput
                    label="Reorder Level"
                    inputType="number"
                    name={"reorderLevel"}
                    errors={fetchValidationError("reorderLevel", validationErrors)}
                    value={reorderLevel}
                    changeHandler={setReorderLevel} />

                {sku && <FormCheckbox label="Is Discontinued?" value={isDiscontinued} changeHandler={setIsDiscontinued} />}

                <div className="text-right">
                    <Button type={"submit"}>{sku ? "Update" : "Create"}</Button>
                </div>
            </form>
        </div>
    );
};

export default ProductSKUForm;
