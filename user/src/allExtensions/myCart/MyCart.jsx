import React, { useEffect, useState } from 'react';
import './myCart.css'
import CartBroduct from '../cartBroduct/CartBroduct';
import { useDispatch, useSelector } from 'react-redux';
import { getCart } from '../../RTK/shoppingCart/getCartSlice';
import { emptyCart } from '../../RTK/shoppingCart/emptyCartSlice';
import CartPerfumes from '../cartPerfumes/CartPerfumes';
import CartFlowers from '../cartFlowers/CartFlowers';

const MyCart = () => {
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
    const handeladdToCartPoints = () => {
        // if (nsize != " " && ncolor != " ") {
        //     if (me?.points != 0 && me?.points >= nPsize) {
        //         if (cartBroduct?.naturalFlowers?.length === 0) {
        const value = {
            product: id,
            size: nsize,
            color: ncolor,
            quantity: quantity,
            paymentMethod: "points"
        }
        dispatch(addToCart(value))
        setReload(!reload)
    }
    //  else {
    //                 setOpenModel1(true)
    //             }
    //         } else {
    //             setOpenModel2(true)
    //         }
    //     }
    // }

    //////////////////////////////
    useEffect(() => {
        dispatch(getCart())
    }, [dispatch, reload])
    /////////////////////////////
    useEffect(() => {
        setTotal(cartBroduct?.products?.moneyProducts?.reduce((accumulator, currentValue) =>
            accumulator + (currentValue?.price * currentValue?.quantity), 0)
        )
        // console.log(sum)
    }, [dispatch, reload])
    /////////////////////////////
    console.log(cartBroduct)
    return (
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
                            {(cartBroduct?.products?.moneyProducts?.length === 0
                                || cartBroduct?.products?.moneyPoints?.length === 0
                                || cartBroduct?.naturalFlowers?.length === 0
                                || cartBroduct?.perfumes?.length === 0
                            ) &&

                                <div className='noProducts' > You haven't added any product to your cart  yet !!  </div>
                            }
                            {cartBroduct?.
                                naturalFlowers
                                ?.map((flower, index) => (

                                    <CartFlowers
                                        key={index}
                                        // id={perfume?.perfume?._id}
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
                            {/* ............... */}
                            {cartBroduct?.perfumes?.map((perfume, index) => (

                                <CartPerfumes
                                    key={index}
                                    // id={perfume?.perfume?._id}
                                    message={perfume?.message}
                                    deleteId={perfume?._id}
                                    price={perfume?.totalPrice}
                                    perfumeOrderVariants={perfume?.perfumeOrderVariants}


                                    handelReload={handelReload}

                                />


                            ))
                            }
                            {/* ............... */}
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
                            {/* ............... */}
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

                        </div>
                        {/* <div className='cartBody2'>
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
                        </div> */}
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
    );
}

export default MyCart;
