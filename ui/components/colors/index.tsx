import Color from "./color"


type Props = {
    colors: { name: string, value: string }[]
}

const Colors = ({ colors }: Props) => {
    return (
        <div>
            {colors.map(el => <Color color={el.value} name={el.name} />)}
        </div>
    )
}

export default Colors;