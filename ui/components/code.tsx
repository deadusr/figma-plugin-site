type Props = {
    code: string,
}


const Code = ({code}: Props) => {
    const lines = code.split('\n').length;

    return (
        <div className="border border-border rounded-medium flex">
            <div className="text-body-medium text-text-tertiary px-1 py-2 w-[21px] select-none">
                {Array(lines).keys().map(idx => (
                    <span className="block">{idx + 1}</span>
                ))}
            </div>

            <code className="px-1 py-2 font-code text-body-medium whitespace-pre w-[calc(100%_-_21px)] overflow-x-scroll pb-0">{code}</code>
        </div>
    )
}

export default Code;