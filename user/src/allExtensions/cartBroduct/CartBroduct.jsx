import React, { useState } from 'react';
import './cartBroduct.css'
import { Carousel, Form } from 'react-bootstrap';
import Api from '../API';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../RTK/shoppingCart/addToCartSlice';
import { removeFromCart } from '../../RTK/shoppingCart/removeFromCartSlice';
import { useTranslation } from 'react-i18next';

const CartBroduct = (props) => {
    /////////////////////////
    const dispatch = useDispatch()
    /////////////////////////
    const handelDelete = () => {
        const value = {
            id: props?.deleteId,
            paymentMethod: props?.paymentMethod
        }
        dispatch(removeFromCart(value))
        setTimeout(() => {
            props.handelReload()
        }, 1000);

    }
    const handelChangeQuantity = (e) => {
        const value = {
            product: props?.id,
            size: props?.size,
            color: props?.color,
            quantity: e,
            paymentMethod: props?.paymentMethod
        }
        dispatch(addToCart(value))
        setTimeout(() => {
            props.handelReload()
        }, 1000);
    }
    ////////////////////////////////////
    const { t } = useTranslation();
    return (
        <div className='cartBroduct'>
            <div className='div70'>
                <div className='cartBroductImage'>
                    <Carousel data-bs-theme="dark" className='cartImgs'>
                        {props?.images?.map((img, index) => (
                            <Carousel.Item key={index}  >
                                <img
                                    className="w-100 profileImg"
                                    src={`${Api}/users/${img}`}
                                    alt={index}
                                />
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </div>
                <div className='cartBroductName'>
                    <div className='cartName'>  {props?.name} </div>
                    {props?.paymentMethod == "money" && <div className=''>  {t('cart.price')}  {props?.price}.{t('public.sar')}</div>}
                    {props?.paymentMethod == "points" && <div className=''> {t('cart.price')}  {props?.price}.{t('public.point')}</div>}
                    {t('cart.size')} {props?.size}
                    <div className='cartColor1' >   {t('cart.color')} <div className='cartColorSquer' style={{ backgroundColor: props?.color }}> </div></div>
                </div>
            </div>
            <div className='div30'>
                <div className='cartBroductTotal'>
                    {props?.paymentMethod == "money" && <div className='qq'>  {props?.quantity * props?.price}.{t('public.sar')}</div>}
                    {props?.paymentMethod == "points" && <div className='qq'> {props?.quantity * props?.price}.{t('public.point')}</div>}
                    <div className='cartBroductQuantity'>
                        <div className='green'
                            onClick={() => handelChangeQuantity(props?.quantity + 1)}
                        >
                            <svg className='increaseICon' xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                                <path id="Path_2299" data-name="Path 2299" d="M4,0H28a4,4,0,0,1,0,8H4A4,4,0,0,1,4,0Z" transform="translate(0 12)" fill="#4db051" />
                                <path id="Path_2298" data-name="Path 2298" d="M4,0H28a4,4,0,0,1,0,8H4A4,4,0,0,1,4,0Z" transform="translate(12 32) rotate(-90)" fill="#4db051" />
                            </svg>
                        </div >
                        <div className=''>
                            {props?.quantity}
                        </div>
                        <div className='green'
                            onClick={() => (props?.quantity - 1 >> 0 ? handelChangeQuantity(props?.quantity - 1) : handelDelete())}
                        >
                            <svg className='decreaseICon' xmlns="http://www.w3.org/2000/svg" width="32" height="8" viewBox="0 0 32 8">
                                <path id="Path_2299" data-name="Path 2299" d="M4,0H28a4,4,0,0,1,0,8H4A4,4,0,0,1,4,0Z" fill="#4db051" />
                            </svg>
                        </div>
                    </div >
                </div>
                <div className='cartDelete1'>
                    <div className='red'
                        onClick={() => handelDelete()}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 26 26" ><path fill="currentColor" d="M11.5-.031c-1.958 0-3.531 1.627-3.531 3.594V4H4c-.551 0-1 .449-1 1v1H2v2h2v15c0 1.645 1.355 3 3 3h12c1.645 0 3-1.355 3-3V8h2V6h-1V5c0-.551-.449-1-1-1h-3.969v-.438c0-1.966-1.573-3.593-3.531-3.593zm0 2.062h3c.804 0 1.469.656 1.469 1.531V4H10.03v-.438c0-.875.665-1.53 1.469-1.53zM6 8h5.125c.124.013.247.031.375.031h3c.128 0 .25-.018.375-.031H20v15c0 .563-.437 1-1 1H7c-.563 0-1-.437-1-1zm2 2v12h2V10zm4 0v12h2V10zm4 0v12h2V10z"></path></svg>
                    </div>
                </div>
            </div>
        </div >
    );
}
export default CartBroduct;
