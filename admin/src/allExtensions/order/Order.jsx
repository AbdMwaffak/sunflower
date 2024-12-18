import React, { useEffect, useRef, useState } from 'react';
import "./order.css"
import { useTranslation } from 'react-i18next';
// import ReturnModel from '../returnModel/ReturnModel';
// import ReplacementModel from '../replacementModel/ReplacementModel';


const Order = () => {
    const [open, setOpen] = useState(false)
    const [openMenu, setOpenMenu] = useState(false)
    ///////////////////////
    let menuRef = useRef()
    ///////////////////////
    useEffect(() => {
        let handler = (e) => {
            if (!menuRef.current.contains(e.target)) {
                setOpenMenu(false);
            }
        };
        document.addEventListener("mousedown", handler)
        return () => {
            document.removeEventListener("mousedown", handler)
        };
    })
    ////////////////////////////////////
    const { t, i18n } = useTranslation();
    return (
        <div className={open ? "orderOpen" : "orderClose"}>
            <div className='orderHader'>
                <div className='rightHader' ref={menuRef}>
                    <svg className='menu' onClick={() => setOpenMenu(!openMenu)}
                        viewBox="0 0 24 24" height="24" width="24"
                        preserveAspectRatio="xMidYMid meet"
                        version="1.1" x="0px" y="0px" enable-background="new 0 0 24 24">
                        <path fill="currentColor" d="M12,7c1.104,0,2-0.896,2-2c0-1.105-0.895-2-2-2c-1.104,0-2,0.894-2,2 C10,6.105,10.895,7,12,7z M12,9c-1.104,0-2,0.894-2,2c0,1.104,0.895,2,2,2c1.104,0,2-0.896,2-2C13.999,9.895,13.104,9,12,9z M12,15 c-1.104,0-2,0.894-2,2c0,1.104,0.895,2,2,2c1.104,0,2-0.896,2-2C13.999,15.894,13.104,15,12,15z">
                        </path></svg>

                    <div className={openMenu ? "menuOpen" : "menuClose"} >
                        {/* <ReturnModel openMenu={openMenu} />
                        <ReplacementModel openMenu={openMenu} /> */}
                    </div>
                    num
                </div>
                <div className='orderDate'>
                    1/1/2024
                </div>

                <div className='addB' onClick={() => setOpen(!open)} style={{ display: "flex" }}>
                    <svg className={open ? "orderArrwOpen" : "orderArrwClose"}
                        xmlns="http://www.w3.org/2000/svg" width={28} height={28} viewBox="0 0 24 24" ><g transform="rotate(-90 12 12)"><path stroke="currentColor" strokeDasharray={8} strokeDashoffset={8} strokeLinecap="round" strokeWidth={2} d="M9 12L14 7M9 12L14 17" fill="currentColor"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="8;0"></animate></path></g></svg>
                </div>

            </div>
            <div className={!open ? "hiddenBody" : ''} >
                <hr className='hrOrder'></hr>
                <div className='orderBody'>
                    <div className='haderline'>
                        <span className='callOrder'> {t('orders.photo')}   </span>
                        <span className='callOrder'> {t('orders.name')} </span>
                        <span className='callOrder'> {t('orders.price')} </span>
                        <span className='callOrder'> {t('orders.countety')}  </span>
                        <span className='callOrder'> {t('orders.total')} </span>
                    </div>
                    <div className='orBody'>
                        <tr className='line'>
                            <span className='callOrder'>  photo </span>
                            <span className='callOrder'>  name</span>
                            <span className='callOrder'>  price</span>
                            <span className='callOrder'>  countety </span>
                            <span className='callOrder'>  Total</span>
                        </tr>
                        <tr className='line'>
                            <span className='callOrder'>  photo </span>
                            <span className='callOrder'>  name</span>
                            <span className='callOrder'>  price</span>
                            <span className='callOrder'>  countety </span>
                            <span className='callOrder'>  Total</span>
                        </tr>
                        <tr className='line'>
                            <span className='callOrder'>  photo </span>
                            <span className='callOrder'>  name</span>
                            <span className='callOrder'>  price</span>
                            <span className='callOrder'>  countety </span>
                            <span className='callOrder'>  Total</span>
                        </tr>
                        <tr className='line'>
                            <span className='callOrder'>  photo </span>
                            <span className='callOrder'>  name</span>
                            <span className='callOrder'>  price</span>
                            <span className='callOrder'>  countety </span>
                            <span className='callOrder'>  Total</span>
                        </tr>
                        <tr className='line'>
                            <span className='callOrder'>  photo </span>
                            <span className='callOrder'>  name</span>
                            <span className='callOrder'>  price</span>
                            <span className='callOrder'>  countety </span>
                            <span className='callOrder'>  Total</span>
                        </tr>
                    </div>
                </div>
                <hr className='hrOrder'></hr>
                <div className='orderFooter'>
                    <div className='stateOrder'>
                        <span className='priceDiv'>  {t('orders.status')}  :</span>
                        <span className='priceDiv'>success</span>
                    </div>
                    <div className='totalOrder'>
                        <span className='priceDiv'>    {t('orders.totalPrice')} :</span>
                        <span className='priceDiv'> 00,00</span>
                    </div>
                </div>
            </div>
        </div >
    );
}
export default Order;
