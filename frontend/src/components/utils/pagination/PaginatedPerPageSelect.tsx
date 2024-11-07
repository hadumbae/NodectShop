import {FC} from 'react';

interface Props {
    value: number;
    setValue: (value: number) => void;
    paddingClass?: string;
}

const PaginatedPerPageSelect: FC<Props> = ({value, setValue, paddingClass = "p-2"}) => {
    return (
        <select
            name="perPage"
            id="perPage"
            value={value}
            className={ `${paddingClass} shadow-md bg-white border rounded-lg` }
            onChange={(e) => setValue(parseInt(e.target.value))}
        >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
            <option value="25">25</option>
            <option value="50">50</option>
        </select>
    );
};

export default PaginatedPerPageSelect;
