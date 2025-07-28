import { JSX, useCallback, useEffect, useMemo, useRef } from "react";
import { TPageChildren } from "../../types";
import Icon from "../components/icon"
import { onToggleExpandNode, onSelectNode, usePageChildrenStore, usePageSelectionStore, onSetHtmlTagToNode, onGetCode } from "../main"
import Layer from "./components/layer"

const Layers = () => {
    const { children } = usePageChildrenStore();
    const { nodeId: selectedNodeId, setSelectedNode } = usePageSelectionStore();

    const selectedRef = useRef(null);

    const onSelect = useCallback((id: string) => {
        setSelectedNode(id)
        onSelectNode(id)
    }, [setSelectedNode])


    useEffect(() => {
        if (selectedRef.current !== null)
            console.log("Scrolling to selected elem...");

        console.log(selectedRef)
    }, [selectedRef])


    const childrenToRender = useMemo(() => {
        const toRender: JSX.Element[] = [];

        for (let i = 0; i < children.length; i++) {
            const child = children[i];
            const selected = selectedNodeId === child.id;

            if (selected) {
                let idx = i + 1;
                while (children[idx] && children[idx].parentIds.includes(child.id)) {
                    idx += 1;
                }

                const hasSelectedChilds = idx > i + 1;

                const content = (
                    <div className={`w-fit min-w-full ml-2.5 mt-[0.2rem] ${hasSelectedChilds ? "bg-bg-selected-secondary rounded-medium" : ""}`}>
                        <LayerComponent scrollToView className="-top-[0.2rem] -mb-[0.2rem]" key={child.id} node={child} onSelect={onSelect} selected="main" />

                        {hasSelectedChilds ? (
                            children.slice(i + 1, idx).map(el => (
                                <LayerComponent key={el.id} node={el} onSelect={onSelect} selected="parent" />
                            ))
                        ) : null}
                    </div>
                )

                toRender.push(
                    content
                )

                if (hasSelectedChilds) i = idx - 1;
            } else {
                toRender.push(<LayerComponent className="ml-2.5" key={child.id} node={child} onSelect={onSelect} />)
            }

        }

        return toRender;


    }, [children, selectedNodeId, onSelect]);

    const clearSelection = () => {
        onSelectNode(null);
    }

    return (
        <section className="group flex flex-col">
            <div className="group flex items-center h-6  border-b border-border">
                <button className="flex items-center justify-center w-3 h-5 flex-shrink-0 outline-none">
                    <Icon className='text-icon-tertiary hidden! group-hover:block!' icon="chevron.down.16" />
                </button>
                <span className="text-body-medium font-strong">Layers</span>
            </div>

            <div onClick={clearSelection} className="group flex flex-col hover:[&::-webkit-scrollbar-thumb]:bg-bg-inverse/30 overflow-scroll h-[390px]">
                <div className="w-fit min-w-full h-fit">
                    {childrenToRender}
                </div>



                {/* {children.map(node => (
                    <LayerComponent key={node.id} node={node} selectedNodes={selectedNodes} onSelect={onSelect} />
                ))} */}


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
    selected?: "main" | "parent" | "none",
    onSelect: (id: string) => void,
    scrollToView?: boolean,
    className?: string,
}

const LayerComponent = ({ node, onSelect, selected = "none", scrollToView, className }: LayerComponentProps,) => {
    const onToggle = () => {
        onToggleExpandNode(node.id)
    }

    const onChangeTag = (tag: string) => {
        onSetHtmlTagToNode(node.id, node.tag.tag);
    }

    const type = node.isImage ? "IMAGE" : node.type;

    const onClick = useCallback(() => {
        onSelect(node.id);
    }, [onSelect, node.id]);

    return (
        <Layer
            level={node.parentIds.length}
            expandable={node.hasChildren}
            selected={selected}
            name={node.name}
            type={type}
            tag={node.tag.tag}
            className={className}
            onClick={onClick}
            onToggleExpand={onToggle}
            onChangeTag={onChangeTag}
            scrollToView={scrollToView}
        />
    )
}

export default Layers