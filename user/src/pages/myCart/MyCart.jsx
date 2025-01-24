import React, { useEffect, useState } from 'react';
import './myCart.css'
import CartBroduct from '../../allExtensions/cartBroduct/CartBroduct';
import { useDispatch, useSelector } from 'react-redux';
import { getCart } from '../../RTK/shoppingCart/getCartSlice';
import { emptyCart } from '../../RTK/shoppingCart/emptyCartSlice';
import CartPerfumes from '../../allExtensions/cartPerfumes/CartPerfumes';
import CartFlowers from '../../allExtensions/cartFlowers/CartFlowers';
import Cookies from 'universal-cookie';
import CartOffer from '../../allExtensions/cartOffer/CartOffer';
import { Toaster } from 'react-hot-toast';
import SendOrderModel from '../../allExtensions/sendOrderModel/SendOrderModel';
import { useTranslation } from 'react-i18next';

const MyCart = () => {
    const cookies = new Cookies();
    let lng = ''
    let token = ''
    if (cookies.get('token') !== undefined || null) {
        token = true
    } else token = false
    if (cookies.get('i18next') === "ar") {
        lng = "ar"
    } else lng = "en"
    /////////////////////////////
    const cartBroduct = useSelector(state => state.getCart)?.data?.cart
    /////////////////////////////
    const [totalFlowrs, setTotalFlowrs] = useState(0)
    const [totalPerfumes, setTotalPerfumes] = useState(0)
    const [totalProducts, setTotalProducts] = useState(0)
    const [totalOffers, setTotalOffers] = useState(0)
    const [pointsCost, setPointsCost] = useState(0)
    const [pointsEarned, setPointsEarned] = useState(0)
    const [quantity, setQuantity] = useState(1)
    const [reload, setReload] = useState("")
    /////////////////////////////
    const dispatch = useDispatch()
    /////////////////////////////
    const handelReload = () => {
        setReload(!reload)
    }
    /////////////////////////////
    const handelClear = () => {
        setTotalFlowrs(0)
        setTotalPerfumes(0)
        setTotalProducts(0)
        setTotalOffers(0)
        setPointsCost(0)
        setPointsEarned(0)

    }
    /////////////////////////////
    const handelClearMyCart = () => {
        dispatch(emptyCart())
        setTimeout(() => {
            setReload(!reload)
            handelClear()
        }, 1000);
    }
    //////////////////////////////
    useEffect(() => {
        if (cookies.get('token') !== undefined || null) {
            dispatch(getCart())
        }
    }, [dispatch, reload])
    /////////////////////////////
    useEffect(() => {
        if (cartBroduct?.products?.moneyProducts !== undefined || null) {
            setTotalProducts(cartBroduct?.products?.moneyProducts?.reduce((accumulator, currentValue) =>
                accumulator + (currentValue?.price * currentValue?.quantity), 0)),
                setPointsCost(cartBroduct?.products?.pointsProducts?.reduce((accumulator, currentValue) =>
                    accumulator + (currentValue?.price * currentValue?.quantity), 0)),
                setPointsEarned(cartBroduct?.products?.pointsEarned)
        }
        setTotalFlowrs(cartBroduct?.naturalFlowers?.reduce((accumulator, currentValue) =>
            accumulator + (currentValue?.totalPrice), 0))
        setTotalPerfumes(cartBroduct?.perfumes?.reduce((accumulator, currentValue) =>
            accumulator + (currentValue?.totalPrice), 0))
        setTotalOffers(cartBroduct?.offers?.reduce((accumulator, currentValue) =>
            accumulator + (currentValue?.priceA), 0))
    }, [dispatch, reload, cartBroduct])
    /////////////////////////// 
    useEffect(
        function () {
            document.title = `SUNFLOWER - My Cart `;
            return function () { document.title = 'SUNFLOWER' };
        }, [])
    ////////////////////////////////////
    const { t } = useTranslation();
    return (
        <>
            <Toaster />
            <div className='bage'>
                <div className='title'>
                    {t('cart.title')}
                </div>
                <div className='myCartContener'>
                    <div className='cart'>
                        <div className='cartHader'>
                            <button className='cleanCart'
                                onClick={handelClearMyCart}>
                                {t('cart.clean')}
                            </button>
                        </div>
                        <hr className='hrCart' />
                        <div className='cartMain'>
                            <div className='cartBody1'>
                                {(cartBroduct?.products?.length === 0
                                    && cartBroduct?.offers?.length === 0
                                    && cartBroduct?.naturalFlowers?.length === 0
                                    && cartBroduct?.perfumes?.length === 0
                                ) &&
                                    <div className='noProducts' >{t('cart.message')}{" "}  !!
                                        <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 36 36"><path fill="#ffcc4d" d="M36 18c0 9.941-8.059 18-18 18c-9.94 0-18-8.059-18-18C0 8.06 8.06 0 18 0c9.941 0 18 8.06 18 18"></path><ellipse cx={11.5} cy={16.5} fill="#664500" rx={2.5} ry={3.5}></ellipse><ellipse cx={24.5} cy={16.5} fill="#664500" rx={2.5} ry={3.5}></ellipse><path fill="#664500" d="M12 28c2-5 13-5 13-3c0 1-8-1-13 3"></path></svg>
                                    </div>
                                }
                                {cartBroduct?.naturalFlowers?.map((flower, index) => (
                                    <CartFlowers
                                        key={index}
                                        message={flower?.message}
                                        deleteId={flower?._id}
                                        price={flower?.totalPrice}
                                        chocolates={flower?.chocolates}
                                        band={flower?.details?.band}
                                        paper={flower?.details?.paper}
                                        flowersCount={flower?.naturalFlower?.count}
                                        image={flower?.naturalFlower?.image}
                                        handelReload={handelReload}
                                    />
                                ))
                                }
                                {cartBroduct?.perfumes?.map((perfume, index) => (
                                    <CartPerfumes
                                        key={index}
                                        message={perfume?.message}
                                        deleteid={perfume?._id}
                                        price={perfume?.totalPrice}
                                        perfumeordervariants={perfume?.perfumeOrderVariants}
                                        handelreload={handelReload}
                                    />
                                ))
                                }
                                {cartBroduct?.products?.moneyProducts?.map((product, index) => (
                                    <CartBroduct
                                        key={index}
                                        id={product?.product?._id}
                                        color={product?.color}
                                        size={product?.size}
                                        deleteId={product?._id}
                                        quantity={product?.quantity}
                                        name={lng == "ar" ? product?.product?.nameAr : product?.product?.name}
                                        price={product?.price}
                                        images={product?.product?.images}
                                        paymentMethod={"money"}
                                        handelReload={handelReload}
                                    />
                                ))
                                }
                                {cartBroduct?.products?.pointsProducts?.map((product, index) => (
                                    <CartBroduct
                                        key={index}
                                        id={product?.product?._id}
                                        color={product?.color}
                                        size={product?.size}
                                        deleteId={product?._id}
                                        quantity={product?.quantity}
                                        name={lng == "ar" ? product?.product?.nameAr : product?.product?.name}
                                        price={product?.price}
                                        images={product?.product?.images}
                                        paymentMethod={"points"}
                                        handelReload={handelReload}
                                    />
                                ))
                                }
                                {cartBroduct?.offers?.map((offer, index) => (
                                    <CartOffer
                                        key={index}
                                        id={offer?.offerId}
                                        deleteId={offer?._id}
                                        quantity={offer?.quantity}
                                        name={lng == "ar" ? offer.nameAr : offer.name}
                                        price={offer?.priceA}
                                        image={offer?.mainImage}
                                        paymentMethod={"points"}
                                        handelReload={handelReload}
                                    />
                                ))
                                }
                            </div>
                            <div className='cartBody2'>
                                <div>   {t('cart.orderSummary')}</div>
                                <hr className='tapp' />
                                <div className='orderSummary'>
                                    <div className='kk'> <div>  {t('cart.totalMoneyCost')} {" "} : </div>  {"  "} {totalFlowrs + totalOffers + totalPerfumes + totalProducts}.{t('public.sar')}</div>
                                    <div className='kk'> <div>  {t('cart.totalPointsCost')}   {" "} : </div> {"  "} {pointsCost}.{t('public.point')} </div>
                                    <div className='kk'> <div>  {t('cart.totalPointsEarned')} {" "} :  </div> {"  "} {pointsEarned}.{t('public.point')}  </div>
                                </div>
                            </div>
                        </div>
                        <hr className='hrCart' />
                        <div className='cartFooter'>
                            <span className='totalCart1'>  {t('cart.totalPriceOfTheOrder')} </span>
                            <div className='totalCart2'>
                                {totalFlowrs + totalOffers + totalPerfumes + totalProducts}.{t('public.sar')}
                            </div>
                        </div>
                        {(totalFlowrs + totalOffers + totalPerfumes + totalProducts
                        ) &&
                            <>
                                <hr className='hrCart' />
                                <div className='butten'>

                                    <SendOrderModel
                                        cart={cartBroduct}
                                        handelReload={handelReload}
                                        handelClear={handelClearMyCart}
                                    />

                                </div>
                            </>}
                    </div>
                </div>
            </div>
        </>
    );
}
export default MyCart;
