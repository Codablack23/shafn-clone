import React,{useEffect} from 'react';
import Link from 'next/link';
import { baseUrl } from '@/repositories/Repository';


const Promotion = ({ link, image ,defImage,styles}) => {
    const imageStyles = styles || {width:"100%",height:"275px",objectFit:"cover"}
   if (image) {
        return (
            <Link legacyBehavior href={link}>
                <div className="ps-collection" style={imageStyles}>
                    <img
                    style={imageStyles} src={`${baseUrl}${image.url}`} alt="martfury" />
                </div>
            </Link>
        );
    } else {
        return (
            <Link legacyBehavior href={link ? link : '/shop'}>
                <div className="ps-collection" style={imageStyles}>
                    <img style={imageStyles} src={defImage} alt="martfury" />
                </div>
            </Link>
        );
    }
};

export default Promotion;
