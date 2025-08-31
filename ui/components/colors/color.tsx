type Props = {
    color: string,
    name: string,
    source: 'variable' | 'style'
}

const Color = ({ color, name, source }: Props) => {
    const swatchClass = source === 'variable' ? 'rounded-sm' : 'rounded-full';
    return (
        <div className="py-1">
            <div className="border border-border rounded-medium w-full flex items-center cursor-default bg-bg hover:bg-bg-hover">
                <div className="w-4 h-4 flex items-center justify-center">
                    <span style={{ background: color }} className={`w-3 h-3 ${swatchClass}`} />
                </div>
                <span className="text-body-medium">{name}</span>
            </div>
        </div>
    )
}

export default Color;
