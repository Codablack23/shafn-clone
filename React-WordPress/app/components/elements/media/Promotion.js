import React,{useEffect} from 'react';
import Link from 'next/link';
import { baseUrl } from '@/repositories/Repository';


const Promotion = ({ link, image ,defImage}) => {
   if (image) {
        return (
            <Link legacyBehavior href={link}>
                <div className="ps-collection" style={{height:220}}>
                    <img style={{width:"100%",objectFit:"cover"}} src={`${baseUrl}${image.url}`} alt="martfury" />
                </div>
            </Link>
        );
    } else {
        return (
            <Link legacyBehavior href={link ? link : '/shop'}>
                <div className="ps-collection" style={{height:220}}>
                    <img style={{width:"100%",height:220,objectFit:"cover"}} src={defImage} alt="martfury" />
                </div>
            </Link>
        );
    }
};

export default Promotion;
