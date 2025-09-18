export function FormatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // meses começam em 0
    const year = date.getUTCFullYear();
    return `${day}/${month}/${year}`;
}