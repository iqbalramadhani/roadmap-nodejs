// Named exports

// Ubah huruf pertama jadi besar
export function capitalize(str: string): string {
    if(!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Balik string
export function reverse(str: string): string {
    if(!str) return "";
    return str.split("").reverse().join("");
}