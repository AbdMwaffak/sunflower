import React from 'react';
import './offerCard.css'
import CouponImg from '../../images/coupon.png'
import { Link, useNavigation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
const OfferCard = (props) => {
    ////////////////////////////////////
    const { t, i18n } = useTranslation();
    return (
        <div className='couponCard  '>
            <img className='CouponImg bounce-7 ' src={CouponImg} />
            <div className='CouponText'>  {t('offers.discount')}</div>
            <div className='DisValue'>
                {props.discount}%
            </div>
            <div className='CouponText'>  {t('offers.on')} </div>
            <div className='CouponText'>   {props?.name} </div>
            <Link to={`/EditeOffer/${props.id}`} className='link' >
                <button className='getIt'>  {t('offers.details')}  </button>
            </Link>
        </div>

    );
}

export default OfferCard;
