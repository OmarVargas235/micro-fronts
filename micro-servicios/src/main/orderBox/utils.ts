export const currentDate = (): string => {

    const date = new Date().toLocaleDateString().split('/');
    const [day, month, year] = date;

    return `${year}-${month.length === 1 ? '0'+month : month}-${day.toString().length === 1 ? '0'+day.toString() : day}`;
}

export enum Views {
    orderBox = 1,
    voucher,
    summary
}