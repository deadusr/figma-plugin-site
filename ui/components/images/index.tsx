import Image from "./image"

type Props = {
    images: { name: string, src: string }[]
}

const Images = ({ images }: Props) => {
    return (
        <div>
            {images.map(image => (

                <Image src={image.src} name={image.name} size={{ width: 300, height: 300 }} />
            ))}
        </div>
    )
}

export default Images;