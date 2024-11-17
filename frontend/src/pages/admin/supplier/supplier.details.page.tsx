import {FC, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import SupplierService from "../../../services/supplier/SupplierService.ts";
import {CiGlobe} from "react-icons/ci";
import _ from "lodash";
import useSupplierParam from "../../../hooks/supplier/useSupplierParam.ts";
import useAdminToken from "../../../hooks/useAdminToken.ts";
import useFetchSupplier from "../../../hooks/supplier/useFetchSupplier.ts";
import SupplierDetailsCard from "@/components/supplier/SupplierDetailsCard.tsx";
import Loader from "@/components/utils/Loader.tsx";

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
       <div className="space-y-5">

            <section className="flex flex-col space-y-3 md:flex-row md:justify-between md:items-center md:space-y-0">
               <div>
                   <h1 className="text-3xl truncate">{supplier?.name || "Category"}</h1>
                   <div>
                       {supplier && <a href={supplier.website}
                                       target="_blank"
                                       rel='noopener noreferrer'
                                       className="text-sm flex items-center space-x-1 text-gray-400 hover:text-black hover:underline hover:underline-offset-8">
                           <CiGlobe/>
                           <span>Website</span>
                       </a>}
                   </div>
               </div>

               {supplier && <div className="flex justify-center space-x-2 items-center">
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
                   <button disabled={isLoading} onClick={handleDelete}
                           className="p-2 text-gray-400 text-lg hover:text-red-500">
                       Delete
                   </button>
               </div>}
            </section>

           {isLoading && <section className="text-center">
               <Loader loading={isLoading}/>
           </section>}

           {!isLoading && <section className="grid grid-cols-1 md:grid-cols-3 md:gap-4">
               <div>
                   {supplier && <SupplierDetailsCard supplier={supplier}/>}
               </div>
           </section>}

       </div>
    );
};

export default SupplierDetailsPage;
