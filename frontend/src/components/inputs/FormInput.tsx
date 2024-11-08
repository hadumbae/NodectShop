import {FC, useId, useState} from 'react';

interface FormInputProps {
    className?: string;
    label?: string;
    inputType: string;
    name: string;
    id?: string;
    placeholder?: string;

    value?: string | number | readonly string[] | undefined;
    changeHandler?: Function;
    errors?: string[],

    required?: boolean;
    disabled?: boolean;
}

const FormInput: FC<FormInputProps> = ({className, label, inputType, name, value, changeHandler, errors = [], required = false, disabled = false, id, placeholder}) => {
    const forID = id ? `${id}-${useId()}` : useId();
    const [inputValue, setInputValue] = useState<string | number>("");

    return (
        <div className={className}>
            {label && <label htmlFor={forID}
                             className="block mb-0 text-sm font-medium text-gray-900">{label}</label>}
            <input type={inputType} id={forID}
                   name={name}
                   value={value ? value : inputValue}
                   placeholder={placeholder}
                   disabled={disabled}
                   required={required}

                   onChange={(e) => changeHandler ? changeHandler(e.target.value) : setInputValue(e.target.value)}

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
