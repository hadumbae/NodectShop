import {FC, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import SupplierService from "../../../services/supplier/SupplierService.ts";
import {CiGlobe} from "react-icons/ci";
import {FaPlus} from "react-icons/fa";
import _ from "lodash";
import SupplierContactPersonsList from "../../../components/supplier/contactperson/SupplierContactPersonsList.tsx";
import SupplierProductList from "../../../components/supplier/products/SupplierProductList.tsx";
import useSupplierParam from "../../../hooks/supplier/useSupplierParam.ts";
import useAdminToken from "../../../hooks/useAdminToken.ts";
import useFetchSupplier from "../../../hooks/supplier/useFetchSupplier.ts";

const SupplierDetailsPage: FC = () => {
    const navigate = useNavigate();

    const {token} = useAdminToken();
    const {supplierID} = useSupplierParam();

    const {supplier} = useFetchSupplier(supplierID!, token);
    const [isLoading, setIsLoading] = useState(false);

    const handleDelete = async () => {
        setIsLoading(true);
        const {status, payload} = await SupplierService.deleteSupplier(supplier!._id!, token);

        if (status === 200) {
            toast.success("Supplier deleted successfully.");
            navigate("/admin/supplier/list")
        } else {
            toast.error("Oops. Something bad happened!");
            console.error(`${status}: ${payload.message}`);
        }

        setIsLoading(false);
    }

    return (
        <div className="mt-5">
            {(!isLoading && supplier) && <div>
                {/* Header */}

                <div className="flex justify-between items-start ">

                    <div>
                        <h1 className="text-3xl">{supplier.name}</h1>
                        <a href={supplier.website}
                           target="_blank"
                           rel='noopener noreferrer'
                           className="text-sm flex items-center space-x-1 p-3 text-gray-400 hover:text-black hover:underline hover:underline-offset-8">
                            <CiGlobe/>
                            <span>Website</span>
                        </a>
                    </div>

                    <div className="flex space-x-2 items-center">
                        <Link to="/admin/supplier/list"
                              className="p-2 text-gray-400 text-lg hover:text-black hover:underline hover:underline-offset-8">
                            &lt; Index
                        </Link>
                        <Link to={`/admin/supplier/find/${supplier._id}/${_.kebabCase(supplier.name)}/contacts`}
                              className="p-2 text-gray-400 text-lg hover:text-black hover:underline hover:underline-offset-8">
                            Contacts
                        </Link>
                        <Link to={`/admin/supplier/edit/${supplier._id}/${_.kebabCase(supplier.name)}`}
                              className="p-2 text-gray-400 text-lg hover:text-black hover:underline hover:underline-offset-8">
                            Edit
                        </Link>
                        <button onClick={handleDelete}
                              className="p-2 text-gray-400 text-lg hover:text-red-500">
                            Delete
                        </button>
                    </div>
                </div>

                {/* Details */}

                <div className="bg-red-500 flex justify-center">
                    <div className="w-2/3 bg-blue-500">
                        Test
                    </div>
                </div>

                {/* Contact Persons */}

                <div className="mt-5 grid
                        gap-0 sm:gap-4
                        grid-cols-1 lg:grid-cols-3">
                    <div className="flex flex-col space-y-2">
                        <div className="flex justify-between items-center">
                            <h1 className="text-xl">Contact Persons</h1>
                            <Link to={`/admin/supplier/find/${supplier._id}/${_.kebabCase(supplier.name)}/create-contact`} className="p-2 border rounded-lg hover:shadow-md bg-white">
                                <FaPlus />
                            </Link>
                        </div>

                        <div>
                            <SupplierContactPersonsList supplier={supplier} />
                        </div>
                    </div>
                    <div className="col-span-2 mt-3 sm:mt-0">
                        <SupplierProductList supplierID={supplier._id} />
                    </div>
                </div>
            </div>}
        </div>
    );
};

export default SupplierDetailsPage;
