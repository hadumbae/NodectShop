export const fetchValidationError = (accessor: string, errors: any[]) => {
    return errors.filter((error: any) => error.path === accessor).map((error: any) => error.msg);
}

export const setHookError = (accessor: string, setError: Function, errors: any[]) => {
    const filteredErrors = errors.filter((error: any) => error.path === accessor);

    if (filteredErrors.length > 0) {
        setError(accessor, {type: "custom", message: filteredErrors[0].msg});
        return true;
    }

    return false;
}