import {FC, useState} from 'react';
import {Supplier} from "../../types/SupplierTypes.ts";
import {MdAlternateEmail} from "react-icons/md";
import {FaPhone, FaFax, FaTrash} from "react-icons/fa";
import {Link} from "react-router-dom";
import {FaMagnifyingGlass} from "react-icons/fa6";
import {useSelector} from "react-redux";
import {toast} from "react-toastify";
import SupplierService from "../../services/supplier/SupplierService.ts";
import _ from "lodash";

interface Props {
    supplier: Supplier;
    onDelete: (supplierID: string) => void;
}

const SupplierDetailsCard: FC<Props> = ({supplier, onDelete}) => {
    const {token, isAdmin} = useSelector((state: any) => state.authUser);
    const [isLoading, setIsLoading] = useState(false);

    const handleDelete = async () => {
        if (!token || !isAdmin) {
            toast.error("Unauthorized!");
            return
        }

        setIsLoading(true);

        const {status, payload} = await SupplierService.deleteSupplier(supplier._id!, token);


        if (status === 200) {
            toast.success("Supplier deleted successfully.");
            onDelete(supplier._id!);
        } else {
            toast.error("Oops. Something bad happened!");
            console.error(`${status}: ${payload.message}`);
        }

        setIsLoading(false);
    }

    return (
        <div className="bg-white border rounded-lg shadow-md p-5 flex flex-col space-y-4">
            <div className="
                    flex flex-col justify-center items-center
                    md:flex-row md:justify-between
                ">

                {/* Supplier Details */}

                <h1 className="text-2xl">{supplier.name}</h1>


                {/* Details And Delete */}

                <div className="flex justify-center items-center">
                    <Link to={`/admin/supplier/find/${supplier._id}/${_.kebabCase(supplier.name)}`}
                          className="text-gray-400 hover:text-yellow-500 p-3">
                        <FaMagnifyingGlass/>
                    </Link>
                    <button className="text-gray-600 disabled:text-gray-200 hover:text-red-500 p-3" onClick={handleDelete} disabled={isLoading}>
                        <FaTrash/>
                    </button>
                </div>

            </div>

            {/* Supplier Contact Details */}

            <div className="flex justify-center items-center space-x-3 flex-wrap -mt-2">
                <a href={supplier.website}
                                              className="mt-2 text-sm border border-gray-200 rounded-xl p-2 flex justify-center items-center space-x-1 hover:shadow-md hover:border-black">
                    <MdAlternateEmail/>
                    <span>Website</span>
                </a>
                {supplier.contact.email && <a href={`mailto:${supplier.contact.email}`}
                                              className="mt-2 text-sm border border-gray-200 rounded-xl p-2 flex justify-center items-center space-x-1 hover:shadow-md hover:border-black">
                    <MdAlternateEmail/>
                    <span>Email</span>
                </a>}
                {supplier.contact.phone && <a href={`tel:${supplier.contact.phone}`}
                                              className="mt-2 text-sm border border-gray-200 rounded-xl p-2 flex justify-center items-center space-x-3 hover:shadow-md hover:border-black">
                    <FaPhone/>
                    <span>Call</span>
                </a>}
                {supplier.contact.fax && <a href={`fax:${supplier.contact.fax}`}
                                            className="mt-2 text-sm border border-gray-200 rounded-xl p-2 flex justify-center items-center space-x-3 hover:shadow-md hover:border-black">
                    <FaFax/>
                    <span>Fax</span>
                </a>}
            </div>

            {/* Supplier Address */}
            <div className="text-center">
                <span className="text-sm font-extralight">{supplier.address.street}, {supplier.address.city}, {supplier.address.state}, {supplier.address.country}</span>
            </div>
        </div>
    );
};

export default SupplierDetailsCard;
