import {FC, useState} from 'react';
import {FaPlus} from "react-icons/fa";
import SupplierListCard from "../../../components/supplier/SupplierListCard.tsx";
import Loader from "../../../components/utils/Loader.tsx";
import Pagination from "../../../components/utils/pagination/Pagination.tsx";
import PageHeaderLink from "@/components/navigation/page.header.link.tsx";
import useAdminToken from "@/hooks/useAdminToken.ts";
import useFetchPaginatedSuppliers from "@/hooks/supplier/useFetchPaginatedSuppliers.ts";
import HeaderText from "@/components/header/HeaderText.tsx";

const SupplierListPage: FC = () => {
    const {token} = useAdminToken();
    const [page, setPage] = useState(1);

    const {data, isPending, isSuccess, isError, error} = useFetchPaginatedSuppliers(page, 20, token);

    if (isPending) {
        return (<div className="flex justify-center items-center h-full">
            <Loader loading={true} />
        </div>);
    }

    if (isError) {
        return (<div className="flex flex-col justify-center items-center h-full">
            <span className="text-red-500">Oops. Something bad happened!</span>
            <span className="text-gray-400">{error!.message}</span>
        </div>);
    }

    return (
        <div className="flex flex-col justify-between space-y-2 p-2">
            <section className="flex justify-between items-center">
                <HeaderText>Suppliers</HeaderText>

                <PageHeaderLink link={"/admin/supplier/create"}>
                    <FaPlus />
                </PageHeaderLink>
            </section>

            {isSuccess && <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {data.suppliers.map((supplier: any) => <SupplierListCard key={supplier._id} supplier={supplier}
                                                                         onDelete={() => console.log("Deleted.")}/>)}
            </section>}

            {isSuccess && <section className={(data.totalItems <= 10) ? "hidden" : ""}>
                <Pagination totalItems={data.totalItems} currentPage={page} perPage={10} setPage={setPage}/>
            </section>}
        </div>
    );
};

export default SupplierListPage;
