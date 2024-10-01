import React from 'react';
import './couponCard.css'
import CouponImg from '../../image/coupon.png'
import OfferModel from '../offerModel/OfferModel';
const CouponCard = (props) => {
    return (
        <div className='couponCard  '>
            <img className='CouponImg bounce-7 ' src={CouponImg} />
            <div className='CouponText'> discount</div>
            <div>
                <div className='discount'></div>
                <div className='DisValue'>
                    {props?.discount}%
                </div>
            </div>
            <div className='CouponText'> on </div>
            <div className='CouponText'>   {props?.name} </div>
            <OfferModel
                description={props?.description}
                discount={props?.discount}
                mainImage={props?.mainImage}
                name={props?.name}
                priceA={props?.priceA}
                priceB={props?.priceB}
                products={props?.products}
                id={props?.id}
                numCounter={props?.numCounter}
            />
        </div>
    );
}
export default CouponCard;
