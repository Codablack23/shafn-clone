import React from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import { getItemBySlug } from '@/utilities/product-helper';
import Promotion from '@/app/components/elements/media/Promotion';
import { useAppSelector } from '@/redux-store/hooks';

export default function HomeAdsColumns (){
    const media = useAppSelector(state=>state.media)
    const {promotions} = media
    const promotionData = getItemBySlug(
        promotions,
        'home_fullwidth_promotions'
    );
    let promotion1, promotion2, promotion3;

    if (promotionData) {
        promotion1 = getItemBySlug(promotionData.items, 'middle_1');
        promotion2 = getItemBySlug(promotionData.items, 'middle_2');
        promotion3 = getItemBySlug(promotionData.items, 'middle_3');
    }
    return (
        <div className="">
            <div className="">
                <div className="row bg-[#52432f] -mt-12 px-14 pt-32 pb-32">
                    <div className="col-xl-4 col-lg-4 mb-2 col-md-12 col-sm-12 col-12 ">
                        <Promotion
                            link="/shop"
                            image={promotion1 ? promotion1.image : null}
                            defImage={"/promotion-images/promotion-1.jpg"}
                            styles={{height:"350px", width:"100%",objectFit:"cover"}}
                        />
                    </div>
                    <div className="col-xl-4 col-lg-4 mb-2 col-md-12 col-sm-12 col-12 ">
                        <Promotion
                            link="/shop"
                            image={promotion2 ? promotion2.image : null}
                            defImage={"/promotion-images/promotion-2.jpg"}
                            styles={{height:"350px", width:"100%",objectFit:"cover"}}
                        />
                    </div>
                    <div className="col-xl-4 col-lg-4 mb-2 col-md-12 col-sm-12 col-12 ">
                        <Promotion
                            link="/shop"
                            image={promotion3 ? promotion3.image : null}
                            defImage={"/promotion-images/promotion-3.jpg"}
                            styles={{height:"350px", width:"100%",objectFit:"cover"}}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
