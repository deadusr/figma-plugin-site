import { ColorInfo } from "../../tags/index"
import { getColorsFromFills } from "../../../utils/colors"
import getBackgrounds from "../common/index"
import { valueToTailwindValue } from "../defaultConfig"

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

const TEXT_ALIGN_HORIZONTAL = {
    "LEFT": "text-left",
    "CENTER": "text-center",
    "RIGHT": "text-right",
    "JUSTIFIED": "text-justify"
}

const TEXT_ALIGN_VERTICAL = {
    "TOP": "align-top",
    "CENTER": "align-middle",
    "BOTTOM": "align-bottom"
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


type ReturnType = {
    className: string;
    assets: {
        colors: ColorInfo[];
        styles: string
    };
}

const generateStylesFromTextNode = async (node: TextNode): Promise<ReturnType> => {
    const [, colorVariables] = await getColorsFromFills(node.fills, node, node.fillStyleId);
    const styles: string[] = [];
    const classes: string[] = []

    if (node.fontName !== figma.mixed) {
        classes.push(`font-[${node.fontName.family}]`);
    }
    if (node.fontName !== figma.mixed && node.fontName.style.toLowerCase() === "italic") {
        classes.push('italic')
    }
    if (node.fontSize !== figma.mixed) {
        const size = valueToTailwindValue(node.fontSize, 'text', 'text')
        classes.push(size);
    }
    if (node.fontWeight !== figma.mixed) {
        const weight = valueToTailwindValue(node.fontWeight, 'weight', 'font')
        classes.push(weight);
    }
    if (node.letterSpacing !== figma.mixed) {
        const letterSpacing = `tracking-[${node.letterSpacing.value}_${UNTIS[node.letterSpacing.unit]}]`;
        classes.push(letterSpacing);
    }
    if (node.lineHeight !== figma.mixed && node.lineHeight.unit !== "AUTO") {
        const lineHeight = `leading-[${node.lineHeight.value}_${UNTIS[node.lineHeight.unit]}]`;
        classes.push(lineHeight);
    }
    if (node.textCase !== figma.mixed && node.textCase !== "ORIGINAL") {
        const textCase = `${TEXT_TRANSFORM[node.textCase]}`;
        classes.push(textCase);
    }
    if (node.textDecoration !== figma.mixed) {
        const textDecoration = `${TEXT_DECORATION[node.textDecoration]}`;
        classes.push(textDecoration);
    }
    if (node.textDecorationColor !== figma.mixed && node.textDecorationColor !== null && node.textDecorationColor.value !== "AUTO") {
        const textDecorationColor = valueToTailwindValue(node.textDecorationColor.value.color, 'color', 'decoration');
        classes.push(textDecorationColor);
    }
    if (node.textDecorationStyle !== figma.mixed && node.textDecorationStyle !== null) {
        const textDecorationStyle = `${TEXT_DECORATION_STYLE[node.textDecorationStyle]}`;
        classes.push(textDecorationStyle);
    }
    if (node.textDecorationThickness !== figma.mixed && node.textDecorationThickness !== null && node.textDecorationThickness.unit !== "AUTO") {
        const textDecorationThickness = `decoration-[${node.textDecorationThickness.value} ${UNTIS[node.textDecorationThickness.unit]}]`;
        classes.push(textDecorationThickness);
    }
    if (node.textAlignHorizontal) {
        classes.push(TEXT_ALIGN_HORIZONTAL[node.textAlignHorizontal]);
    }
    if (node.textAlignVertical) {
        classes.push(TEXT_ALIGN_VERTICAL[node.textAlignVertical]);
    }


    const [bgClasses, bgStyles] = await getBackgrounds(node);
    if (bgClasses)
        if (bgStyles.length !== 0)
            styles.push(bgStyles);

    classes.push(bgClasses);

    const className = classes.filter(el => el.trim().length !== 0).join(' ');

    return {
        className,
        assets: {
            colors: colorVariables,
            styles: styles.join('\n')
        }
    };
}


export default generateStylesFromTextNode;