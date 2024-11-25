import {FC, useRef} from 'react';
import _ from "lodash";
import {Link, useNavigate} from "react-router-dom";
import {FaMagnifyingGlass, FaPencil} from "react-icons/fa6";
import {ZProduct} from "@/schema/product.validate.ts";

import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/components/ui/card.tsx";

import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription
} from "@/components/ui/dialog.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {ChevronsUpDown} from "lucide-react";

interface Props {
    product: ZProduct;
}

const ProductListCard: FC<Props> = ({product}) => {
    const navigate = useNavigate();
    const totalStock = useRef(product.skus.reduce((acc, cur) => acc + cur.unitStock, 0));
    const availableSKUs = useRef(product.skus.filter(sku => !sku.isDiscontinued).length);

    const onClick = () => {
        navigate(`/admin/product/find/${product._id}/${_.kebabCase(product.title)}`);
    };

    return (<Card className="rounded-lg hover:cursor-pointer" onClick={onClick}>
        <div className="grid grid-cols-4 h-full">
            <div className="rounded-l-lg flex justify-center items-center">
                <img src={product.image.secure_url} className="object-cover h-full" alt="Product Image" />
            </div>
            <div className="col-span-3">
                <CardHeader className="p-4">
                    <CardTitle>{product.title}</CardTitle>
                </CardHeader>

                <CardContent className="p-4 pt-0 space-y-4">
                    <div className="flex justify-between">
                        Description

                        <Dialog>
                            <DialogTrigger>
                                <ChevronsUpDown />
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Description</DialogTitle>
                                    <DialogDescription className="text-justify">
                                        {product.description}
                                    </DialogDescription>
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>
                    </div>

                    <div className="flex flex-col space-y-2">
                        <span className="font-bold">Types</span>
                        <div className="flex flex-wrap space-x-2 -mt-2">
                            {
                                product.types.length === 0 ?
                                    <Badge>None</Badge> :
                                    product.types.map((type: string, index: number) => <Badge
                                        key={index}
                                        variant="outline"
                                        className="border-secondary text-secondary mt-2"
                                    >
                                        {type}
                                    </Badge>)
                            }
                        </div>
                    </div>

                    <div className="flex flex-col space-y-2">
                        <span className="font-bold">Tags</span>
                        <div className="flex flex-wrap space-x-2 -mt-2">
                            {
                                product.tags.length === 0 ?
                                    <Badge>None</Badge> :
                                    product.tags.map((tag: string, index: number) => <Badge
                                        key={index}
                                        variant="outline"
                                        className="border-secondary text-secondary mt-2 uppercase"
                                    >
                                        {tag}
                                    </Badge>)
                            }
                        </div>
                    </div>
                </CardContent>
            </div>
        </div>
    </Card>);

    return (
        <div className="bg-white shadow-md border rounded-lg h-96">
            <div className="rounded-t-lg bg-gray-400 h-1/3 flex justify-center items-center overflow-hidden">
                <img src={product.image.secure_url} className="object-cover" alt="Product Image" />
            </div>


            <div className="p-3 h-2/3 flex flex-col justify-between space-y-3">
                <div>
                    <h1 className="text-lg line-clamp-2 text-justify">{product.title}</h1>
                </div>

                <blockquote className="line-clamp-3 text-sm text-justify px-6 text-gray-400 hover:text-black">
                    {product.description}
                </blockquote>

                <div className="flex justify-between">
                    <span className="text-sm border p-2 rounded-xl">
                        Available SKUs : <span>{availableSKUs.current} / {product.skus.length}</span>
                    </span>

                    <span className="text-sm border p-2 rounded-xl">
                        Total Stock : <span>{totalStock.current}</span>
                    </span>
                </div>

                <div className="flex justify-center space-x-6">
                    <Link className="text-md p-2 border rounded-3xl text-gray-400 hover:text-green-600 hover:border-green-600" to={`/admin/product/find/${product._id}/${_.kebabCase(product.title)}`}>
                        <FaMagnifyingGlass />
                    </Link>

                    <Link className="text-md p-2 border rounded-3xl text-gray-400 hover:text-blue-600 hover:border-blue-600" to={`/admin/product/edit/${product._id}/${_.kebabCase(product.title)}`}>
                        <FaPencil />
                    </Link>
                </div>
            </div>


        </div>
    );
};

export default ProductListCard;
