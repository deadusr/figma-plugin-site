import Icon from "./icon"

type Props = {
    active?: boolean,
    name: string,
    onClick: () => void
}

const Checkbox = ({ active, name, onClick }: Props) => {
    return (
        <div className={`flex items-center gap-2`}>
            <button className={`rounded-medium border text-icon-onbrand flex w-3 h-3 items-center justify-center outline-none ${active ? "bg-bg-brand border-border-selected-strong" : "border-border bg-bg-secondary"}`} onClick={onClick}>
                {active ? <Icon className="shrink-0" icon="check.16" /> : <span className="block w-3 h-3 shrink-0" />}
            </button>
            <span onClick={onClick} className="text-body-medium">{name}</span>
        </div>
    )
}

export default Checkbox;