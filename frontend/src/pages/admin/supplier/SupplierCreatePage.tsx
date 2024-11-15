import {FC} from 'react';
import SupplierCreateForm from "../../../components/supplier/SupplierCreateForm.tsx";
import HeaderText from "@/components/header/HeaderText.tsx";
import PageHeaderLink from "@/components/navigation/PageHeaderLink.tsx";

const SupplierCreatePage: FC = () => {
    return (
        <>
            <div className="flex justify-between">
                <HeaderText>Products</HeaderText>
                <PageHeaderLink link="/admin/product/list">
                    &lt; Back
                </PageHeaderLink>
            </div>
            <div className="flex justify-center">
                <div className="w-1/3">
                    <SupplierCreateForm />
                </div>
            </div>

        </>
    );
};

export default SupplierCreatePage;
