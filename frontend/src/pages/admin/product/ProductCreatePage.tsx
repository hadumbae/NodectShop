import {FC} from 'react';
import ProductCreateForm from "../../../components/product/product/ProductCreateForm.tsx";
import HeaderText from "../../../components/header/HeaderText.tsx";
import PageHeaderLink from "../../../components/header/PageHeaderLink.tsx";

const ProductCreatePage: FC = () => {
    return (
        <div>
            <div className="flex justify-between">
                <HeaderText>Products</HeaderText>
                <PageHeaderLink link="/admin/product/list">
                    &lt; Back
                </PageHeaderLink>
            </div>
            <div className="flex justify-center">
                <div className="w-1/3">
                    <ProductCreateForm />
                </div>
            </div>
        </div>
    );
};

export default ProductCreatePage;
