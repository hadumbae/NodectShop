import {FC} from 'react';
import BasicCard from "../BasicCard.tsx";
import {Link} from "react-router-dom";
import _ from "lodash";
import {FaMagnifyingGlass} from "react-icons/fa6";
import {CategoryType} from "../../schema/CategorySchema.ts";

interface Props {
    category: CategoryType
}

const CategoryListCard: FC<Props> = ({category}) => {
    return (<BasicCard className="flex flex-col space-y-2">
            <div className="flex justify-between space-x-2">
                <h1 className="text-xl font-bold">{category.category}</h1>

                <Link className="border rounded-3xl p-3 hover:shadow-lg hover:text-blue-500 hover:border-blue-500"
                      to={`/admin/category/find/${category._id}/${_.kebabCase(category.category)}`}>
                    <FaMagnifyingGlass />
                </Link>
            </div>

            <div className="flex justify-between">
                <div>
                </div>

                <div className="flex space-x-2 items-end">
                    <span className="text-3xl">{category.products!.length}</span>
                    <span className="text-lg font-light">Products</span>
                </div>
            </div>
        </BasicCard>);
};

export default CategoryListCard;