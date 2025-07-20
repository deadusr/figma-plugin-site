import { useState } from "react"
import Select from "../select"
import { IMAGE_EXTENSTIONS } from '../../../types/images';

type Props = {
    src: string,
    name: string,
    size: {
        width: number,
        height: number
    }
}

const ExtenstionOptions = IMAGE_EXTENSTIONS.map(el => ({
    id: el,
    name: el
}))

const SizeOptions = [
    {
        id: '1',
        name: '1x'
    },
    {
        id: '1.5',
        name: '1.5x'
    },
    {
        id: '2',
        name: '2x'
    },
]


const Image = ({ src, name, size }: Props) => {

    const [extenstion, setExtenstion] = useState<string>("PNG");
    const [sizeMultipliter, setSizeMultiplier] = useState<string>("1");


    return (
        <div className="group px-3 py-2 flex gap-3">
            <img className="w-8 h-8 object-cover shrink-0" src={src} />
            <div className="flex items-center justify-between w-[calc(100%_-_3.5rem_-_1rem)]">
                <div className="flex flex-col gap-2 overflow-clip whitespace-nowrap group-hover:w-[calc(100%_-_136px)]">
                    <p className="text-body-medium">{name}</p>
                    <span className="text-body-medium text-text-tertiary">{size.width} x {size.height}</span>
                </div>

                <div className="hidden items-center gap-2 group-hover:flex shrink-0 w-fit">
                    <Select className="w-[72px]" onChange={setExtenstion} value={extenstion} options={ExtenstionOptions} />

                    <Select className="w-[56px]" onChange={setSizeMultiplier} value={sizeMultipliter} options={SizeOptions} />
                </div>
            </div>
        </div>
    )
}

export default Image;