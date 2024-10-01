import React from 'react';
import './couponCard.css'
import CouponImg from '../../image/coupon.png'
const CouponCard = (props) => {
    return (
        <div className='couponCard  '>
            <img className='CouponImg bounce-7 ' src={CouponImg} />
            <div className='CouponText'> Discount Coupon</div>
            <div className='DisValue'>
                10%
            </div>
            <div className='CouponText'> offered by </div>
            <div className='CouponText'>  "Adwaa Segal Dental"  </div>
            <div className='CouponText'> on </div>
            <div className='CouponText'>  "Orthodontics"  </div>
            <button className='getIt'>  Get it  </button>
        </div>
    );
}
export default CouponCard;
