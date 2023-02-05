import React from 'react';
import Link from 'next/link';
import {Image} from 'antd'
import { baseUrl } from '../../../repositories/Repository';
import { useEffect } from 'react';

const BannerItem = ({ source }) => {
    // useEffect(()=>{
    //     console.log(`${baseUrl}${source.image.url}`)
    // },[])
    if (source) {
        return (
           <div className="pb-3">
             <Link href="/shop">
                <div
                    className=" bg--cover "
                    style={{
                        // backgroundImage: `url('${baseUrl}${source.image.url}')` old implementation,
                        backgroundImage: `linear-gradient(to right,rgba(240,240,240,0.1),rgba(0,0,0,0.0)), url('${source.image.url}')`,
                    }}>
                    {/*<img src={`${baseUrl}${source.image.url}`} alt="martfury" />*/}
                    <div className='p-3' style={{minHeight:"200px"}}>
                         {/* <button className="w3-black" style={{height:40}}>Shop Now</button> */}
                    </div>
                </div>
            </Link>
           </div>
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
