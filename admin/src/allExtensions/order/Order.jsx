import React, { useEffect, useRef, useState } from 'react';
import Cookies from 'universal-cookie';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import InfoModel from '../infoModel/InfoModel';
import { orderProcessing } from '../../RTK/orders/orderProcessingSlice';
import Fms from './Fms';
import Pms from './Pms ';
import InvoisModel from '../invoisModel/InvoisModel';
import "./orders.css"


const Order = (props) => {
    const cookies = new Cookies();
    let lng = ''
    let token = ''
    if (cookies.get('token') !== undefined || null) {
        token = true
    } else token = false
    if (cookies.get('i18next') === "ar") {
        lng = "ar"
    } else lng = "en"
    //////////////////////////////
    const [totalPerfumes, setTotalPerfumes] = useState(0)
    const [totalProducts, setTotalProducts] = useState(0)
    const [totalOffers, setTotalOffers] = useState(0)
    const [pointsCost, setPointsCost] = useState(0)
    const [pointsEarned, setPointsEarned] = useState(0)
    //////////////////////////////
    const [open, setOpen] = useState(false)
    const [openMenu, setOpenMenu] = useState(false)
    ///////////////////////
    let menuRef = useRef()
    /////////////////////////////
    const dispatch = useDispatch()
    /////////////////////////////
    const handelProcessing = () => {
        dispatch(orderProcessing({ orderId: props?.id }))
        props?.reloadHandel()
    }
    /////////////////////////////
    useEffect(() => {
        if (props?.cart?.products?.moneyProducts !== undefined || null) {
            setTotalProducts(props?.cart?.products?.moneyProducts?.reduce((accumulator, currentValue) =>
                accumulator + (currentValue?.price * currentValue?.quantity), 0)),
                setPointsCost(props?.cart?.products?.pointsProducts?.reduce((accumulator, currentValue) =>
                    accumulator + (currentValue?.price * currentValue?.quantity), 0)),
                setPointsEarned(props?.cart?.products?.pointsEarned)
        }
        setTotalPerfumes(props?.cart?.perfumes?.reduce((accumulator, currentValue) =>
            accumulator + (currentValue?.totalPrice), 0))
        setTotalOffers(props?.cart?.offers?.reduce((accumulator, currentValue) =>
            accumulator + (currentValue?.priceA), 0))
    }, [dispatch])
    /////////////////////////// 
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
    let user = {
        name: props?.name,
        phone: props?.phone,
        city: props?.city,
        adress: props?.addressDetails
    }
    ////////////////////////////////////
    const { t } = useTranslation();
    return (
        <div className={open ? "orderOpen" : "orderClose"}>
            <div className='orderHader' dir='ltr'>
                <div className='rightHader' ref={menuRef}>
                    <svg className='menu' onClick={() => setOpenMenu(!openMenu)}
                        viewBox="0 0 24 24" height="24" width="24"
                        preserveAspectRatio="xMidYMid meet"
                        version="1.1" x="0px" y="0px" enableBackground="new 0 0 24 24">
                        <path fill="currentColor" d="M12,7c1.104,0,2-0.896,2-2c0-1.105-0.895-2-2-2c-1.104,0-2,0.894-2,2 C10,6.105,10.895,7,12,7z M12,9c-1.104,0-2,0.894-2,2c0,1.104,0.895,2,2,2c1.104,0,2-0.896,2-2C13.999,9.895,13.104,9,12,9z M12,15 c-1.104,0-2,0.894-2,2c0,1.104,0.895,2,2,2c1.104,0,2-0.896,2-2C13.999,15.894,13.104,15,12,15z">
                        </path></svg>
                    <div className={openMenu ? "menuOpen" : "menuClose"} >
                        <InvoisModel
                            openMenu={openMenu}
                            order={props?.cart}
                            totalOffers={totalOffers}
                            totalPerfumes={totalPerfumes}
                            totalProducts={totalProducts}
                            date={props?.date}
                            user={user}
                            sender={props?.user?.userName}
                        />
                        <InfoModel
                            id={props?.id}
                            openMenu={openMenu}
                            totalMoneyCost={totalOffers + totalPerfumes + totalProducts}
                            totalPointsCost={pointsCost}
                            totalPointsEarned={pointsEarned}
                            orderStatus={props?.orderStatus}
                            city={props?.city}
                            isPaid={props?.isPaid}
                            name={props?.name}
                            notes={props?.notes}
                            paymentMethod={props?.paymentMethod}
                            phone={props?.phone}
                            addressDetails={props?.addressDetails}
                        />
                        {/* <ReturnModel openMenu={openMenu} />
                        <ReplacementModel openMenu={openMenu} /> */}
                    </div>
                    {props?.num}
                </div>
                <div className='orderDate'>
                    {props?.date}
                </div>

                <div className='orderDate'>
                    {props?.user?.phone}
                </div>

                <div className='orderDate'>
                    {props?.user?.username}
                </div>


                {props?.orderStatus == "processing" && <>
                    <div className='waiting'>
                        <svg xmlns="http://www.w3.org/2000/svg" width={25} height={25} viewBox="0 0 24 24" ><g fill="none" stroke="currentColor" strokeWidth={1.5}><circle stroke="currentColor" cx={12} cy={13} r={9}></circle><path strokeLinecap="round" strokeLinejoin="round" d="m3.5 4.5l4-2.5m13 2.5l-4-2.5"></path><path d="M8 10.5c0-.466 0-.699.076-.883a1 1 0 0 1 .541-.54C8.801 9 9.034 9 9.5 9s.699 0 .883.076a1 1 0 0 1 .54.541c.077.184.077.417.077.883v5c0 .466 0 .699-.076.883a1 1 0 0 1-.541.54C10.199 17 9.966 17 9.5 17s-.699 0-.883-.076a1 1 0 0 1-.54-.541C8 16.199 8 15.966 8 15.5zm5 0c0-.466 0-.699.076-.883a1 1 0 0 1 .541-.54C13.801 9 14.034 9 14.5 9s.699 0 .883.076a1 1 0 0 1 .54.541c.077.184.077.417.077.883v5c0 .466 0 .699-.076.883a1 1 0 0 1-.541.54c-.184.077-.417.077-.883.077s-.699 0-.883-.076a1 1 0 0 1-.54-.541C13 16.199 13 15.966 13 15.5z"></path></g></svg>                    </div>
                </>}
                {props?.orderStatus == "delivered" && <>
                    <div className='ok'>
                        <svg xmlns="http://www.w3.org/2000/svg" width={25} height={25} viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M12 2.75A2.25 2.25 0 0 0 9.75 5v.26c.557-.01 1.168-.01 1.84-.01h.821c.67 0 1.282 0 1.84.01V5A2.25 2.25 0 0 0 12 2.75m3.75 2.578V5a3.75 3.75 0 1 0-7.5 0v.328q-.214.018-.414.043c-1.01.125-1.842.387-2.55.974S4.168 7.702 3.86 8.672c-.3.94-.526 2.147-.81 3.666l-.021.11c-.402 2.143-.718 3.832-.777 5.163c-.06 1.365.144 2.495.914 3.422c.77.928 1.843 1.336 3.195 1.529c1.32.188 3.037.188 5.218.188h.845c2.18 0 3.898 0 5.217-.188c1.352-.193 2.426-.601 3.196-1.529s.972-2.057.913-3.422c-.058-1.331-.375-3.02-.777-5.163l-.02-.11c-.285-1.519-.512-2.727-.81-3.666c-.31-.97-.72-1.74-1.428-2.327c-.707-.587-1.54-.85-2.55-.974a11 11 0 0 0-.414-.043M8.02 6.86c-.855.105-1.372.304-1.776.64c-.403.334-.694.805-.956 1.627c-.267.84-.478 1.958-.774 3.537c-.416 2.217-.711 3.8-.764 5.013c-.052 1.19.14 1.88.569 2.399c.43.517 1.073.832 2.253 1c1.2.172 2.812.174 5.068.174h.72c2.257 0 3.867-.002 5.068-.173c1.18-.169 1.823-.484 2.253-1.001c.43-.518.621-1.208.57-2.4c-.054-1.211-.349-2.795-.765-5.012c-.296-1.58-.506-2.696-.774-3.537c-.262-.822-.552-1.293-.956-1.628s-.92-.534-1.776-.64c-.876-.108-2.013-.109-3.62-.109h-.72c-1.607 0-2.744.001-3.62.11m6.478 5.08a.75.75 0 0 1 .063 1.058l-2.667 3a.75.75 0 0 1-1.062.06l-1.334-1.2a.75.75 0 0 1 1.004-1.116l.772.696l2.166-2.436a.75.75 0 0 1 1.058-.063" clipRule="evenodd"></path></svg>
                    </div>
                </>}



                <div onClick={() => setOpen(!open)}>
                    <svg className={open ? "orderArrwOpen" : "orderArrwClose"}
                        viewBox="0 0 16 16" fill="#202126" >
                        <path d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
                    </svg>
                </div>
            </div>
            <div className={!open ? "hiddenBody" : ''} >
                <hr className='tapp' />
                <table className='orderBody'>
                    <thead className='haderline'>
                        <tr className='haderline'>
                            {/* <span className='callOrder'>  photo </span> */}
                            <td className='callOrder'>   {t('orders.name')}</td>
                            <td className='callOrder'>  {t('orders.info')}  </td>
                            <td className='callOrder'>   {t('orders.price')}</td>
                            <td className='callOrder'>   {t('orders.total')}</td>
                        </tr>
                    </thead>
                    <tbody className='orBody'>

                        {props?.cart?.naturalFlowers?.map((item, index) => (
                            < tr className='line' key={index} >
                                <td className='callOrder'>
                                    <div className='cn'>
                                        {t('orders.bouquet')}    {item?.naturalFlower?.count}
                                        {item?.naturalFlower?.count == 1 && <>   {t('orders.flowers1')}</>}
                                        {item?.naturalFlower?.count == 2 && <>   {t('orders.flowers2')}</>}
                                        {(item?.naturalFlower?.count > 2 && item?.naturalFlower?.count < 11) && <>   {t('orders.flowers3')}</>}
                                        {item?.naturalFlower?.count > 10 && <>   {t('orders.flowers4')}</>}
                                    </div>
                                </td>
                                <td className='callOrder'>
                                    <Fms
                                        message={item?.message}
                                    />
                                    {item?.chocolates?.map((itemin, indexin) => (
                                        <div className='inCall' key={indexin}>
                                            <div className='cn'>
                                                <div>    {itemin?.kind}</div>
                                                <div>* {itemin?.count} </div>
                                            </div>
                                        </div>
                                    ))}
                                </td>
                                <td className='callOrder'> {item?.totalPrice} {t('public.sar')}</td>
                                <td className='callOrder'>  {item?.totalPrice} {t('public.sar')}</td>
                            </tr>
                        ))}
                        {props?.cart?.perfumes?.map((item, index) => (
                            <tr className='line' key={index}>
                                <td className='callOrder'>
                                    {item?.perfumeOrderVariants?.map((itemin, indexin) => (
                                        <div className='inCall' key={indexin}>
                                            <div className='cn'>
                                                <div> {t("orders.bottle")}  {itemin?.size}</div>
                                                <div>* {itemin?.count} </div>
                                            </div>
                                        </div>
                                    ))}
                                </td>
                                <td className='callOrder'>
                                    <Fms
                                        message={item?.message}
                                    />
                                    {item?.message == "" &&
                                        <>
                                            {t('orders.perfume')}
                                        </>
                                    }
                                </td>
                                <td className='callOrder'> {item?.totalPrice} {t('public.sar')}</td>
                                <td className='callOrder'>  {item?.totalPrice} {t('public.sar')}</td>
                            </tr>
                        ))}
                        {props?.cart?.products?.moneyProducts?.map((item, index) => (
                            <tr className='line' key={index}>
                                <td className='callOrder'>
                                    <div className='cn'>
                                        <div>
                                            {lng == "ar" ? item?.product?.nameAr : item?.product?.name}

                                        </div>
                                        <div>* {item?.quantity} </div>

                                    </div>
                                </td>
                                <td className='callOrder'>
                                    <div className='cn'> {item?.size}
                                        <div className='cartColorSquer' style={{ backgroundColor: item?.color }}> </div>

                                    </div>

                                </td>
                                <td className='callOrder'>  {item?.price} {t('public.sar')}</td>
                                <td className='callOrder'>  {item?.price * item?.quantity} {t('public.sar')}</td>
                            </tr>
                        ))}
                        {props?.cart?.products?.pointsProducts?.map((item, index) => (
                            <tr className='line' key={index}>
                                <td className='callOrder'>
                                    <div className='cn'>
                                        {item?.product?.name}
                                        <div>* {item?.quantity} </div>
                                    </div>
                                </td>
                                <td className='callOrder'>
                                    <div className='cn'> {item?.size}
                                        <div className='cartColorSquer' style={{ backgroundColor: item?.color }}> </div>

                                    </div>
                                </td>
                                <td className='callOrder'>  {item?.price} {t('public.point')}</td>
                                <td className='callOrder'>  {item?.price * item?.quantity}  {t('public.point')}</td>
                            </tr>
                        ))}
                        {props?.cart?.offers?.map((item, index) => (
                            <tr className='line' key={index}>
                                <td className='callOrder'>
                                    <div className='cn'>
                                        <div>
                                            {lng == "ar" ? item?.nameAr : item?.name} </div>
                                        <div>* {item?.quantity}  </div>
                                    </div>
                                </td>
                                <td className='callOrder'>
                                    {t('orders.offer')}
                                </td>
                                <td className='callOrder'>  {item?.priceA} {t('public.sar')}</td>
                                <td className='callOrder'>  {item?.priceA * item?.quantity}  {t('public.sar')}</td>
                            </tr>
                        ))}

                    </tbody>
                </table>
                <hr className='tapp'></hr>
                <div className='orderFooter'>
                    {props?.orderStatus == "processing" && <>
                        <div className='processing2' onClick={() => handelProcessing()}>
                            {t('orders.processing2')}
                        </div>
                    </>}
                    {/* {props?.orderStatus == "delivered" && <>
                        {t("orders.delivered")}
                    </>} */}

                    <div className='stateOrder'>
                        <span className='priceDiv'>   {t('orders.status')} :</span>
                        <span className='priceDiv'>
                            {props?.orderStatus == "processing" && <> {t("orders.processing")} </>}
                            {props?.orderStatus == "delivered" && <> {t("orders.delivered")} </>}
                        </span>
                    </div>
                    <div className='totalOrder'>
                        <span className='priceDiv'>   {t('orders.total')}  :</span>
                        <span className='priceDiv'>    {totalOffers + totalPerfumes + totalProducts}  {t('public.sar')} </span>
                    </div>




                </div>
            </div>
        </div >
    );
}
export default Order;
