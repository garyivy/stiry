export const isNullOrWhitespace = (input ) => {
    return !input || input.replace(/\s/g, '').length < 1;
}