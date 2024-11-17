import {FC} from 'react';
import HeaderText from "@/components/header/HeaderText.tsx";
import PageHeaderLink from "@/components/navigation/PageHeaderLink.tsx";
import SupplierForm from "@/components/supplier/SupplierForm.tsx";

const SupplierCreatePage: FC = () => {
    return (
        <div className="space-y-5">
            <section className="flex justify-between">
                <HeaderText>Products</HeaderText>
                <PageHeaderLink link="/admin/product/list">
                    &lt; Back
                </PageHeaderLink>
            </section>
            <div className="flex justify-center">
                <div className=" w-full lg:w-1/2">
                    <SupplierForm />
                </div>
            </div>

        </div>
    );
};

export default SupplierCreatePage;
