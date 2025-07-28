type Props = {
    className?: string
}

const Icon16Text = ({ className }: Props) => {
    return (
        <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.5 3C12.7761 3 13 3.22386 13 3.5V5C13 5.27614 12.7761 5.5 12.5 5.5C12.2239 5.5 12 5.27614 12 5V4H8.5V12H9.5C9.77614 12 10 12.2239 10 12.5C10 12.7761 9.77614 13 9.5 13H6.5C6.22386 13 6 12.7761 6 12.5C6 12.2239 6.22386 12 6.5 12H7.5V4H4V5C4 5.27614 3.77614 5.5 3.5 5.5C3.22386 5.5 3 5.27614 3 5V3.5C3 3.22386 3.22386 3 3.5 3H12.5Z" fill="currentColor"  />
        </svg>
    )
}

export default Icon16Text;