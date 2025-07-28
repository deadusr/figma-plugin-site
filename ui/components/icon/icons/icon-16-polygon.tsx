type Props = {
    className?: string
}

const Icon16Polygon = ({ className }: Props) => {
    return (
        <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.99979 3C8.36098 3.00002 8.69375 3.195 8.87088 3.50977L13.3709 11.5098C13.5451 11.8194 13.5424 12.1982 13.3631 12.5049C13.1837 12.8116 12.8551 13 12.4998 13H3.49979C3.14452 13 2.81586 12.8115 2.63651 12.5049C2.45715 12.1982 2.45452 11.8194 2.62869 11.5098L7.12772 3.50977C7.30483 3.19489 7.63851 3 7.99979 3ZM3.49979 12H12.4998L7.99979 4L3.49979 12Z" fill="currentColor" />
        </svg>
    )
}

export default Icon16Polygon;