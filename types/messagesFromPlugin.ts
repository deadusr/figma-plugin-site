import { ColorInfo, ImageInfo } from '../plugin/codeGenerators/tags/index';
import { TPageChildren } from './index'

export const messages = ["PageNode.updated", "Selected.updated", 'Code.updated', 'tailwindColorPalette.updated'] as const;
export type MessageFromPluginType = typeof messages[number];

export interface MessageFromPluginPayload {
    "PageNode.updated": {
        children: TPageChildren[]
    };
    "Selected.updated": {
        nodes: string[]
    };

    "Code.updated": {
        html: string,
        css: string,
        assets: {
            images: ImageInfo[],
            colors: ColorInfo[]
        }
    };

    "tailwindColorPalette.updated": {
        id: string | null
    }
}

export type MessagesFromPlugin = {
    [T in MessageFromPluginType]: { message: T; value: MessageFromPluginPayload[T] }
}[MessageFromPluginType];

export type TMessageFromPlugin<K extends MessageFromPluginType> = {
    message: K;
    value: MessageFromPluginPayload[K];
};