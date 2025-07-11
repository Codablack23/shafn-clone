import { SVGAttributes } from "react";

export default function UserIcon(props:SVGAttributes<SVGAElement>) {


    return (
        <svg className={props.className} width={props.width ?? "36"} height={props.height ?? "36"} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="36" height="36" rx="18" fill={props.fill ?? "#242B36"} fill-opacity="0.75" />
            <g clip-path="url(#clip0_37_198)">
                <path d="M18 3C9.72 3 3 9.72 3 18C3 26.28 9.72 33 18 33C26.28 33 33 26.28 33 18C33 9.72 26.28 3 18 3ZM18 9C20.895 9 23.25 11.355 23.25 14.25C23.25 17.145 20.895 19.5 18 19.5C15.105 19.5 12.75 17.145 12.75 14.25C12.75 11.355 15.105 9 18 9ZM18 30C14.955 30 11.355 28.77 8.79 25.68C11.325 23.7 14.52 22.5 18 22.5C21.48 22.5 24.675 23.7 27.21 25.68C24.645 28.77 21.045 30 18 30Z" fill="white" />
            </g>
            <defs>
                <clipPath id="clip0_37_198">
                    <rect width="36" height="36" fill="white" />
                </clipPath>
            </defs>
        </svg>

    )
}