import React, { useEffect, useRef, useState } from 'react';
import "./order.css"
import ReturnModel from '../returnModel/ReturnModel';
import ReplacementModel from '../replacementModel/ReplacementModel';


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
    ///////////////////////
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
                        <ReturnModel openMenu={openMenu} />
                        <ReplacementModel openMenu={openMenu} />
                    </div>
                    num
                </div>
                <div className='orderDate'>
                    1/1/2024
                </div>
                <div onClick={() => setOpen(!open)}>
                    <svg className={open ? "orderArrwOpen" : "orderArrwClose"}
                        viewBox="0 0 16 16" fill="#202126" >
                        <path d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
                    </svg>
                </div>
            </div>
            <div className={!open ? "hiddenBody" : ''} >
                <hr className='hrOrder'></hr>
                <div className='orderBody'>
                    <div className='haderline'>
                        <span className='callOrder'>  photo </span>
                        <span className='callOrder'>  name</span>
                        <span className='callOrder'>  price</span>
                        <span className='callOrder'>  countety </span>
                        <span className='callOrder'>  Total</span>
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
                        <span className='priceDiv'>  Order status  :</span>
                        <span className='priceDiv'>success</span>
                    </div>
                    <div className='totalOrder'>
                        <span className='priceDiv'>   total price :</span>
                        <span className='priceDiv'> 00,00</span>
                    </div>
                </div>
            </div>
        </div >
    );
}
export default Order;
