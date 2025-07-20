export const addClassToSvgString = (svgString: string, className: string): string => {
    // This regex finds the opening <svg tag and captures its existing attributes.
    // It looks for `<svg` followed by any characters that are not `>`
    // This is to ensure we are only modifying the opening tag.
    const svgTagRegex = /<svg([^>]*)>/;

    // We replace the matched <svg ...> tag with a new one that includes the className.
    // '$1' is a backreference to the captured group (the existing attributes).
    return svgString.replace(svgTagRegex, `<svg class="${className}"$1>`);
}


export const isMinusZero = (value: number) => {
    return 1 / value === -Infinity;
}