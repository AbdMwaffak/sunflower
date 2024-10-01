import React, { useEffect, useState } from 'react';
import './cartOnSide.css'
import CartBroduct from '../cartBroduct/CartBroduct';
import { useDispatch, useSelector } from 'react-redux';
import { getCart } from '../../RTK/shoppingCart/getCartSlice';
import { emptyCart } from '../../RTK/shoppingCart/emptyCartSlice';
import CartPerfumes from '../cartPerfumes/CartPerfumes';
import CartFlowers from '../cartFlowers/CartFlowers';
import CartBroduct11 from '../cartBroduct/CartBroduct11';

const CartOnSide = (props) => {
    const addStatus = useSelector(state => state.addToCart)?.status
    console.log(addStatus)
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


    useEffect(() => {
        dispatch(getCart())
    }, [dispatch, reload, props.addStatus])
    /////////////////////////////
    useEffect(() => {
        setTotal(cartBroduct?.products?.moneyProducts?.reduce((accumulator, currentValue) =>
            accumulator + (currentValue?.price * currentValue?.quantity), 0)
        )
        // console.log(sum)
    }, [dispatch, reload])
    /////////////////////////////
    console.log(props?.addStatus)
    return (
        <div className={props?.addStatus ? ' cartShow' : "cartOnSide"}>


            <div className='cartOnSideContener'>

                My Cart
                <hr className='hrCart' />
                <div className={props?.addStatus ? ' fiestItem2' : "fiestItem"}>
                    <CartBroduct11

                        index={0}
                        id={cartBroduct?.products?.moneyProducts[0]?.product?._id}
                        color={cartBroduct?.products?.moneyProducts[0]?.color}
                        size={cartBroduct?.products?.moneyProducts[0]?.size}
                        deleteId={cartBroduct?.products?.moneyProducts[0]?._id}
                        quantity={cartBroduct?.products?.moneyProducts[0]?.quantity}
                        name={cartBroduct?.products?.moneyProducts[0]?.product?.name}
                        price={cartBroduct?.products?.moneyProducts[0]?.price}
                        images={cartBroduct?.products?.moneyProducts[0]?.product?.images}
                        paymentMethod={"money"}
                        handelReload={handelReload}

                    />

                </div>

                <div className='cartBody11'>


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

                        <CartBroduct11
                        
                            key={index}
                            index={index}
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

                        <CartBroduct11
                            key={index}
                            index={index}
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







            </div>
        </div>
    );
}

export default CartOnSide;
