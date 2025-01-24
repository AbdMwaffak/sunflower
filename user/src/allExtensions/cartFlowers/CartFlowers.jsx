import React, { useEffect, useState } from 'react';
import './cartFlowers.css'
import Api from '../API';
import { useDispatch } from 'react-redux';
import { removeNFromCart } from '../../RTK/shoppingCart/removeNFromCartSlice';
import { useTranslation } from 'react-i18next';

const CartFlowers = (props) => {
    const [sms, setSms] = useState(false)
    const [tt, settt] = useState([])
    ///////////////////////// 
    const dispatch = useDispatch()
    /////////////////////////
    const handelDelete = () => {
        dispatch(removeNFromCart(props?.deleteId))
        setTimeout(() => {
            props.handelReload()
        }, 1000);
    }
    useEffect(() => {
        tt.push(props.message)
    }, [dispatch])
    ////////////////////////////////////
    const { t } = useTranslation();
    return (
        <div className='cartFlowers'>
            {sms &&
                <div className='mass1' onClick={() => setSms(false)}>
                    <div className='mass2'>
                        {props?.message}
                    </div>
                </div >}
            <div className='flowrTitel'>
                <div className='cartBroductImage'>
                    <img
                        className="w-100 profileImg"
                        src={`${Api}/users/${props.image}`}
                    />
                </div>

                <div className='div90'>
                    <div className='div80'>
                        <div className='cartFlowersName'>
                            <div className='cartName'>
                                {t('cart.flowers')}
                                {
                                    props.message !== "" &&
                                    <svg className='ms'
                                        onClick={() => setSms(true)}
                                        xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 26 26" ><path fill="currentColor" d="M23 4H3C1.3 4 0 5.3 0 7v12c0 1.7 1.3 3 3 3h20c1.7 0 3-1.3 3-3V7c0-1.7-1.3-3-3-3m.8 15.4L16 13.8l-3 2l-3.1-2l-7.7 5.6l6.3-6.5l-7.7-6L13 13.5L25.1 7l-7.6 6z"></path></svg>}
                            </div>
                            {t('cart.flowersCount')} {" "}: {props?.flowersCount}

                            {/* ////////// */}
                        </div>
                        <div className='div31'>
                            <div className='perfumePrice'> {props?.price}.  {t('public.sar')}</div>
                        </div>
                        <div className='cartDelete1 cell'>
                            <div className='red'
                                onClick={() => handelDelete()}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 26 26" ><path fill="currentColor" d="M11.5-.031c-1.958 0-3.531 1.627-3.531 3.594V4H4c-.551 0-1 .449-1 1v1H2v2h2v15c0 1.645 1.355 3 3 3h12c1.645 0 3-1.355 3-3V8h2V6h-1V5c0-.551-.449-1-1-1h-3.969v-.438c0-1.966-1.573-3.593-3.531-3.593zm0 2.062h3c.804 0 1.469.656 1.469 1.531V4H10.03v-.438c0-.875.665-1.53 1.469-1.53zM6 8h5.125c.124.013.247.031.375.031h3c.128 0 .25-.018.375-.031H20v15c0 .563-.437 1-1 1H7c-.563 0-1-.437-1-1zm2 2v12h2V10zm4 0v12h2V10zm4 0v12h2V10z"></path></svg>
                            </div>
                        </div>


                    </div>
                    <div className=' allChocolates'>
                        {props?.chocolates?.map((varinats, index) => (
                            <div className='choo' key={index} >
                                {varinats?.kind} :
                                {varinats?.count}
                            </div>
                        ))}
                    </div>
                </div>


            </div>
        </div >
    );
}
export default CartFlowers;
