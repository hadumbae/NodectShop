import {FC, useId} from 'react';

interface FormInputProps {
    className?: string;
    label?: string;

    changeHandler: Function;
    errors?: string[],

    required?: boolean;
    disabled?: boolean;
}

const FormFileInput: FC<FormInputProps> = ({className, label, changeHandler, errors = [], required = false, disabled = false}) => {
    const forID = useId();

    return (
        <div className={className}>
            {label && <label htmlFor={forID}
                             className="block mb-0 text-sm font-medium text-gray-900">{label}</label>}
            <input type="file" id={forID}
                   disabled={disabled}
                   required={required}
                   onChange={(e) => changeHandler(e.target.files)}
                   className={
                       "bg-gray-50 border border-gray-300 text-gray-900 disabled:text-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                   }
            />
            {errors.length > 0 &&
                <span className="text-red-500 text-sm">{ errors[0] }</span>}
        </div>
    );
};

export default FormFileInput;
