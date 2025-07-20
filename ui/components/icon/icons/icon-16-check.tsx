type Props = {
    className?: string
}

const Icon16Check = ({ className }: Props) => {
    return (
        <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.0842 4.22268C11.2374 3.99294 11.5478 3.93087 11.7776 4.08401C12.0074 4.23718 12.0694 4.5476 11.9163 4.77737L7.91627 10.7774C7.83318 10.902 7.69815 10.9833 7.54908 10.9981C7.40018 11.0127 7.25254 10.9593 7.14674 10.8535L4.14674 7.85354L4.08228 7.77541C3.95415 7.58134 3.97588 7.31736 4.14674 7.14651C4.31759 6.97566 4.58157 6.95392 4.77564 7.08205L4.85377 7.14651L7.42213 9.71487L11.0842 4.22268Z" fill="currentColor" />
        </svg>

    )
}

export default Icon16Check;