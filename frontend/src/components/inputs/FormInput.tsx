import {FC, useId} from 'react';

interface FormInputProps {
    className?: string;
    label: string;
    inputType: string;
    name: string;
    id?: string;
    placeholder?: string;

    value: string | number | readonly string[] | undefined;
    changeHandler: Function;
    errors?: string[],

    required?: boolean;
    disabled?: boolean;
}

const FormInput: FC<FormInputProps> = ({className, label, inputType, name, value, changeHandler, errors = [], required = false, disabled = false, id, placeholder}) => {
    const forID = id ? `${id}-${useId()}` : useId();

    return (
        <div className={className}>
            <label htmlFor={forID}
                            className="block mb-2 text-sm font-medium text-gray-900">{label}</label>
            <input type={inputType} id={forID}
                   name={name}
                   value={value}
                   placeholder={placeholder}
                   disabled={disabled}
                   required={required}

                   onChange={(e) => changeHandler(e.target.value)}

                   className={
                       "bg-gray-50 border border-gray-300 text-gray-900 disabled:text-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                   }
            />
            {errors.length > 0 &&
                <span className="text-red-500 text-sm">{ errors[0] }</span>}
        </div>
    );
};

export default FormInput;
