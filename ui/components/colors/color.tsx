type Props = {
    color: string,
    name: string
}

const Color = ({ color, name }: Props) => {
    return (
        <div className="py-1">
            <div className="border border-border rounded-medium w-full flex items-center cursor-default bg-bg hover:bg-bg-hover">
                <div className="w-4 h-4 flex items-center justify-center">
                    <span style={{ background: color }} className="w-3 h-3 rounded-full" />
                </div>
                <span className="text-body-medium">{name}</span>
            </div>
        </div>
    )
}

export default Color;