import React, { useEffect, useRef, useState } from 'react';
import "./order.css"
import ReturnModel from '../returnModel/ReturnModel';
import ReplacementModel from '../replacementModel/ReplacementModel';
import Cookies from 'universal-cookie';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import InfoModel from '../infoModel/InfoModel';



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
    const [totalFlowrs, setTotalFlowrs] = useState(0)
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
    useEffect(() => {
        if (props?.cart?.products?.moneyProducts !== undefined || null) {
            setTotalProducts(props?.cart?.products?.moneyProducts?.reduce((accumulator, currentValue) =>
                accumulator + (currentValue?.price * currentValue?.quantity), 0)),
                setPointsCost(props?.cart?.products?.pointsProducts?.reduce((accumulator, currentValue) =>
                    accumulator + (currentValue?.price * currentValue?.quantity), 0)),
                setPointsEarned(props?.cart?.products?.pointsEarned)
        }
        setTotalFlowrs(props?.cart?.naturalFlowers?.reduce((accumulator, currentValue) =>
            accumulator + (currentValue?.totalPrice), 0))
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
                        <InfoModel
                            id={props?.id}
                            openMenu={openMenu}
                            totalMoneyCost={totalFlowrs + totalOffers + totalPerfumes + totalProducts}
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
                            <tr className='line' key={index}>
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
                                                <div>   {itemin?.size}</div>
                                                <div>* {itemin?.count} </div>
                                            </div>
                                        </div>
                                    ))}
                                </td>
                                <td className='callOrder'>
                                    {t('orders.perfume')}
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
                    <div className='stateOrder'>
                        <span className='priceDiv'>   {t('orders.status')} :</span>
                        <span className='priceDiv'>
                            {props?.orderStatus == "processing" && <> {t("orders.processing")} </>}
                            {props?.orderStatus == "delivered" && <> {t("orders.delivered")} </>}
                        </span>
                    </div>
                    <div className='totalOrder'>
                        <span className='priceDiv'>   {t('orders.total')}  :</span>
                        <span className='priceDiv'>    {totalFlowrs + totalOffers + totalPerfumes + totalProducts}  {t('public.sar')} </span>
                    </div>
                </div>
            </div>
        </div >
    );
}
export default Order;
