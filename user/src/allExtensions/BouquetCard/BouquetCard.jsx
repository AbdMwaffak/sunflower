import React, { useEffect, useState } from 'react';
import './bouquetCard.css'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router';
import Api from '../API';
import Cookies from 'universal-cookie';
import NoToken from '../../allExtensions/noToken/NoToken';

import { useTranslation } from 'react-i18next';
import { getCart } from '../../RTK/shoppingCart/getCartSlice';
import { Toaster } from 'react-hot-toast';
import AllowAddition from '../allowAddition/AllowAddition';
import { addFlowerToCart } from '../../RTK/shoppingCart/addFlowerToCartSlice';
import Aaa from '../aaa/Aaa';

const BouquetCard = (props) => {
    const cookies = new Cookies();
    let token = ''
    if (cookies.get('token') !== undefined || null) {
        token = true
    } else token = false
    ///////////////////////////////
    const cartBroduct = useSelector(state => state.getCart)?.data?.cart
    const [openModel, setOpenModel] = useState(false);
    const [openModel2, setOpenModel2] = useState(false);
    const [openModel3, setOpenModel3] = useState(false);
    const [turnOn, setTurnOn] = useState(false);
    ///////////////////////////// 
    const [reload, setReload] = useState("")
    const dispatch = useDispatch()
    ///////////////////////////////
    const handleSubmit = () => {
        if (cookies.get('token') !== undefined || null) {
            if (cartBroduct?.perfumes?.length === 0 && cartBroduct?.products?.length === 0) {
                const value = {
                    naturalFlower: props.id,
                    paymentMethod: "money"
                    // chocolate: oneNum,
                    // totalPrice: props.price,
                    // message: card,
                }
                dispatch(addFlowerToCart(value))
                setReload(!reload)
                setTurnOn(true)
                setTimeout(() => {
                    setTurnOn(false);
                    props.numCounter()
                }, 4000);

            } else {
                setOpenModel(true)
            }
            // }
        } else {
            setOpenModel3(true)
        }
    };
    ///////////////////////////////
    const handelReload = () => {
        setReload(!reload)
    }
    /////////////////////////////
    const handleClose = () => {
        setTimeout(() => {
            setOpenModel(false)
            setOpenModel2(false)
            setOpenModel3(false)
        }, 1000);
    }
    /////////////////////////////
    useEffect(() => {
        dispatch(getCart())
        if (cookies.get('token') !== undefined || null) {
        }
    }, [dispatch, reload])
    //////////////////////////
    ///////////////////////////////
    const { t, } = useTranslation();
    return (
        <>
            <Toaster />
            {openModel3 &&
                <NoToken
                    handleClose={handleClose}
                />
            }
            {openModel2 &&
                <NoPaperOrStrip
                    handleClose={handleClose}
                    flowersNumber={sunflowersInfo?._id}
                // paper={paper?._id}
                // strip={band?._id}
                />
            }
            {openModel &&
                <AllowAddition
                    handleClose={handleClose}
                    handelReload={handelReload}
                    handleSubmit={handleSubmit}
                />
            }

            <div className='editBouquet'>
                <div className='media'>
                    <img className='imgbouquet'
                        src={`${Api}/users/${props?.image}`} />
                </div>

                <div className='bouquetHader'>
                    <div className='hader1' >
                        {t('flower.cuantety')}  :   {props.count}
                    </div>
                    <div className='hader2'>
                        {t('flower.price')}  :   {props.price}.{t('public.sar')}
                    </div>
                </div>
                {/* <hr className='phr' /> */}
                <div className='bouquetDescription' >
                    {props?.description}
                </div>
                {/* <hr className='phr' /> */}
                <div className='bouquetTail'  >
                    <button className='cardButton'
                        onClick={handleSubmit}
                    >
                        {t('product.addtoCart(by money)')}
                        <Aaa turnOn={turnOn} />
                    </button>
                    {/* <DeleteBouquetModel
                    delete={handelDelete}
                /> */}
                </div>

            </div >
        </>
    );
}

export default BouquetCard;
