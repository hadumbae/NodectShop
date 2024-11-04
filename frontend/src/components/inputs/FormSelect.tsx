import {FC, useId, useState} from 'react';

interface FormSelectProps {
    label: string;
    inputType: string;
    name: string;
    value?: string | number | readonly string[] | undefined,
    errors?: string[],
    required?: boolean;
    disabled?: boolean;
    id?: string;
    placeholder?: string;
}

const FormSelect: FC<FormSelectProps> = ({label, inputType, name, value = "", errors = [], required = false, disabled = false, id, placeholder}) => {
    const forID = id ? `${id}-${useId()}` : useId();
    const [inputValue, setInputValue] = useState(value);

    return (
        <div>
            <label htmlFor={forID}
                   className="block mb-2 text-sm font-medium text-gray-900">{label}</label>
            <input type={inputType} id={forID}
                   name={name}
                   className="
                        bg-gray-50
                        border
                        border-gray-300
                        text-gray-900
                        disabled:text-gray-400
                        text-sm
                        rounded-lg
                        focus:ring-blue-500
                        focus:border-blue-500
                        block
                        w-full
                        p-2.5"
                   value={inputValue}
                   onChange={(e) => setInputValue(e.target.value)}
                   placeholder={placeholder}
                   disabled={disabled}
                   required={required}
            />
            {errors.length > 0 &&
                <span className="text-red-500 text-sm">{errors[0]}</span>}
        </div>
    );
};

export default FormSelect;
