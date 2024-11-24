import {FC} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {CiGlobe} from "react-icons/ci";
import _ from "lodash";
import useSupplierParam from "../../../hooks/supplier/useSupplierParam.ts";
import useAdminToken from "../../../hooks/useAdminToken.ts";
import useFetchSupplier from "../../../hooks/supplier/useFetchSupplier.ts";
import SupplierDetailsCollapsible from "@/components/supplier/SupplierDetailsCollapsible.tsx";
import Loader from "@/components/utils/Loader.tsx";
import SupplierDetailsBarCard from "@/components/supplier/SupplierDetailsBarCard.tsx";
import {useMutation} from "@tanstack/react-query";
import SupplierService from "@/services/supplier/supplier.service.ts";
import {FetchError} from "@/utils/CustomErrors.ts";
import {toast} from "react-toastify";

const SupplierDetailsPage: FC = () => {
    const navigate = useNavigate();

    const {token} = useAdminToken();
    const {supplierID} = useSupplierParam();
    const { supplier, isPending, isSuccess, isError, error} = useFetchSupplier(supplierID!, token);

    const {mutate, isPending: isDeleting} = useMutation({
        mutationKey: ["delete_single_supplier"],
        mutationFn: async () => {
            const {response, result} = await SupplierService.deleteSupplier(supplierID!, token);

            if (response.ok) return result;
            throw new FetchError(response, result.message, result.errors);
        },
        onSuccess: () => {
            toast.success("Supplier deleted successfully.");
            return navigate("/admin/supplier/list");
        },
        onError: () => {
            toast.error("Oops. Something bad happened. Supplier not deleted.");
        }
    });

    if (isPending) {
        return (<div className="flex justify-center items-center h-full">
            <Loader loading={true}/>
        </div>);
    };

    if (isError) {
        return (<div className="flex flex-col justify-center items-center h-full">
            <span className="text-red-500">Oops. Something bad happened!</span>
            <span className="text-gray-400">{error!.message}</span>
        </div>);
    };

    return (
        <div className="flex flex-col space-y-5 h-full">
            {isSuccess && <section
                className="flex flex-col space-y-3 md:flex-row md:justify-between md:items-center md:space-y-0">
                <div className="flex flex-col">
                    <h1 className="text-3xl truncate">{supplier.name}</h1>
                    <a href={supplier.website}
                       target="_blank"
                       rel='noopener noreferrer'
                       className="text-sm flex items-center space-x-1 text-gray-400 hover:text-black hover:underline hover:underline-offset-8">
                        <CiGlobe/>
                        <span>Website</span>
                    </a>
                </div>

                <div className="flex justify-center space-x-2 items-center">
                    <Link to={`/admin/supplier/find/${supplier._id}/${_.kebabCase(supplier.name)}/contacts`}
                          className="p-2 text-gray-400 text-lg hover:text-black hover:underline hover:underline-offset-8">
                        Contacts
                    </Link>
                    <Link to={`/admin/supplier/edit/${supplier._id}/${_.kebabCase(supplier.name)}`}
                          className="p-2 text-gray-400 text-lg hover:text-black hover:underline hover:underline-offset-8">
                        Edit
                    </Link>
                    <button disabled={isDeleting} onClick={() => mutate()}
                            className="p-2 text-gray-400 text-lg hover:text-red-500">
                        Delete
                    </button>
                </div>
            </section>}

            <section className="max-lg:hidden">
                <SupplierDetailsBarCard supplier={supplier}/>
            </section>

            <section className="lg:hidden">
                <SupplierDetailsCollapsible supplier={supplier}/>
            </section>

            <section className='flex-1 flex justify-center items-center'>
                <span>#TODO Reserved For Stock Order System</span>
            </section>
        </div>
    );
};

export default SupplierDetailsPage;
