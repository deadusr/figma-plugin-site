import { concat } from "lodash"
import { ColorInfo } from "../../tags/index"
import { RGBAToHexA } from "../../../utils/colors"

const UNTIS = {
    "PIXELS": "px",
    "PERCENT": "%"
}

const TEXT_TRANSFORM = {
    "UPPER": "uppercase",
    "LOWER": "lowercase",
    "TITLE": "capitalize",
    "ORIGINAL": "normal-case",
    "SMALL_CAPS": "",
    "SMALL_CAPS_FORCED": "",
}

const TEXT_DECORATION = {
    "UNDERLINE": "underline",
    "STRIKETHROUGH": "line-through",
    "NONE": ""
}

const TEXT_DECORATION_STYLE = {
    "SOLID": "decoration-solid",
    "WAVY": "decoration-wavy",
    "DOTTED": "decoration-dotted"
}


type TextNodeProps = {
    fontName: FontName | typeof figma.mixed,
    fontSize: number | typeof figma.mixed,
    fontWeight: number | typeof figma.mixed,
    letterSpacing: typeof figma.mixed | LetterSpacing,
    lineHeight: typeof figma.mixed | LineHeight,
    textCase: typeof figma.mixed | TextCase,
    textDecoration: typeof figma.mixed | TextDecoration,
    textDecorationColor: typeof figma.mixed | TextDecorationColor | null,
    textDecorationStyle: typeof figma.mixed | TextDecorationStyle | null,
    textDecorationThickness: typeof figma.mixed | TextDecorationThickness | null,
    fills: typeof figma.mixed | readonly Paint[],
    textStyleId: typeof figma.mixed | string,
    fillStyleId: typeof figma.mixed | string,
    listSpacing: typeof figma.mixed | number,
    paragraphIndent: typeof figma.mixed | number,
    paragraphSpacing: typeof figma.mixed | number,
    boundVariables?: SceneNodeMixin["boundVariables"]
}



const generateStylesFromTextNode = async (node: TextNodeProps) => {
    const [colors, colorVariables] = await getColors(node);

    const fontName = node.fontName === figma.mixed ? "" : `font-[${node.fontName.family}] `;
    const fontStyle = node.fontName === figma.mixed || node.fontName.style.toLowerCase() !== "italic" ? "" : `italic `;
    const fontSize = node.fontSize === figma.mixed ? "" : `text-[${node.fontSize}px] `;
    const fontWeight = node.fontWeight === figma.mixed ? "" : `font-[${node.fontWeight}] `;
    const letterSpacing = node.letterSpacing === figma.mixed ? "" : `tracking-[${node.letterSpacing.value} ${UNTIS[node.letterSpacing.unit]}] `
    const lineHeight = node.lineHeight === figma.mixed || node.lineHeight.unit === "AUTO" ? "" : `leading-[${node.lineHeight.value} ${UNTIS[node.lineHeight.unit]}] `

    const textCase = node.textCase === figma.mixed ? "" : `${TEXT_TRANSFORM[node.textCase]} `;
    const textDecoration = node.textDecoration === figma.mixed ? "" : `${TEXT_DECORATION[node.textDecoration]} `;

    const textDecorationColor = node.textDecorationColor === figma.mixed || node.textDecorationColor === null || node.textDecorationColor.value === "AUTO" ? "" : `${node.textDecorationColor.value} ` // TODO bound variables for textDecorationColor
    const textDecorationStyle = node.textDecorationStyle === figma.mixed || node.textDecorationStyle === null ? "" : `${TEXT_DECORATION_STYLE[node.textDecorationStyle]} `
    const textDecorationThickness = node.textDecorationThickness === figma.mixed || node.textDecorationThickness === null || node.textDecorationThickness.unit === "AUTO" ? "" : `decoration-[${node.textDecorationThickness.value} ${UNTIS[node.textDecorationThickness.unit]}] `;

    const fontColor = concat(colorVariables.map(variable => `text-${variable.name} `), colors.map(color => `text-[${color}] `)).join('');


    let className = `${fontName}${fontStyle}${fontSize}${fontWeight}${letterSpacing}${lineHeight}${textCase}${textDecoration}${textDecorationColor}${textDecorationStyle}${textDecorationThickness}${fontColor}`;
    return {
        className,
        assets: {
            colors: colorVariables
        }
    };
}


const getColors = async (node: TextNodeProps) => {
    const colorVariables: ColorInfo[] = [];
    const colors: string[] = [];

    const fills = node.fills === figma.mixed ? [] : node.fills;

    const promises = fills.map(async fill => {
        if (fill.type !== "SOLID")
            return;

        if (fill.boundVariables !== undefined && fill.boundVariables.color !== undefined) {
            const color = await figma.variables.getVariableByIdAsync(fill.boundVariables.color.id);
            if (color !== null && color.resolvedType === "COLOR") {
                const value = color.resolveForConsumer(node as SceneNode).value as RGB | RGBA;
                const hex = RGBAToHexA(value);
                colorVariables.push({ name: color.name, value: hex });

                return;
            }
        }

        const hex = RGBAToHexA(fill.color);
        colors.push(hex);
        return;
    })


    await Promise.all(promises);

    return [colors, colorVariables] as const;
}

export default generateStylesFromTextNode;