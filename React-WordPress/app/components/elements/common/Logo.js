import React from "react";
import Link from "next/link";

const Logo = ({ type }) => {
    let data;
    if (type === "autopart") {
        data = {
            url: "/home/autopart",
            img: "img/logo-autopart.png",
        };
    } else if (type === "technology") {
        data = {
            url: "/home/technology",
            img: "static/img/logo-technology.png",
        };
    } else if (type === "electronic") {
        data = {
            url: "/home/electronic",
            img: "static/img/logo-electronic.png",
        };
    } else if (type === "furniture") {
        data = {
            url: "/home/furniture",
            img: "static/img/logo-furniture.png",
        };
    } else if (type === "organic") {
        data = {
            url: "/home/organic",
            img: "static/img/logo-organic.png",
        };
    } else if (type === "dark") {
        data = {
            url: "/",
            img: "static/img/logo.png",
        };
    } else {
        data = {
            url: "/",
            img: "/static/img/logo_light.png",
        };
    }
    return (
       <div className="flex-1" style={{
        flex:1,
        display:"flex",
        alignItems:"center",
        marginBottom:"8px"
       }}>
         <Link legacyBehavior href={data.url}>
            <a className="">
                <img style={{maxWidth:"80px"}} src={data.img} alt="" />
            </a>
        </Link>
       </div>
    );
};

export default Logo;
