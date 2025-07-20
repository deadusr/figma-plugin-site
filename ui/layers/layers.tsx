import { useMemo } from "react";
import { TPageChildren } from "../../types";
import Icon from "../components/icon"
import { onToggleExpandNode, onSelectNode, usePageChildrenStore, usePageSelectionStore, onSetHtmlTagToNode, onGetCode } from "../main"
import Layer from "./components/layer"

const Layers = () => {
    const { children } = usePageChildrenStore();

    const clearSelection = () => {
        onSelectNode(null);
    }

    return (
        <section className="group flex flex-col">
            <div className="group flex items-center h-6  border-b border-border">
                <button className="flex items-center justify-center w-3 h-5 flex-shrink-0">
                    <Icon className='text-icon-tertiary hidden! group-hover:block!' icon="chevron.down.16" />
                </button>
                <span className="text-body-medium font-strong">Layers</span>
            </div>

            <div onClick={clearSelection} className="group flex flex-col hover:[&::-webkit-scrollbar-thumb]:bg-bg-inverse/30 overflow-scroll h-[390px]">

                {children.map(node => (
                    <LayerComponent key={node.id} node={node} />
                ))}

                {/* <Layer name="Component" level={1} type="Frame" />
                <Layer name="Component" level={1} type="Frame" />
                <Layer name="Component" level={2} component type="Component" />

                <Layer name="Frame-3" level={3} component type="Frame" />
                <Layer name="Component" level={3} expanded lastChild type="Frame" selected="main" />

                <Layer name="Frame-4" level={4} type="Frame" selected="parent" />
                <Layer name="Frame-4" level={4} type="Frame" selected="parent" />
                <Layer name="Last component " level={5} lastChild type="Frame" selected="parent" /> */}
            </div>
        </section>
    )
}


type LayerComponentProps = {
    node: TPageChildren,
}

const LayerComponent = ({ node: { id, hasChildren, name, type, tag, parentIds } }: LayerComponentProps,) => {
    const { nodes: selectedNodes, setSelectedNodes } = usePageSelectionStore();

    const onSelect = () => {
        setSelectedNodes([id])
        onSelectNode(id)
    }


    const onToggle = () => {
        onToggleExpandNode(id)
    }

    const onChangeTag = (tag: string) => {
        onSetHtmlTagToNode(id, tag);
    }

    const getCode = () => {
        onGetCode(id);
    }

    const selected = useMemo(() => selectedNodes.includes(id), [id, selectedNodes]);
    const parentSelected = useMemo(() => !selected && selectedNodes.some(id => parentIds.includes(id)), [selected, parentIds, selectedNodes]);

    return (
        <Layer
            level={parentIds.length}
            expandable={hasChildren}
            selected={selected ? "main" : parentSelected ? "parent" : "none"}
            name={name}
            type={type}
            tag={tag.tag}
            onClick={onSelect}
            onToggleExpand={onToggle}
            onChangeTag={onChangeTag}
            onGetCode={getCode}
        />
    )
}

export default Layers