import Icon from "../icon"

type Props = {
    name: string,
    active?: boolean,
    onClick: () => void,
}

const SelectItem = ({ name, active = false, onClick }: Props) => {
    return (
        <li onClick={onClick} className="p-1">
            <div className="flex items-center gap-1 py-1 pl-1 pr-2 text-white hover:bg-menu-selected cursor-default rounded-medium min-w-[70px]">
                {active ? <Icon icon="check.16" className="" /> : <span className="w-3 h-3"/>}
                <span className="text-body-medium">{name}</span>
            </div>
        </li>
    )
}

export default SelectItem;