type Props = {
    className?: string
}

const Icon16Folder = ({ className }: Props) => {
    return (
        <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.10254 3.00488C7.60667 3.05621 8 3.48232 8 4V5H12L12.1025 5.00488C12.6067 5.05621 13 5.48232 13 6V11L12.9951 11.1025C12.9472 11.573 12.573 11.9472 12.1025 11.9951L12 12H4L3.89746 11.9951C3.42703 11.9472 3.05278 11.573 3.00488 11.1025L3 11V4C3 3.48232 3.39333 3.05621 3.89746 3.00488L4 3H7L7.10254 3.00488ZM4 11H12V6H4V11ZM4 5H7V4H4V5Z" fill="currentColor" />
        </svg>
    )
}

export default Icon16Folder;