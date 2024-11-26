import {FC} from 'react';
import HeaderText from "../../../components/header/HeaderText.tsx";
import PageHeaderLink from "../../../components/navigation/page.header.link.tsx";
import ProductCreateForm from "@/components/forms/product/product.create.form.tsx";
import {useNavigate} from "react-router-dom";
import {ZProduct} from "@/schema/product.validate.schema.ts";
import _ from "lodash";

const ProductCreatePage: FC = () => {
    const navigate = useNavigate();

    const onSuccess = (product: ZProduct) => {
        navigate(`/admin/product/find/${product._id}/${_.kebabCase(product.title)}`);
    }

    return (
        <div className="flex flex-col space-y-2">

            <section className="flex justify-between">
                <HeaderText>Products</HeaderText>

                <PageHeaderLink link="/admin/product/list">
                    &lt; List
                </PageHeaderLink>
            </section>

            <section className="flex justify-center">
                <div className="w-full md:w-1/3">
                    <ProductCreateForm onSuccess={onSuccess} />
                </div>
            </section>
        </div>
    );
};

export default ProductCreatePage;
