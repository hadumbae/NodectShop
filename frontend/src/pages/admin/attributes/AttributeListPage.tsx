import {FC, useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

import Loader from "../../../components/utils/Loader.tsx";
import ProductAttributeCreateForm
    from "../../../components/product/attribute/ProductAttributeCreateForm.tsx";

import ProductAttributeService from "../../../services/product/attribute/ProductAttributeService.ts";
import ProductAttributeDetailsCard from "../../../components/product/attribute/ProductAttributeDetailsCard.tsx";
import {ProductAttributeType} from "../../../types/ProductAttributeTypes.ts";

const AttributeListPage: FC = () => {
    const navigate = useNavigate();
    const {token, isAdmin} = useSelector((state: any) => state.authUser);

    if (!isAdmin) {
        navigate('/');
    }

    const [error, setError] = useState<any>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [attributes, setAttributes] = useState<ProductAttributeType[]>([]);
    const [refetch, setRefetch] = useState<boolean>(false);

    const [totalItems, setTotalItems] = useState<number>(0);
    const [page, setPage] = useState<number>(1)
    const [perPage, setPerpage] = useState<number>(15);

    useEffect(() => {
        fetchAttributes();
    }, [page, perPage, refetch]);

    const fetchAttributes: Function = async () => {
        setIsLoading(true);

        try {
            const {status, payload} = await ProductAttributeService.fetchProductAttributesPaginated(page, perPage, token);

            if(status === 200) {
                setAttributes(payload.data);
                setTotalItems(payload.totalItems);
                setIsLoading(false);
            } else {
                toast.error("Error!");
                setError(payload.message);
            }
        } catch (error) {
            toast.error("Error!")
            console.error(error)
            error && setError(error);
        }
    }

    // create - component - ProductAttributeListCard (w-1/2 list)
    // create - component - ProductAttributeOptionCreateForm

    // ProductAttributeListCard - dblclick (switch title, edit form)
    // ProductAttributeListCard - Option List/Create Form

    return (
        <div>
            <div className="flex justify-between mt-5">
                <h1 className="text-3xl">Product Attributes</h1>
                <div className="w-1/3">
                    <ProductAttributeCreateForm refetch={() => setRefetch(!refetch)}/>
                </div>
            </div>

            {error && <div className="text-center mt-5">
                <p className="text-red-500">{error}</p>
            </div>}

            {isLoading && <div className="mt-10 text-center">
                <Loader loading={isLoading}/>
            </div>}

            {!isLoading && <div className="mt-5 border-t">
                    <div className="mt-5 px-5 grid grid-cols-3 gap-4">
                        {attributes.map((attribute: ProductAttributeType) => <div key={attribute._id}>
                            <ProductAttributeDetailsCard attribute={attribute} onDelete={() => setRefetch(!refetch)} />
                        </div>)}
                    </div>
                </div>}
        </div>
    );
};

export default AttributeListPage;
