import Icon from "../icon"


type Props = {
    name: string
}

const Instance = ({ name }: Props) => {
    return (
        <div className="flex py-2 items-center gap-2 cursor-default ">
            <Icon icon="instance.16" className="text-icon-component" />
            <p className="text-body-medium text-text-component">
                {`<${name} />`}
            </p>
        </div>
    )
}

export default Instance;