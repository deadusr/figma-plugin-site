import { ColorInfo } from "../codeGenerators/tags/index";

export const RGBAToHexA = (color: RGB | RGBA) => {

    if ('a' in color && color.a !== 1) {
        const colors = [
            Math.round(color.r * 255).toString(16),
            Math.round(color.g * 255).toString(16),
            Math.round(color.b * 255).toString(16),
            Math.round(color.a * 255).toString(16)
        ].map(string => string.length === 1 ? "0" + string : string) // Adds 0 when length of one number is 1

        return `#${colors.join("")}`
    }

    const colors = [
        Math.round(color.r * 255).toString(16),
        Math.round(color.g * 255).toString(16),
        Math.round(color.b * 255).toString(16)
    ].map(string => string.length === 1 ? "0" + string : string) // Adds 0 when length of one number is 1

    return `#${colors.join("")}`
}


/**
 * Shared function to extract colors from fills.
 * Priority: fillStyleId (Paint Style) → boundVariables (Variable) → raw hex.
 * 
 * @param fills — fills from a node or text segment
 * @param consumerNode — SceneNode for resolveForConsumer (for segments — parent TextNode)
 * @param fillStyleId — optional Paint Style ID (from node.fillStyleId or segment.fillStyleId)
 */
export const getColorsFromFills = async (
    fills: readonly Paint[] | typeof figma.mixed,
    consumerNode: SceneNode,
    fillStyleId?: string | typeof figma.mixed
): Promise<readonly [string[], ColorInfo[]]> => {
    const colorVariables: ColorInfo[] = [];
    const colors: string[] = [];

    // 1. Check Paint Style (if provided and not mixed)
    if (fillStyleId && fillStyleId !== figma.mixed && fillStyleId.length > 0) {
        const style = await figma.getStyleByIdAsync(fillStyleId);
        if (style !== null && style.type === "PAINT") {
            const paints = (style as PaintStyle).paints;
            if (paints.length === 1 && paints[0].type === "SOLID") {
                const fill = paints[0];
                const hex = RGBAToHexA({ ...fill.color, a: fill.opacity ?? 1 });
                colorVariables.push({ name: style.name, value: hex, source: 'style' });
                return [colors, colorVariables] as const;
            }
        }
    }

    // 2. Process individual fills
    const safeFills = fills === figma.mixed ? [] : fills;
    const promises = safeFills.map(async fill => {
        if (fill.type !== "SOLID") return;

        // 2a. Bound variable
        if (fill.boundVariables !== undefined && fill.boundVariables.color !== undefined) {
            const color = await figma.variables.getVariableByIdAsync(fill.boundVariables.color.id);
            if (color !== null && color.resolvedType === "COLOR") {
                const value = color.resolveForConsumer(consumerNode).value as RGB | RGBA;
                const hex = RGBAToHexA(value);
                colorVariables.push({ name: color.name, value: hex, source: 'variable' });
                return;
            }
        }

        // 2b. Raw color fallback
        const hex = RGBAToHexA({ ...fill.color, a: fill.opacity ?? 1 });
        colors.push(hex);
    });

    await Promise.all(promises);
    return [colors, colorVariables] as const;
}
