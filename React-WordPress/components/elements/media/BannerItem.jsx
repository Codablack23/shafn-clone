import React from 'react';
import Link from 'next/link';
import {Image} from 'antd'
import { baseUrl } from '../../../repositories/Repository';
import { useEffect } from 'react';

const BannerItem = ({ source }) => {
    useEffect(()=>{
        console.log(`${baseUrl}${source.image.url}`)
    },[])
    if (source) {
        return (
            <Link href="/shop">
                <a
                    className="ps-banner-item--default bg--cover"
                    style={{
                        backgroundImage: `url('${baseUrl}${source.image.url}')`,
                    }}>
                    {/*<img src={`${baseUrl}${source.image.url}`} alt="martfury" />*/}
                </a>
            </Link>
        );
    } else {
        return (
            <Link href="/shop">
                <a>
                    <a className="ps-collection">
                        <Image src="/static/img/not-found.jpg" alt="shafN" />
                    </a>
                </a>
            </Link>
        );
    }
};

export default BannerItem;
