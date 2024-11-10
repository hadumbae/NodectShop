import {FC, useState} from 'react';
import FormFileMultiInput from "../../../inputs/FormFileMultiInput.tsx";
import Button from "../../../inputs/Button.tsx";
import FormFileInputList from "../../../inputs/FormFileInputList.tsx";
import ProductSKUImageService from "../../../../services/product/ProductSKUImageService.ts";
import useAdminToken from "../../../../hooks/useAdminToken.ts";
import {toast} from "react-toastify";
import {fetchValidationError} from "../../../../utils/FormUtils.ts";
import Loader from "../../../utils/Loader.tsx";

interface Props {
    skuID: string;
    onUpload: Function,
}

const ProductSKUImageUploadCard: FC<Props> = ({skuID, onUpload}) => {
    const {token} = useAdminToken();
    const [images, setImages] = useState<{[key: string]: File}>({});
    const [validationErrors, setValidationErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const submitHandler = async (event: React.SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();

        setIsLoading(true);

       const formData: any = new FormData();

       formData.append("skuID", skuID);

        for (const entry of Object.entries(images)) {
            formData.append(`images`, entry[1], entry[1].name);
        }

        const {status, payload} = await ProductSKUImageService.uploadSKUImages(formData, token);

        if (status === 200) {
            toast.success("File Uploaded Successfully.");
            onUpload(payload.data.images);

            setImages({});
            setIsLoading(false);
        } else {
            if(payload.errors) setValidationErrors(payload.errors)
            console.error(`${status} : ${payload.message}`)

            setIsLoading(false);
        }
    }

    return (
        <div className="bg-white border shadow-md rounded-md p-4 felx flex-col space-y-5">
            <h1 className="text-xl">Upload SKU Image</h1>
            {isLoading && <div className="text-center">
                <Loader loading={isLoading} />
            </div>}

            {!isLoading && <form onSubmit={submitHandler} className="flex flex-col space-y-2">
                <FormFileMultiInput errors={fetchValidationError("images", validationErrors)}
                                    changeHandler={setImages}/>

                {Object.keys(images).length > 0 && <FormFileInputList files={Object.values(images)}/>}

                <div className="text-right">
                    <Button type={"submit"}>
                        Upload
                    </Button>
                </div>
            </form>}
        </div>
    );
};

export default ProductSKUImageUploadCard;
