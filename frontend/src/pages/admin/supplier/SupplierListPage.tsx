import {FC, useEffect, useState} from 'react';
import CreateSupplierForm from "../../../components/supplier/CreateSupplierForm.tsx";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {FaPlus, FaChevronDown} from "react-icons/fa";
import SupplierService from "../../../services/supplier/SupplierService.ts";
import {Supplier} from "../../../types/SupplierTypes.ts";
import SupplierDetailsCard from "../../../components/supplier/SupplierDetailsCard.tsx";
import Loader from "../../../components/utils/Loader.tsx";
import Pagination from "../../../components/utils/pagination/Pagination.tsx";

const SupplierListPage: FC = () => {
    const navigate = useNavigate();
    const {token, isAdmin} = useSelector((state:any) => state.authUser);

    if (!token) {
        toast.error("Unauthorized!");
        if (!isAdmin) navigate("/");
        navigate("/auth/login")
    }

    const [isLoading, setIsLoading] = useState(false);
    const [refetch, setRefetch] = useState(false);
    const [createToggle, setCreateToggle] = useState(false);

    const [suppliers, setSuppliers] = useState<Supplier[]>([]);
    const [totalItems, setTotalItems] = useState(0);
    const [page, setPage] = useState(1);

    // useEffect
    useEffect(() => {
        fetchSuppliers();
    }, [refetch, page]);

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

    const createHandler = () => {
        setCreateToggle(!createToggle);
        setRefetch(!refetch);
    }

    return (
        <div className="mt-5">
            {isLoading && <div className="text-center">
                <Loader loading={isLoading} />
            </div>}

            {!isLoading && <div className="flex justify-between items-center">
                <h1 className="text-3xl mb-5">Suppliers</h1>
                <button onClick={() => setCreateToggle(!createToggle)}
                        className="bg-white border border-2  rounded-xl p-4 hover:shadow-md">
                    {createToggle ? <FaChevronDown/> : <FaPlus/>}
                </button>
            </div>}

            {(createToggle && !isLoading) && (<div className="mt-3">
                <CreateSupplierForm onSuccess={createHandler}/>
            </div>)}

            {(!createToggle && !isLoading) && <div className="mt-3">
                {suppliers.length > 0 ? <div>
                    <div className="mt-5 grid grid-cols-2 gap-4">
                        {
                            suppliers.map((supplier) => <SupplierDetailsCard
                                key={supplier._id}
                                supplier={supplier}
                                onDelete={() => setRefetch(!refetch)}
                            />)
                        }
                    </div>

                    {(totalItems > 15) && <div>
                        <Pagination totalItems={totalItems}
                                    currentPage={page}
                                    perPage={15}
                                    setPage={setPage}/>
                    </div>}
                </div> : <div className="text-center">
                    <h1 className="text-xl font-bold">No Suppliers</h1>
                </div>}
            </div>}
        </div>
    );
};

export default SupplierListPage;
