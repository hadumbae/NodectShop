import {useMemo} from "react";
import debounce from "lodash/debounce";

export const fetchValidationError = (accessor: string, errors: any[]) => {
    return errors.filter((error: any) => error.path === accessor).map((error: any) => error.msg);
}

export const transformCommaStringToArray = (input: string | null | undefined): string[] => (!input || input === "") ? [] : input.split(",");

export const onMemoChange = (setHandler: Function, duration: number = 500, dependicies: any[] = []) => useMemo(
    () => debounce(({target: {value}}) => { setHandler(value) }, duration), dependicies
);