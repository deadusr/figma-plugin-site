import { concat } from "lodash"
import { ColorInfo } from "../../tags/index"
import { getColorsFromFills } from "../../../utils/colors"

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


type TextSegmentProps = {
    characters: string
    start: number
    end: number
    fontSize: number
    fontName: FontName
    fontWeight: number
    textDecoration: TextDecoration
    textDecorationStyle: TextDecorationStyle | null
    textDecorationOffset: TextDecorationOffset | null
    textDecorationThickness: TextDecorationThickness | null
    textDecorationColor: TextDecorationColor | null
    textDecorationSkipInk: boolean | null
    textCase: TextCase
    lineHeight: LineHeight
    letterSpacing: LetterSpacing
    fills: Paint[]
    textStyleId: string
    fillStyleId: string
    listOptions: TextListOptions
    listSpacing: number
    indentation: number
    paragraphIndent: number
    paragraphSpacing: number
    hyperlink: HyperlinkTarget | null
    openTypeFeatures: {
        readonly [feature in OpenTypeFeature]: boolean
    }
    boundVariables?: {
        [field in VariableBindableTextField]?: VariableAlias
    }
    textStyleOverrides: TextStyleOverrideType[]
}



const generateStylesFromTextSegment = async (segment: TextSegmentProps, parent: TextNode) => {
    const [colors, colorVariables] = await getColorsFromFills(segment.fills, parent as SceneNode, segment.fillStyleId);

    const fontName = `font-[${segment.fontName.family}] `;
    const fontStyle = segment.fontName.style.toLowerCase() !== "italic" ? "" : `italic `;
    const fontSize = `text-[${segment.fontSize}px] `;
    const fontWeight = `font-[${segment.fontWeight}] `;
    const letterSpacing = `tracking-[${segment.letterSpacing.value} ${UNTIS[segment.letterSpacing.unit]}] `
    const lineHeight = segment.lineHeight.unit === "AUTO" ? "" : `leading-[${segment.lineHeight.value} ${UNTIS[segment.lineHeight.unit]}] `

    const textCase = `${TEXT_TRANSFORM[segment.textCase]} `;
    const textDecoration = `${TEXT_DECORATION[segment.textDecoration]} `;

    const textDecorationColor = segment.textDecorationColor === null || segment.textDecorationColor.value === "AUTO" ? "" : `${segment.textDecorationColor.value} ` // TODO bound variables for textDecorationColor
    const textDecorationStyle = segment.textDecorationStyle === null ? "" : `${TEXT_DECORATION_STYLE[segment.textDecorationStyle]} `
    const textDecorationThickness = segment.textDecorationThickness === null || segment.textDecorationThickness.unit === "AUTO" ? "" : `decoration-[${segment.textDecorationThickness.value} ${UNTIS[segment.textDecorationThickness.unit]}] `;

    const fontColor = concat(colorVariables.map(variable => `text-${variable.name} `), colors.map(color => `${color} `)).join('');


    let className = `${fontName}${fontStyle}${fontSize}${fontWeight}${letterSpacing}${lineHeight}${textCase}${textDecoration}${textDecorationColor}${textDecorationStyle}${textDecorationThickness}${fontColor}`;
    return {
        className,
        assets: {
            colors: colorVariables
        }
    };
}


export default generateStylesFromTextSegment;