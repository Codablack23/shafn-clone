import { SVGAttributes } from "react";

export default function FavouriteIcon({width,height,fill,className}:SVGAttributes<SVGAElement>) {
    return (
        <svg className={className} width={width ?? "24"} height={height ?? "24"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_37_237)">
                <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" fill={fill ?? "#242B36"} fill-opacity="0.75" />
            </g>
            <defs>
                <clipPath id="clip0_37_237">
                    <rect width="24" height="24" fill="white" />
                </clipPath>
            </defs>
        </svg>

    )
}