import { useState } from "react";
import Icon from "./icon";

type Props = {
    code: string,
}

const MAX_COLLAPSED_LINES = 20;

const Code = ({ code }: Props) => {
    const lines = code.split('\n');
    const totalLines = lines.length;
    const isLong = totalLines > MAX_COLLAPSED_LINES;
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="border border-border rounded-medium flex flex-col">
            <div
                className="flex overflow-y-auto"
                style={{
                    maxHeight: !expanded && isLong ? `${MAX_COLLAPSED_LINES * 16}px` : 'none',
                }}
            >
                <div className="text-body-medium text-text-tertiary px-1 py-2 w-[21px] select-none shrink-0">
                    {Array.from(Array(totalLines).keys()).map(idx => (
                        <span key={idx} className="block">{idx + 1}</span>
                    ))}
                </div>

                <code className="px-1 py-2 font-code text-body-medium whitespace-pre w-[calc(100%_-_21px)] overflow-x-auto pb-0">{code}</code>
            </div>

            {isLong && (
                <button
                    onClick={() => setExpanded(prev => !prev)}
                    className="flex items-center justify-center gap-1 py-1 border-t border-border text-text-secondary hover:text-text text-body-medium outline-none cursor-pointer"
                >
                    <Icon icon={expanded ? "collapse.16" : "expand.16"} className="text-icon-secondary" />
                    {expanded ? "Collapse" : `Expand (${totalLines} lines)`}
                </button>
            )}
        </div>
    )
}

export default Code;