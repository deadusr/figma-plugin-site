export const SCENE_NODES = [
    "BOOLEAN_OPERATION",
    "CODE_BLOCK",
    "COMPONENT",
    "COMPONENT_SET",
    "CONNECTOR",
    "ELLIPSE",
    "EMBED",
    "FRAME",
    "GROUP",
    "INSTANCE",
    "LINE",
    "LINK_UNFURL",
    "MEDIA",
    "POLYGON",
    "RECTANGLE",
    "SECTION",
    "SHAPE_WITH_TEXT",
    "STAMP",
    "STAR",
    "STICKY",
    "TABLE",
    "TEXT",
    "TEXT_PATH",
    "TRANSFORM_GROUP",
    "WIDGET",
    "MEDIA",
    "SLICE",
    "TABLE_CELL",
    "VECTOR",
    "HIGHLIGHT",
    "WASHI_TAPE",
    "SLIDE",
    "SLIDE_ROW",
    "SLIDE_GRID",
    "INTERACTIVE_SLIDE_ELEMENT"
] as const;

export const BASE_NODES = [
    ...SCENE_NODES,
    "DOCUMENT",
    "PAGE"
] as const;



export type TFifBaseNodes = typeof BASE_NODES[number];
export type SceneNodeType = typeof BASE_NODES[number];


const SCENE_NODE_SET = new Set<string>(SCENE_NODES as readonly string[]);

export const isSceneNodeType = (type: string): type is SceneNodeType => {
    return SCENE_NODE_SET.has(type);
}

export function isSceneNode(node: any): node is { type: SceneNodeType } {
    return (
        "type" in node &&
        isSceneNodeType((node as any).type)
    );
}


