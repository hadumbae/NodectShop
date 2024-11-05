import {FC, PropsWithChildren} from 'react';
import { FaCloudUploadAlt } from "react-icons/fa";

interface FormInputWithButtonProps {
    inputType: string;
    name: string;
    placeholder?: string;

    value: string | number | readonly string[] | undefined;
    changeHandler: Function;
    submitHandler: Function;
    errors?: string[],

    required?: boolean;
    disabled?: boolean;
}

const FormInputWithButton: FC<PropsWithChildren<FormInputWithButtonProps>> = ({children, inputType, name, value, changeHandler, submitHandler, errors = [], required = false, disabled = false, placeholder}) => {
    const pushData = () => submitHandler(value);

    const handleKeyDown = (event: any) => {
        if (event.key === 'Enter') pushData();
    }

    return (
        <div>
            <div className="flex">
                <input type={inputType}
                       name={name}
                       placeholder={placeholder}

                       value={value}
                       onChange={(e) => changeHandler(e.target.value)}
                       onKeyDown={handleKeyDown}

                       disabled={disabled}
                       required={required}

                       className="
                        bg-gray-50
                        border
                        border-gray-300
                        text-gray-900
                        disabled:text-gray-400
                        text-sm
                        rounded-l-lg
                        focus:ring-blue-500
                        focus:border-blue-500
                        block
                        w-full
                        p-2.5"
                />

                <button className="bg-white border border-gray-300 rounded-r-lg px-3" onClick={pushData}>
                    {children ? children : <FaCloudUploadAlt/>}
                </button>

            </div>


            {errors.length > 0 &&
                <span className="text-red-500 text-sm">{errors[0]}</span>}
        </div>
    );
};

export default FormInputWithButton;
