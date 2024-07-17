import React, { useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';
import { getCart } from '~/store/cart/action';
import WPLayout from '~/wp-components/layouts/WPLayout';
import WPPayment from '~/wp-components/account/WPPayment';
import { scrollPageToTop } from '~/utilities/common-helpers';
import { useRouter } from 'next/router';


//make this function a default export
//export default function WPProductDetailPage({pid}){

const WPProductDetailPage = ({ pid }) => {
    const dispatch = useDispatch()
    const router = useRouter();
}


const PaymentPage = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCart());
    }, [dispatch]);

    return (
        <div ref={scrollPageToTop}>
            <WPLayout>
                <div className="ps-page--simple">
                    <WPPayment />
                </div>
            </WPLayout>
        </div>
    );
};

export default connect()(PaymentPage);
