import React, { useEffect, useState } from 'react';
import './orders.css'
import { useTranslation } from 'react-i18next';
import Order from '../../allExtensions/order/Order';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'universal-cookie';
import { getOrders } from '../../RTK/orders/getOrdersSlice';
import { Toaster } from 'react-hot-toast';

const Orders = (props) => {
    //////////////////////////////
    const cookies = new Cookies();
    let lng = ''
    let token = ''
    if (cookies.get('adminToken') !== undefined || null) {
        token = true
    } else token = false
    if (cookies.get('i18next') === "ar") {
        lng = "ar"
    } else lng = "en"
    //////////////////////////////
    const [reload, setReload] = useState(true);
    //////////////////////////////
    const allOrders = useSelector(state => state.getOrders)?.data
    ///////////////////////////////
    const reloadHandel = () => {
        setTimeout(() => {
            setReload(!reload)
        }, 1000);
    }
    ///////////////////////////////
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getOrders())
    }, [dispatch, reload, props?.num])
    //////////////////////////
    useEffect(
        function () {
            document.title = `SUNFLOWER - My Order `;
            return function () { document.title = 'SUNFLOWER' };
        }, [])
    ////////////////////////////////////
    const { t } = useTranslation();
    return (
        <>
            <Toaster />
            <div className='myOrder'>
                <div className='title'>
                    {t('orders.title')}
                </div>
                <div className='myOrderContener'>
                    {allOrders?.length == 0 &&
                        <div className='noProducts' >
                            <b>    {t('orders.noProducts1')} {" "}
                                <svg xmlns="http://www.w3.org/2000/svg" width={25} height={25} viewBox="0 0 36 36" ><path fill="#ffcb4c" d="M36 18c0 9.941-8.059 18-18 18c-9.94 0-18-8.059-18-18C0 8.06 8.06 0 18 0c9.941 0 18 8.06 18 18"></path><ellipse cx={12.176} cy={14.71} fill="#65471b" rx={2.647} ry={3.706}></ellipse><circle cx={24.882} cy={14.294} r={6.882} fill="#f4f7f9"></circle><path fill="#65471b" d="M14.825 9.946c-.322 0-.64-.146-.848-.423c-.991-1.321-2.028-2.029-3.083-2.104c-1.39-.095-2.523.947-2.734 1.158A1.057 1.057 0 1 1 6.663 7.08c.457-.457 2.129-1.936 4.381-1.773c1.695.12 3.251 1.111 4.627 2.945a1.059 1.059 0 0 1-.846 1.694"></path><path fill="#292f33" d="M32.824 36a1.059 1.059 0 0 1-1.059-1.059V14.824a1.059 1.059 0 1 1 2.118 0v20.118A1.06 1.06 0 0 1 32.824 36"></path><path fill="#67757f" d="M32.824 12.706c-.054 0-.105.012-.158.016c-.732-3.628-3.943-6.369-7.784-6.369c-4.379 0-7.941 3.562-7.941 7.941s3.562 7.941 7.941 7.941c3.468 0 6.416-2.238 7.496-5.343a2.118 2.118 0 1 0 .446-4.186m-7.942 7.412c-3.211 0-5.823-2.612-5.823-5.824s2.613-5.824 5.823-5.824c3.211 0 5.824 2.612 5.824 5.824s-2.613 5.824-5.824 5.824"></path><path fill="#65471b" d="M21.175 28.588c-.159 0-.321-.036-.473-.112c-1.819-.91-3.587-.91-5.406 0a1.059 1.059 0 1 1-.947-1.895c2.421-1.21 4.877-1.21 7.3 0a1.06 1.06 0 0 1-.474 2.007"></path><path fill="#bdddf4" d="M28.049 9.411a5.788 5.788 0 0 0-3.167-.94a5.824 5.824 0 0 0-5.824 5.824c0 1.169.348 2.255.94 3.167zm-5.652 10.144a5.794 5.794 0 0 0 2.485.563a5.824 5.824 0 0 0 5.824-5.824c0-.89-.206-1.731-.563-2.485z"></path></svg>
                                ! </b>
                            <br />
                            <b>
                                {t('orders.noProducts2')} {' '}
                                <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 36 36"><path fill="#3e721d" d="M28 27c-8 0-8 6-8 6V22h-4v11s0-6-8-6c-4 0-7-2-7-2s0 9 9 9h6s0 2 2 2s2-2 2-2h6c9 0 9-9 9-9s-3 2-7 2"></path><path fill="#F1C92F" d="M21.125 27.662c-.328 0-.651-.097-.927-.283l-2.323-1.575l-2.322 1.575a1.67 1.67 0 0 1-1.358.226a1.65 1.65 0 0 1-1.06-.874l-1.225-2.527l-2.797.204l-.119.004a1.656 1.656 0 0 1-1.651-1.772l.201-2.8l-2.523-1.225a1.658 1.658 0 0 1-.648-2.418l1.573-2.323l-1.573-2.322a1.65 1.65 0 0 1-.228-1.357a1.66 1.66 0 0 1 .876-1.06L7.544 7.91l-.201-2.797a1.656 1.656 0 0 1 1.77-1.771l2.797.201l1.225-2.523a1.66 1.66 0 0 1 2.418-.648l2.322 1.573L20.198.372a1.64 1.64 0 0 1 1.355-.228c.465.125.854.444 1.062.876l1.225 2.523l2.8-.201q.057-.004.116-.003a1.655 1.655 0 0 1 1.652 1.774l-.204 2.797l2.527 1.225c.433.209.751.598.874 1.06c.124.465.043.96-.227 1.357l-1.575 2.322l1.575 2.323c.269.398.351.892.227 1.356a1.65 1.65 0 0 1-.874 1.062l-2.527 1.225l.204 2.8c.034.478-.143.946-.48 1.288a1.66 1.66 0 0 1-1.288.48l-2.8-.204l-1.225 2.527a1.65 1.65 0 0 1-1.062.874a1.6 1.6 0 0 1-.428.057"></path><circle cx={18} cy={14} r={7} fill="#732700"></circle></svg>                            {/* <svg className='aboveHand' xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 36 36" ><path fill="#e1e8ed" d="m30.415 9.586l-9-9a2.001 2.001 0 0 0-2.829 2.829l-3.859 3.859l9 9l3.859-3.859a2 2 0 0 0 2.829-2.829"></path><path fill="#ccd6dd" d="M20 0H5a4 4 0 0 0-4 4v28a4 4 0 0 0 4 4h22a4 4 0 0 0 4-4V11h-9c-1 0-2-1-2-2z"></path><path fill="#99aab5" d="M20 0h-2v9a4 4 0 0 0 4 4h9v-2h-9c-1 0-2-1-2-2zm-5 8a1 1 0 0 1-1 1H6a1 1 0 0 1 0-2h8a1 1 0 0 1 1 1m0 4a1 1 0 0 1-1 1H6a1 1 0 0 1 0-2h8a1 1 0 0 1 1 1m12 4a1 1 0 0 1-1 1H6a1 1 0 0 1 0-2h20a1 1 0 0 1 1 1m0 4a1 1 0 0 1-1 1H6a1 1 0 1 1 0-2h20a1 1 0 0 1 1 1m0 4a1 1 0 0 1-1 1H6a1 1 0 1 1 0-2h20a1 1 0 0 1 1 1m0 4a1 1 0 0 1-1 1H6a1 1 0 1 1 0-2h20a1 1 0 0 1 1 1"></path><path fill="#66757f" d="M31 19s-5.906-.002-5.935 0c-.291 0-.91.174-1.255.606l-2.328 2.929c-.644.809-.644 2.119 0 2.93l2.328 2.929c.345.432.964.606 1.255.606c.019.002 3.547 0 5.935 0z"></path><path fill="#F1C92F" d="M33 19s-8.056-.002-8.084 0c-.291 0-.91.139-1.255.485l-2.328 2.342a1.665 1.665 0 0 0 0 2.344l2.328 2.342c.345.346.964.487 1.255.487c.028.002 8.084 0 8.084 0c1.104 0 2-.897 2-2.001V21a2 2 0 0 0-2-2"></path></svg> */}
                            </b>
                        </div>
                    }
                    {allOrders?.map((order, index) => (
                        <Order
                            key={index}
                            id={order?._id}
                            num={index + 1}
                            orderStatus={order?.orderStatus}
                            cart={order?.cart}
                            date={order?.createdAt.split("T", 1)}
                            addressDetails={order?.addressDetails}
                            city={order?.city}
                            isPaid={order?.isPaid}
                            name={order?.name}
                            notes={order?.notes}
                            paymentMethod={order?.paymentMethod}
                            phone={order?.phone}
                            user={order?.userId}
                            reloadHandel={reloadHandel}
                        />
                    ))}

                </div>
            </div >
        </>
    );
}

export default Orders;
