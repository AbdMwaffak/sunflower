import React from 'react';
import './offerCard.css'
import CouponImg from '../../images/coupon.png'
import { Link, useNavigation } from 'react-router-dom';
const OfferCard = (props) => {

    return (
        <div className='couponCard  '>
            <img className='CouponImg bounce-7 ' src={CouponImg} />
            <div className='CouponText'> Discount</div>
            <div className='DisValue'>
                {props.discount}%
            </div>
            <div className='CouponText'> on </div>
            <div className='CouponText'>   {props?.name} </div>
            <Link to={`/EditeOffer/${props.id}`} className='link' >
                <button className='getIt'> Details  </button>
            </Link>
        </div>

    );
}

export default OfferCard;
