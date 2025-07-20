import generateStylesFromFrame from "../frame/FrameNodeGenerator";

const SCALE_CLASSES = {
    "FILL": "object-cover",
    "FIT": "object-contain",
    "CROP": "object-contain",
}


const generateStylesFromImage = async (node: FrameNode) => {
    const classes: string[] = []

    const imagePaint = node.fills !== figma.mixed ? node.fills.find(el => el.type === "IMAGE") : undefined;
    console.log(imagePaint);
    if (imagePaint && imagePaint.imageHash !== null) {

        const scale = imagePaint.scaleMode === "TILE" ? "" : SCALE_CLASSES[imagePaint.scaleMode];
        classes.push(scale);

        const rotation = imagePaint.rotation === 0 ? "" : `rotate-[${imagePaint.rotation}]`
        classes.push(rotation);
    }

    const frameClasses = await generateStylesFromFrame(node);


    const className = classes.filter(el => el.trim().length !== 0).join(' ');
    return {
        className: `${frameClasses.className} ${className}`
    }
}


export default generateStylesFromImage;