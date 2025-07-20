type Props = {
    className?: string
}

const Icon24ChevronDown = ({ className }: Props) => {
    return (
        <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.6467 11.1467C13.842 10.9514 14.1585 10.9514 14.3537 11.1467C14.549 11.342 14.549 11.6585 14.3537 11.8537L12.3537 13.8537C12.1585 14.049 11.842 14.049 11.6467 13.8537L9.64669 11.8537L9.58224 11.7756C9.45407 11.5815 9.47583 11.3176 9.64669 11.1467C9.81756 10.9758 10.0815 10.9541 10.2756 11.0822L10.3537 11.1467L12.0002 12.7932L13.6467 11.1467Z" fill="currentColor" />
        </svg>

    )
}

export default Icon24ChevronDown;