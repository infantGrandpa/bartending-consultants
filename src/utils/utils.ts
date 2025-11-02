const isDev = true;

export function isDevEnv() {
    return isDev;
}

export function stripMarkdownFromString(inputString: string) {
    let strippedString = inputString;

    // Remove headers (# ## ### etc.)
    strippedString = strippedString.replace(/^#{1,6}\s+/gm, '');

    // Remove bold (**text** or __text__)
    strippedString = strippedString.replace(/(\*\*|__)(.*?)\1/g, '$2');

    // Remove italic (*text* or _text_)
    strippedString = strippedString.replace(/([*_])(.*?)\1/g, '$2');

    // Remove strikethrough (~~text~~)
    strippedString = strippedString.replace(/~~(.*?)~~/g, '$1');

    // Remove inline code (`text`)
    strippedString = strippedString.replace(/`([^`]+)`/g, '$1');

    // Remove links [text](url)
    strippedString = strippedString.replace(/\[([^\]]+)]\([^)]+\)/g, '$1');

    // Remove images ![alt](url)
    strippedString = strippedString.replace(/!\[([^\]]*)]\([^)]+\)/g, '$1');

    return strippedString;
}