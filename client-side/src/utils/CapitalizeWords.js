export function CapitalizeWords(phrase) {

    if (!phrase) return "";
    return phrase
        .split(" ")
        .map(word => word ? word[0].toUpperCase() + word.slice(1).toLowerCase() : "")
        .join(" ");
}