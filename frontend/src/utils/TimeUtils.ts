export const getExpiryDate = (hours: number) => {
    const date = new Date();
    const hoursToAdd = hours * 60 * 60 * 1000;

    date.setTime(date.getTime() + hoursToAdd);
    return date;
}

export const expired = (expiryTimeString: number) => {
    return (Date.now() > expiryTimeString);
}