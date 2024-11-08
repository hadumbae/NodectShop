import {FC} from 'react';

interface Props {
    value: number;
    setValue: (value: number) => void;
    paddingClass?: string;
    step?: number;
    init?: number;
    count?: number;
}

const PaginatedPerPageSelect: FC<Props> = ({value, setValue, paddingClass = "p-2", step = 5, init = 5, count = 5}) => {
    const options = [
        <option value={init}>{init}</option>
    ];

    for (let i = 1; i <= count; i++) {

        options.push(
            <option value={init + (step * i)}>{init + (step * i)}</option>
        );
    }


    return (
        <select
            name="perPage"
            id="perPage"
            value={value}
            className={ `${paddingClass} shadow-md bg-white border rounded-lg` }
            onChange={(e) => setValue(parseInt(e.target.value))}
        >
            {...options}
        </select>
    );
};

export default PaginatedPerPageSelect;
