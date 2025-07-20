import { ReactNode } from "react"


type Props = {
    type?: 'primary' | 'secondary',
    children: ReactNode,
    className?: string
}

const Button = ({ type = 'primary', children, className }: Props) => {
    return (
        <button className={`px-2 py-1 text-body-medium rounded-medium ${type === "primary" ? "bg-bg-brand text-text-onbrand" : "border border-border"} ${className}`}>
            {children}
        </button>
    )
}

export default Button;