import { useRef, useState } from "react"
import Icon from "../../components/icon";
import { TIcons } from "../../components/icon/iconsTypes";

type Props = {
    component?: boolean,
    name: string,
    tag: string,
    icon: TIcons,
    onChangeTag: (value: string) => void
}

const LayerName = ({ component, name, tag, icon, onChangeTag }: Props) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isEditingMode, setIsEditingMode] = useState(false);

    const onclick = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        e.preventDefault();
        e.stopPropagation();

        setIsEditingMode(true);

        setTimeout(() => {
            if (inputRef.current === null) return;

            inputRef.current.value = tag || "";
            inputRef.current.focus();
            inputRef.current.select();
        }, 0)
    }

    const onblur = () => {
        if (inputRef.current === null) return;

        const tag = inputRef.current.value;
        onChangeTag(tag);
        setIsEditingMode(false);
    }

    const onenter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== "Enter") return;
        setIsEditingMode(false);
    }

    return (

        <div className="relative z-20 w-fit h-4 flex items-center pl-1">
            <Icon className={`${component ? "text-icon-component" : "text-icon"} flex-shrink-0`} icon={icon} />
            <span onDoubleClickCapture={onclick} className="flex items-center text-body-medium w-full select-none">
                <span className={`${isEditingMode ? "hidden" : "block"} font-strong ml-[9px] whitespace-nowrap`}>{tag}</span>
                <input onKeyDown={onenter} onBlur={onblur} autoFocus ref={inputRef}
                    className={`h-4 w-full text-text bg-bg border-border px-2 font-strong outline-0 border rounded-medium [&::selection]:bg-bg-brand/50 focus:border-border-selected ${isEditingMode ? "block" : "hidden"}`} />
                <span className={`${isEditingMode ? "hidden" : "block"} ${component ? "text-text-component-secondary" : "text-text-secondary "} px-1 w-max whitespace-nowrap`}>{name}</span>
            </span>
        </div>

    )
}

export default LayerName;