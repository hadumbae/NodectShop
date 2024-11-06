import {FC, useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {Supplier} from "../../../types/SupplierTypes.ts";
import {Link, useNavigate, useParams} from "react-router-dom";
import {toast} from "react-toastify";
import SupplierService from "../../../services/supplier/SupplierService.ts";
import {CiGlobe} from "react-icons/ci";
import {FaPlus} from "react-icons/fa";

const SupplierDetailsPage: FC = () => {
    const navigate = useNavigate();
    const {supplierID} = useParams();

    if (!supplierID) {
        toast.error("Invalid Supplier ID");
        navigate("/admin/supplier/list");
    }

    const {token , isAdmin} = useSelector((state: any) => state.authUser);

    if (!token) {
        toast.error("Unauthorized!");
        if (!isAdmin) navigate("/");
        navigate("/auth/login")
    }

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

                <div className="flex justify-between items-center">
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
                              className="p-3 text-gray-400 text-lg hover:text-black hover:underline hover:underline-offset-8">
                            &lt; Index
                        </Link>
                        <Link to={`/admin/supplier/edit/${supplier._id}`}
                              className="p-3 text-gray-400 text-lg hover:text-black hover:underline hover:underline-offset-8">
                            Edit
                        </Link>
                        <button onClick={handleDelete}
                              className="p-5 text-gray-400 text-lg hover:text-red-500">
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

                <div className="mt-5 flex grid grid-cols-2 gap-4">
                    <div>
                        <div className="flex justify-between items-center">
                            <h1 className="text-xl">Contact Persons</h1>
                            <Link to="/" className="p-2 border rounded-xl hover:shadow-md bg-white">
                                <FaPlus />
                            </Link>
                        </div>
                    </div>
                    <div>
                        <h1 className="text-xl">Products</h1>
                    </div>
                </div>
            </div>}
        </div>
    );
};

export default SupplierDetailsPage;
