import md5 from 'md5';

const palette = [
    "orange",
    "pink",
    "blue",
    "green",
    "dark",
    "red",
    "yellow",
    "purple",
    "gray",
]

const cint = (n: number): number => Math.floor(n); // casteo entero

export const get_palette = (txt: string) => {
    if (!txt) return palette[8]; // breaks when undefined
    var idx = cint((parseInt(md5(txt).substr(4, 2), 16) + 1) / 5.33);
    return palette[idx % 8];
}

export const get_abbr = (txt?: string, max_length: number = 2): string => {
    if (!txt) return "";

    let abbr = "";
    const words = capitalizeWords(txt).split(" ");

    for (const w of words) {
        if (abbr.length >= max_length) {
            break;
        } else if (!w.trim().length) {
            continue;
        }
        abbr += w.trim()[0];
    }

    return abbr || "?";
}

export const capitalizeWords = (text?: string): string => {
    return (text || "")
        .toLowerCase()
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}

export const get_color = (name: string) => {
    return get_palette(capitalizeWords(name));
}

export const formatTime = (date: string): string => {
    const inputDate = new Date(date);
    const now = new Date();

    let diffMs = now.getTime() - inputDate.getTime();

    // Asegurarse de que no sea negativo
    if (diffMs < 0) diffMs = 0;

    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
    const diffMinutes = Math.floor((diffMs / (1000 * 60)) % 60);
    const diffSeconds = Math.floor((diffMs / 1000) % 60);

    const pad = (n: number) => n.toString().padStart(2, '0');

    const timeStr = `${pad(diffHours)}:${pad(diffMinutes)}:${pad(diffSeconds)}`;
    return diffDays > 0 ? `${diffDays}d ${timeStr}` : timeStr;
}