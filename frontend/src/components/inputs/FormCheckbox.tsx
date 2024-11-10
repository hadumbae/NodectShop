import {FC, useId} from 'react';

interface Props {
    className?: string;
    labelClasses?: string;
    label: string;

    value: boolean | undefined;
    changeHandler: Function;
    errors?: string[],

    required?: boolean;
    disabled?: boolean;
}

const FormCheckbox: FC<Props> = ({className, labelClasses = "ms-2 text-sm font-medium", label, value, changeHandler, errors = [], required = false, disabled = false}) => {
    const forID = useId();

    return (
        <div className={`flex flex-col ${className}`}>
            <div className="flex items-center">
                <input
                    id={forID}
                    type="checkbox"
                    checked={value}
                    onChange={(e) => changeHandler(e.target.checked)}
                    required={required}
                    disabled={disabled}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"/>
                <label
                    htmlFor={forID}
                    className={labelClasses}>
                    {label}
                </label>
            </div>
            {errors.length > 0 &&
                <span className="text-red-500 text-sm">{ errors[0] }</span>}
        </div>
    );
};

export default FormCheckbox;
