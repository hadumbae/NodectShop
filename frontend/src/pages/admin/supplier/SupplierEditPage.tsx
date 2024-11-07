import {FC, useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import {toast} from "react-toastify";
import {Supplier} from "../../../types/SupplierTypes.ts";
import SupplierService from "../../../services/supplier/SupplierService.ts";
import useAdminToken from "../../../hooks/useAdminToken.ts";
import Loader from "../../../components/utils/Loader.tsx";
import UpdateSupplierForm from "../../../components/supplier/UpdateSupplierForm.tsx";
import _ from "lodash";

const SupplierEditPage: FC = () => {
    const navigate = useNavigate();
    const {supplierID} = useParams();

    if (!supplierID) {
        toast.error("Empty Supplier ID");
        navigate("/admin/supplier/list");
    }

    const {token} = useAdminToken();

    const [isLoading, setIsLoading] = useState(false);
    const [supplier, setSupplier] = useState<Supplier | null>(null);

    useEffect(() => {
        const fetchSupplier = async () => {
            setIsLoading(true);

            try {
                const {status, payload} = await SupplierService.fetchSupplier(supplierID!, token);

                if (status === 200) {
                    setSupplier(payload.data);
                } else if (status === 404) {
                    toast.error("Oops. Supplier not found.");
                } else {
                    toast.error("Oops. Something bad happened!");
                    console.log(`${status} : ${payload.message}`);
                }

                setIsLoading(false);
            } catch (error) {
                toast.error("Oops. Something bad happened!");
                console.log(error);
            }
        }

        fetchSupplier();
    }, []);

    return (
        <div>
            <div className="mt-2 flex justify-between items-center">
                <h1 className="text-2xl">{supplier ? supplier.name : "Edit Supplier"}</h1>

                <Link to={`/admin/supplier/find/${supplierID}/${_.kebabCase(supplier?.name)}`}
                className="text-xl text-gray-400 hover:underline hover:underline-offset-8 hover:text-black">
                    &lt; Back
                </Link>
            </div>

            {isLoading && <div className="mt-3 flex justify-center">
                <div className="bg-white p-5 shadow-md rounded-xl">
                    <Loader loading={isLoading} />
                </div>
            </div>}

            {(!isLoading && supplier) && <div className="mt-4">
                <UpdateSupplierForm supplier={supplier} />
            </div>}
        </div>
    );
};

export default SupplierEditPage;
