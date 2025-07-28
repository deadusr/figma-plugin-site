import generateStylesFromFrame from "../frame/FrameNodeGenerator";

const SCALE_CLASSES = {
    "FILL": "bg-cover bg-center",
    "FIT": "bg-contain",
    "CROP": "bg-contain",
}

const generateStylesFromBgImage = async (node: FrameNode, imageSrc: string) => {
    const classes: string[] = []

    const imagePaint = node.fills !== figma.mixed ? node.fills.find(el => el.type === "IMAGE") : undefined;
    if (imagePaint && imagePaint.imageHash !== null) {
        const bg = `bg-[url(${imageSrc})]`
        classes.push(bg);

        const scale = imagePaint.scaleMode === "TILE" ? "" : SCALE_CLASSES[imagePaint.scaleMode];
        classes.push(scale);

        const rotation = imagePaint.rotation === 0 ? "" : `rotate-[${imagePaint.rotation}]`
        classes.push(rotation);

    }

    const className = classes.filter(el => el.trim().length !== 0).join(' ');

    const frameClasses = await generateStylesFromFrame(node);

    return {
        className: `${frameClasses.className} ${className}`
    }
}

export default generateStylesFromBgImage;