type Props = {
    className?: string
}

const Icon16ChevronRight = ({ className }: Props) => {
    return (
        <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.76778 5.52511C6.96305 5.32985 7.27955 5.32985 7.47482 5.52511L9.94942 7.99972L7.47482 10.4753C7.27962 10.6702 6.96298 10.6702 6.76778 10.4753C6.57252 10.28 6.57252 9.96256 6.76778 9.7673L8.53536 7.99972L6.76778 6.23214C6.57252 6.03688 6.57252 5.72037 6.76778 5.52511Z" fill="currentColor" />
        </svg>
    )
}

export default Icon16ChevronRight;