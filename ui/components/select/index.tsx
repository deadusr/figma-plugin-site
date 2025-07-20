import { useEffect, useMemo, useRef } from "react";
import { useDisclosure } from "../../utils/hooks"
import Icon from "../icon";
import SelectItem from "./item";


type Props = {
    value: string,
    options: Option[],
    onChange: (value: string) => void,
    className?: string
}

type Option = {
    id: string,
    name: string
}

const Select = ({ value, options, className, onChange }: Props) => {
    const [showDropdown, open, close] = useDisclosure();
    const dropdownRef = useRef<HTMLDivElement>(null);

    const active = useMemo(() => options.find(el => el.id === value), [value, options])

    useEffect(() => {

        const onclick = (e: globalThis.MouseEvent) => {
            if (dropdownRef.current === null)
                return
            if (!dropdownRef.current.contains(e.target as Node)) {
                close();
            }
        }

        document.addEventListener('click', onclick);

        return () => {
            document.removeEventListener('click', onclick);
        }

    }, [dropdownRef, close]) // close  on click outside


    const onClick = (id: string) => {
        onChange(id);
        close();
    }



    return (
        <div ref={dropdownRef} className={`relative ${className}`}>
            <div onClick={open} className="flex items-center pl-2 border border-border rounded-medium">
                <span className="text-body-medium w-full outline-none" >{active?.name} </span>
                <Icon icon="chevron.down.24" className="shrink-0" />
            </div>
            {showDropdown
                ? <div className="absolute z-20 right-0 -top-2 bg-bg-menu rounded-large text-white px-2 py-2">
                    <ul className="">
                        {options.map(el => (
                            <SelectItem key={el.id} onClick={() => onClick(el.id)} active={el.id === active?.id} name={el.name} />
                        ))}
                    </ul>
                </div>
                : null}
        </div>
    )
}

export default Select;
