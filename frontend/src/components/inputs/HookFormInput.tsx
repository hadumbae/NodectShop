import {FC, useId} from 'react';
import {FieldError} from "react-hook-form";

interface Props {
    register: any,
    className?: string;
    label?: string;
    inputType: string;
    placeholder?: string;
    step?: number;
    error?: FieldError;
    disabled?: boolean;
}

const HookFormInput: FC<Props> = (
    {
        register,
        className,
        label,
        inputType,
        disabled = false,
        placeholder,
        step,
        error
    }) => {

    const forID = useId();

    return (
        <div className={className}>
            {label && <label htmlFor={forID}
                             className="block mb-0 text-sm font-medium text-gray-900">{label}</label>}
            <input type={inputType} id={forID}
                   {...register}
                   placeholder={placeholder}
                   disabled={disabled}
                   step={step}
                   className={
                       "bg-gray-50 border border-gray-300 text-gray-900 disabled:text-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                   }
            />
            {error &&
                <span className="text-red-500 text-sm">{ error.message }</span>}
        </div>
    );
};

export default HookFormInput;
