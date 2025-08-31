import Color from "./color"


type Props = {
    colors: { name: string, value: string, source: 'variable' | 'style' }[]
}

const Colors = ({ colors }: Props) => {
    return (
        <div>
            {colors.map(el => <Color key={el.name} color={el.value} name={el.name} source={el.source} />)}
        </div>
    )
}

export default Colors;
