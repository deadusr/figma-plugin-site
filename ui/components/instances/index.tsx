import Icon from "../icon"
import Instance from "./instance"


type Props = {

}

const Instances = ({ }: Props) => {
    return (
        <div>
            <Instance name="Header" />
            <Instance name="Button" />
            <Instance name="Modal" />
        </div>
    )
}

export default Instances;