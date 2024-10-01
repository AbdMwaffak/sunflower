import React, { useState } from 'react';
import './cartBroduct11.css'
import product from '../../image/Accessories.jpg';
import { Carousel, Form } from 'react-bootstrap';
import Api from '../API';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../RTK/shoppingCart/addToCartSlice';
import { removeFromCart } from '../../RTK/shoppingCart/removeFromCartSlice';

const CartBroduct11 = (props) => {
    const [quantity, setQuantity] = useState(1)
    /////////////////////////
    const dispatch = useDispatch()
    /////////////////////////
    const handelDelete = () => {
        const value = {
            id: props?.deleteId,
            paymentMethod: props?.paymentMethod
        }
        dispatch(removeFromCart(value))
        props.handelReload()
    }
    const handelChangeQuantity = (e) => {
        // if (nsize != " " && ncolor != " ") {
        //     if (me?.points != 0 && me?.points >= nPsize) {
        //         if (cartBroduct?.naturalFlowers?.length === 0) {
        const value = {
            product: props?.id,
            size: props?.size,
            color: props?.color,
            quantity: e,
            paymentMethod: props?.paymentMethod
        }
        dispatch(addToCart(value))
        props.handelReload()
        console.log(value)
    }

    ///////////////////////////////

    return (

        <div className={props.index == 0 ? 'cartBroduct111' : 'cartBroduct11'}>


            <div className='cartBroductImage11 cell'>
                <Carousel data-bs-theme="dark" className='cartImgs11'>
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

            <div className='cartBroductName cell'>

                <div className='cartName'>  {props?.name} </div>
                {props?.paymentMethod == "money" && <div className=''> price : {props?.price}.ras</div>}
                {props?.paymentMethod == "points" && <div className=''> price : {props?.price}.point</div>}
                {/* size : {props?.size} */}

                {/* <div className='cartColor1' >   color : <div className='cartColorSquer' style={{ backgroundColor: props?.color }}> </div></div> */}

            </div>



            <div className='cartBroductTotal cell'>
                <div className='qq'>  {props?.quantity * props?.price}.ras</div>

                <div className='cartBroductQuantity cell'>

                    <div className=''>
                        {props?.quantity}

                    </div>



                </div >

            </div>

        </div >
    );
}

export default CartBroduct11;
