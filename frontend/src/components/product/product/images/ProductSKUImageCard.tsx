import {FC, useState} from 'react';
import {ProductSKUImage} from "../../../../types/ProductTypes.ts";
import {FaCheck, FaStar, FaTrash} from "react-icons/fa";
import ProductSKUImageService from "../../../../services/product/sku/ProductSKUImageService.ts";
import useAdminToken from "../../../../hooks/useAdminToken.ts";
import {toast} from "react-toastify";
import Loader from "../../../utils/Loader.tsx";

interface Props {
    image: ProductSKUImage;
    onChange: Function;
}

const ProductSKUImageCard: FC<Props> = ({image, onChange}) => {
    const {token} = useAdminToken();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const markAsPrimary = async () => {
        setIsLoading(true);
        const {status, payload} = await ProductSKUImageService.markAsPrimary(image._id, token);

        if (status === 200) {
            toast.success("Image marked as primary.");
            onChange(payload.data.images);
        } else {
            toast.error("Oops. Something bad happened.");
            console.error(`${status} : ${payload.message}`);
        }

        setIsLoading(false);
    }

    const deleteImage = async () => {
        setIsLoading(true);
        const {status, payload} = await ProductSKUImageService.deleteSKUImage(image._id, token);

        if (status === 200) {
            toast.success("Image removed successfully.");
            onChange(payload.data.images);
        } else {
            toast.error("Oops. Something bad happened.");
            console.error(`${status} : ${payload.message}`);
        }

        setIsLoading(false);
    }

    return (
        <div className="bg-white shadow-md rounded-lg border flex flex-col space-y-2">
            <div className="h-72 flex justify-center items-center overflow-hidden">
                <img src={image.secure_url} className="object-cover min-h-full min-w-full" />
            </div>
            {isLoading && <div className="flex justify-center items-center p-5">
                <Loader loading={isLoading} size={50} />
            </div>}

            {!isLoading && <div className="flex justify-center items-center p-5 space-x-6">
                {image.isPrimary && <FaStar className="text-2xl text-yellow-500" />}
                <button onClick={markAsPrimary} className="border rounded-3xl p-3 hover:text-green-500 hover:border-green-500">
                    <FaCheck/>
                </button>
                <button onClick={deleteImage}
                        className="border rounded-3xl p-3 hover:text-red-500 hover:border-red-500">
                    <FaTrash/>
                </button>
            </div>}
        </div>
    );
};

export default ProductSKUImageCard;
