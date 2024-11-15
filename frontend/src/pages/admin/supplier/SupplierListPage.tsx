import {FC, useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {FaPlus} from "react-icons/fa";
import SupplierService from "../../../services/supplier/SupplierService.ts";
import {Supplier} from "../../../types/SupplierTypes.ts";
import SupplierDetailsCard from "../../../components/supplier/SupplierDetailsCard.tsx";
import Loader from "../../../components/utils/Loader.tsx";
import Pagination from "../../../components/utils/pagination/Pagination.tsx";
import PageHeaderLink from "@/components/navigation/PageHeaderLink.tsx";

const SupplierListPage: FC = () => {
    const navigate = useNavigate();
    const {token, isAdmin} = useSelector((state:any) => state.authUser);

    if (!token) {
        toast.error("Unauthorized!");
        if (!isAdmin) navigate("/");
        navigate("/auth/login")
    }

    const [isLoading, setIsLoading] = useState(false);

    const [suppliers, setSuppliers] = useState<Supplier[]>([]);
    const [totalItems, setTotalItems] = useState(0);
    const [page, setPage] = useState(1);

    // useEffect
    useEffect(() => {
        fetchSuppliers();
    }, [page]);

    // fetchSuppliers
    const fetchSuppliers = async () => {
        try {
            setIsLoading(true);
            const {status, payload} = await SupplierService.fetchPaginatedSuppliers(page, 15, token);

            if (status === 200) {
                setSuppliers(payload.data.suppliers);
                setTotalItems(payload.data.totalItems);
                setIsLoading(false);
            } else {
                toast.error("Oops. Failed in fetching suppliers. Something bad happened.");
                console.error(`${status} : ${payload.message}`)
            }
        } catch (error) {
            toast.error("Oops. Something bad happened.");
            setIsLoading(false);
        }
    }

    return (<>
            {isLoading ?
                    <div className="text-center">
                        <Loader loading={isLoading}/>
                    </div> :
                    <div className="flex flex-col justify-between space-y-2 p-2">
                        <div className="flex justify-between items-center">
                            <h1 className="text-2xl font-bold">Suppliers</h1>

                            <PageHeaderLink link={"/admin/supplier/create"}>
                                <FaPlus />
                            </PageHeaderLink>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            {suppliers.map((supplier: any) => <SupplierDetailsCard key={supplier._id} supplier={supplier} onDelete={() => console.log("Deleted.")} />) }
                        </div>

                        <div className={(totalItems <= 10) ? "hidden" : ""}>
                            <Pagination totalItems={totalItems} currentPage={page} perPage={10} setPage={setPage} />
                        </div>
                    </div>
            }
    </>);
};

export default SupplierListPage;
