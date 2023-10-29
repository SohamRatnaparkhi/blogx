export const handleBold = (setString: (arg0: (prev: string) => string) => void, cursorSelectStart: number, cursorSelectEnd: number) => {
    setString((prev: string) => {
        return prev.slice(0, cursorSelectStart) + "**" + prev.slice(cursorSelectStart, cursorSelectEnd) + "**" + prev.slice(cursorSelectEnd);
    });
};

export const handleItalics = (setString: (arg0: (prev: string) => string) => void, cursorSelectStart: number, cursorSelectEnd: number) => {
    setString((prev: string) => {
        return prev.slice(0, cursorSelectStart) + "*" + prev.slice(cursorSelectStart, cursorSelectEnd) + "*" + prev.slice(cursorSelectEnd);
    });
}

export const handleBoldItalics = (setString: (arg0: (prev: string) => string) => void, cursorSelectStart: number, cursorSelectEnd: number) => {
    setString((prev: string) => {
        return prev.slice(0, cursorSelectStart) + "***" + prev.slice(cursorSelectStart, cursorSelectEnd) + "***" + prev.slice(cursorSelectEnd);
    });
}

export const handleUnderline = (setString: (arg0: (prev: string) => string) => void, cursorSelectStart: number, cursorSelectEnd: number) => {
    setString((prev: string) => {
        return prev.slice(0, cursorSelectStart) + "__" + prev.slice(cursorSelectStart, cursorSelectEnd) + "__" + prev.slice(cursorSelectEnd);
    });
}

export const handleHeadings = (setString: (arg0: (prev: string) => string) => void, cursorSelectStart: number, cursorSelectEnd: number, headingLevel: number) => {
    const heading = "#".repeat(headingLevel);
    setString((prev: string) => {
        return prev.slice(0, cursorSelectStart) + heading + " " + prev.slice(cursorSelectStart, cursorSelectEnd) + prev.slice(cursorSelectEnd);
    });
}

export const handlerLinks = (setString: (arg0: (prev: string) => string) => void, cursorSelectStart: number, cursorSelectEnd: number, link: string) => {
    setString((prev: string) => {
        return prev.slice(0, cursorSelectStart) + "[" + prev.slice(cursorSelectStart, cursorSelectEnd) + "](" + link + ")" + prev.slice(cursorSelectEnd);
    });
}

export const handleCodeBlock = (setString: (arg0: (prev: string) => string) => void, cursorSelectStart: number, cursorSelectEnd: number) => {
    setString((prev: string) => {
        return prev.slice(0, cursorSelectStart) + "```" + prev.slice(cursorSelectStart, cursorSelectEnd) + "```" + prev.slice(cursorSelectEnd);
    });
}

export const handleHighlight = (setString: (arg0: (prev: string) => string) => void, cursorSelectStart: number, cursorSelectEnd: number) => {
    setString((prev: string) => {
        return prev.slice(0, cursorSelectStart) + "`" + prev.slice(cursorSelectStart, cursorSelectEnd) + "`" + prev.slice(cursorSelectEnd);
    });
}

export const handleNewLine = (setString: (arg0: (prev: string) => string) => void, cursorSelectStart: number) => {
    setString((prev: string) => {
        return prev.slice(0, cursorSelectStart) + "\n <br />\n" + prev.slice(cursorSelectStart);
    });
}