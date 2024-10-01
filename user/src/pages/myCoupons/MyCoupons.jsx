import React, { useState } from 'react';
import './myCoupons.css'
import CouponCard from '../../allExtensions/myCouponCard/CouponCard';
import Gift from '../../image/coupon.png'

const MyCoupons = () => {
    const [open, setOpen] = useState(false)
    return (
        <div className='myCoupons'>
            <div className='myCouponsTitle'>
                My Coupons
            </div>
            <div className='myCouponsContener'>
                <div className='myCouponsNot'>
                    <div className='vv1' > You have “4” coupon so far.
                        Continue collecting purchasing points to get a new coupon  </div>
                </div>
                <div className='couponsInfo'>
                    <div className='coInfo'>
                        Your current points<br /> balance 20/50
                    </div>
                    <img className='coImg' src={Gift} />
                </div>
                <div className='outerTap' >
                    <div className='inerTap' >  </div>
                </div>
                <div className='coupons'>
                    <CouponCard />
                    <CouponCard />
                    <CouponCard />
                    <CouponCard />
                    <CouponCard />
                    <CouponCard />
                </div>
            </div>
        </div >
    );
}

export default MyCoupons;
