import {FC} from 'react';
import {useParams} from "react-router-dom";
import useAdminToken from "../../../hooks/useAdminToken.ts";
import Loader from "../../../components/utils/Loader.tsx";
import _ from "lodash";
import useFetchSupplier from "@/hooks/supplier/useFetchSupplier.ts";
import HeaderText from "@/components/header/HeaderText.tsx";
import PageHeaderLink from "@/components/navigation/page.header.link.tsx";
import SupplierForm from "@/components/forms/supplier/supplier.form.tsx";

const SupplierEditPage: FC = () => {
    const {supplierID} = useParams();
    const {token} = useAdminToken();

    const {supplier, isPending} = useFetchSupplier(supplierID!, token);

    if (isPending) {
        return (<div className="h-full flex justify-center items-center">
            <Loader loading={isPending} />
        </div>);
    }

    return (
        <div className="space-y-5">
            <section className="flex justify-between items-center">
                <HeaderText>{supplier ? supplier.name : "Edit Supplier"}</HeaderText>
                <PageHeaderLink link={`/admin/supplier/find/${supplierID}/${_.kebabCase(supplier?.name)}`}>
                    &lt; Back
                </PageHeaderLink>
            </section>

            {(!isPending && supplier) && <div className="mt-4">
                <SupplierForm supplier={supplier} />
            </div>}
        </div>
    );
};

export default SupplierEditPage;
