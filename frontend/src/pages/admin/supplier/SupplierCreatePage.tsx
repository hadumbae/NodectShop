import {FC} from 'react';
import HeaderText from "@/components/header/HeaderText.tsx";
import PageHeaderLink from "@/components/navigation/page.header.link.tsx";
import SupplierForm from "@/components/forms/supplier/supplier.form.tsx";

const SupplierCreatePage: FC = () => {
    return (
        <div className="space-y-5">
            <section className="flex justify-between">
                <HeaderText>Supplier</HeaderText>
                <PageHeaderLink link="/admin/supplier/list">
                    &lt; Index
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
