import { useState } from "react";
import { SceneNodeType } from "../../../types/figmaTypes";
import Icon from "../../components/icon";
import { TIcons } from "../../components/icon/iconsTypes";
import LayerName from "./layerName";


type Props = {
    selected?: "parent" | "main" | "none",
    expanded?: boolean,
    expandable?: boolean,
    type: SceneNodeType,
    level: number,
    lastChild?: boolean,
    name: string,
    component?: boolean,
    tag: string,
    onClick: () => void,
    onToggleExpand: () => void,
    onChangeTag: (value: string) => void,
    onGetCode: () => void,
}

const IconToType: { [value in SceneNodeType]: TIcons } = {
    "COMPONENT": "component.16",
    "FRAME": "frame.16",
    "RECTANGLE": "frame.16",
}


const Layer = ({ selected = "none", type, level, expanded, expandable, lastChild, name, component, tag, onClick, onToggleExpand, onChangeTag, onGetCode }: Props) => {
    const icon = IconToType[type];


    const ml = (level - 1) * 24;

    const toggle = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        e.stopPropagation();

        onToggleExpand();
    }

    const click = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault();
        e.stopPropagation();

        onClick();
    }

    const getCode = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        e.stopPropagation();

        onGetCode();
    }

    return (
        <div onClick={click} style={{ paddingLeft: `${ml}px` }} className={`group/item relative flex items-center h-5 cursor-default ${component ? "text-text-component" : "text-text"}`}>
            {expandable
                ? <button onClick={toggle} className="z-20 flex items-center justify-center w-3 h-5 flex-shrink-0">
                    <Icon className='text-icon-tertiary hidden! group-hover:block!' icon="chevron.down.16" />
                </button>
                : <span className="w-3 h-5" />
            }

            <LayerName tag={tag} onChangeTag={onChangeTag} icon={icon} name={name} component={component} />

            <div className={`z-10 absolute ml-2.5 left-0 top-1 w-[calc(100%_-_0.75rem)] h-4 
            ${expanded ? "rounded-t-medium" : "rounded-medium"} 
            ${selected === "main" ? "bg-bg-selected group-hover/item:bg-bg-selected-hover" : selected === "parent" ? "group-hover/item:bg-bg-selected-hover" : "group-hover/item:bg-bg-hover"}
            `} />

            <div className={`${selected === "parent" ? "block" : "hidden"} ${lastChild && selected === "main" ? "rounded-b-medium" : ""} bg-bg-selected-secondary absolute ml-2.5 left-0 -top-1 w-[calc(100%_-_0.75rem)] h-5`} />

        </div>

    )
}

export default Layer;