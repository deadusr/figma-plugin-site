import { getColorsFromFills } from "../../../utils/colors";

const generateStylesFromIcon = async (node: FrameNode) => {
    const classes: string[] = []

    const [, colorVariables] = await getColorsFromFills(node.fills, node);

    if (colorVariables.length === 1) {
        const iconColor = `text-${colorVariables[0].name}`
        classes.push(iconColor);
    }

    const parentFlex = node.parent && 'layoutMode' in node.parent && node.parent.layoutMode !== "NONE";

    const className = classes.filter(el => el.trim().length !== 0).join(' ');

    const width = node.layoutSizingHorizontal === "FILL" ? "w-full" : node.layoutSizingHorizontal === "HUG" ? "w-fit" : `w-[${node.width}px]`;
    classes.push(width);

    const height = node.layoutSizingVertical === "FILL" ? parentFlex ? "self-stretch" : "h-full" : node.layoutSizingVertical === "HUG" ? "h-fit" : `h-[${node.height}px]`;
    classes.push(height);


    return {
        className,
        assets: {
            colors: colorVariables
        }
    }
}


export default generateStylesFromIcon;