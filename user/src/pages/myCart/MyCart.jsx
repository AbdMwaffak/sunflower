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

const MyCart = () => {
    const cookies = new Cookies();
    /////////////////////////////
    const cartBroduct = useSelector(state => state.getCart)?.data?.cart
    /////////////////////////////
    const [total, setTotal] = useState(0)
    const [quantity, setQuantity] = useState(1)
    const [reload, setReload] = useState("")
    /////////////////////////////
    const dispatch = useDispatch()
    /////////////////////////////
    const handelReload = () => {
        setReload(!reload)
    }
    /////////////////////////////
    const handelClearMyCart = () => {
        dispatch(emptyCart())
        setReload(!reload)
    }
    //////////////////////////////
    useEffect(() => {
        if (cookies.get('token') !== undefined || null) {
            dispatch(getCart())
        }
    }, [dispatch, reload])
    /////////////////////////////
    useEffect(() => {
        setTotal(cartBroduct?.products?.moneyProducts?.reduce((accumulator, currentValue) =>
            accumulator + (currentValue?.price * currentValue?.quantity), 0)
        )
    }, [dispatch, reload, cartBroduct])
    /////////////////////////// 
    useEffect(
        function () {
            document.title = `SUNFLOWER - My Cart `;
            return function () { document.title = 'SUNFLOWER' };
        }, [])
    ///////////////////
    return (
        <>
            <Toaster />

            <div className='myCart'>
                <div className='myCartTitle'>
                    My Shopping Cart
                </div>
                <div className='myCartContener'>
                    <div className='cart'>
                        <div className='cartHader'>
                            <button className='cleanCart'
                                onClick={handelClearMyCart}>
                                Clean My Cart
                            </button>
                        </div>
                        <hr className='hrCart' />
                        <div className='cartMain'>
                            <div className='cartBody1'>
                                {(cartBroduct?.products?.length === 0
                                    && cartBroduct?.products?.length === 0
                                    && cartBroduct?.naturalFlowers?.length === 0
                                    && cartBroduct?.perfumes?.length === 0
                                ) &&
                                    <div className='noProducts' > You haven't added any product to your cart  yet
                                        <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 36 36"><path fill="#ffcc4d" d="M36 18c0 9.941-8.059 18-18 18c-9.94 0-18-8.059-18-18C0 8.06 8.06 0 18 0c9.941 0 18 8.06 18 18"></path><ellipse cx={11.5} cy={16.5} fill="#664500" rx={2.5} ry={3.5}></ellipse><ellipse cx={24.5} cy={16.5} fill="#664500" rx={2.5} ry={3.5}></ellipse><path fill="#664500" d="M12 28c2-5 13-5 13-3c0 1-8-1-13 3"></path></svg>
                                        !!   </div>
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
                                        deleteId={perfume?._id}
                                        price={perfume?.totalPrice}
                                        perfumeOrderVariants={perfume?.perfumeOrderVariants}
                                        handelReload={handelReload}
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
                                        name={product?.product?.name}
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
                                        name={product?.product?.name}
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
                                        name={offer?.name}
                                        price={offer?.priceA}
                                        image={offer?.mainImage}
                                        paymentMethod={"points"}
                                        handelReload={handelReload}
                                    />
                                ))
                                }
                            </div>
                            <div className='cartBody2'>
                                <div> Order summary</div>
                                <hr className='htSummary' />
                                <div className='orderSummary'>
                                    <div>  Total money cost : {" "}
                                        {cartBroduct?.products?.moneyProducts?.reduce((accumulator, currentValue) =>
                                            accumulator + (currentValue?.price * currentValue?.quantity), 0)}
                                    </div>
                                    <div> Total points cost : {" "}
                                        {cartBroduct?.products?.pointsProducts?.reduce((accumulator, currentValue) =>
                                            accumulator + (currentValue?.price * currentValue?.quantity), 0)}
                                    </div>
                                    <div>Total points earned : {" "}{cartBroduct?.products?.pointsEarned} </div>
                                </div>
                            </div>
                        </div>
                        <hr className='hrCart' />
                        <div className='cartFooter'>
                            <span className=''> Total price of the order </span>
                            <div className='totalCart'>
                                {total}
                            </div>
                        </div>
                    </div>
                    <div className='butten'>
                        <div className='send'> Send order  </div>
                        <div className='send'> Add a coupon screenshot  </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default MyCart;
