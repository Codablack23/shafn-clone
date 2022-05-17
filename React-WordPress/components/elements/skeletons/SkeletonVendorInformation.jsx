import React from 'react';
import { Skeleton } from 'antd';

export function SkeletonBanner(){
  return(
    <div className="ps-skeleton--vendor mb-20">
    <div className="mb-10">
        <Skeleton.Input active={true} size={1000} style={{height: 200}} />
    </div>
    <Skeleton active={true} paragraph={{ rows: 10, title: true }} />
</div>
  )
}
const SkeletonVendorInformation = () => {
    return (
        <div className="ps-skeleton--vendor mb-20">
            <div className="mb-10">
                <Skeleton.Input active={true} size={500} style={{height: 200}} />
            </div>
            <Skeleton active={true} paragraph={{ rows: 10, title: true }} />
        </div>
    );
};

export default SkeletonVendorInformation;
