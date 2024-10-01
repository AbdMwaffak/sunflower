import React, { useEffect, useState } from 'react';
import './cartFlowers.css'
import Api from '../API';
import { useDispatch } from 'react-redux';
import { removeNFromCart } from '../../RTK/shoppingCart/removeNFromCartSlice';

const CartFlowers = (props) => {
    const [sms, setSms] = useState(false)
    const [tt, settt] = useState([])
    /////////////////////////
    const dispatch = useDispatch()
    /////////////////////////
    const handelDelete = () => {
        dispatch(removeNFromCart(props?.deleteId))
        props.handelReload()
    }
    useEffect(() => {
        tt.push(props.message)
    }, [dispatch])
    ///////////////////////////////
    let mm = props?.message?.split(' ')
    return (
        <div className='cartFlowers'>
            {sms &&
                <div className='mass1' onClick={() => setSms(false)}>
                    <div className='mass2'>
                        {props?.message}
                    </div>
                </div >}
            <div className='perfumeTitel'>
                <div className='div70'>
                    <div className='cartBroductImage cell'>
                        <img
                            className="w-100 profileImg"
                            src={`${Api}/users/${props.image}`}
                        />
                    </div>
                    <div className='cartFlowersName cell'>
                        <div className='cartName'>
                            Bouquet
                            {
                                props.message !== "" &&
                                <svg className='ms'
                                    onClick={() => setSms(true)}
                                    xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 26 26" ><path fill="currentColor" d="M23 4H3C1.3 4 0 5.3 0 7v12c0 1.7 1.3 3 3 3h20c1.7 0 3-1.3 3-3V7c0-1.7-1.3-3-3-3m.8 15.4L16 13.8l-3 2l-3.1-2l-7.7 5.6l6.3-6.5l-7.7-6L13 13.5L25.1 7l-7.6 6z"></path></svg>}
                        </div>
                        Flowers Count : {props?.flowersCount}
                        <div className='cartColor1' >   paper : <div className='cartColorSquer' style={{ backgroundColor: props?.paper }}> </div></div>
                        <div className='cartColor1' >   band : <div className='cartColorSquer' style={{ backgroundColor: props?.band }}> </div></div>
                    </div>
                </div>
                <div className='div30'>
                    <div className='cartDelete1 cell'>
                        <div className='red'
                            onClick={() => handelDelete()}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 26 26" ><path fill="currentColor" d="M11.5-.031c-1.958 0-3.531 1.627-3.531 3.594V4H4c-.551 0-1 .449-1 1v1H2v2h2v15c0 1.645 1.355 3 3 3h12c1.645 0 3-1.355 3-3V8h2V6h-1V5c0-.551-.449-1-1-1h-3.969v-.438c0-1.966-1.573-3.593-3.531-3.593zm0 2.062h3c.804 0 1.469.656 1.469 1.531V4H10.03v-.438c0-.875.665-1.53 1.469-1.53zM6 8h5.125c.124.013.247.031.375.031h3c.128 0 .25-.018.375-.031H20v15c0 .563-.437 1-1 1H7c-.563 0-1-.437-1-1zm2 2v12h2V10zm4 0v12h2V10zm4 0v12h2V10z"></path></svg>
                        </div>
                    </div>
                    <div className='perfumePrice'> {props?.price}.ras</div>
                </div>
            </div>
            <div className='allChocolates'>
                {props?.chocolates?.length != 0 &&
                    <div className='allChocolatesTitel'>
                        <hr />
                        <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 24 24" ><path fill="white" d="M15.54 8.46c1.96 1.96 1.96 5.12 0 7.08s-5.12 1.96-7.07 0s-1.97-5.12 0-7.08s5.11-1.96 7.07 0m3.93-3.91s-.97.12-2.04.81a5.24 5.24 0 0 0-1.5-2.94a4.03 4.03 0 0 0-1.1 3.92c1.39.36 2.47 1.44 2.83 2.83c1.12.3 2.68.15 3.92-1.1a5.25 5.25 0 0 0-2.9-1.49c.39-.58.7-1.25.79-2.03M4.53 19.45s.97-.12 2.04-.81c.15 1.04.65 2.09 1.5 2.94c1.25-1.24 1.4-2.8 1.1-3.92a3.94 3.94 0 0 1-2.83-2.83c-1.12-.3-2.68-.15-3.92 1.1c.84.84 1.87 1.34 2.9 1.49c-.39.58-.7 1.26-.79 2.03"></path></svg>
                        {" "} Chocolates {" "}
                        <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 24 24" ><path fill="white" d="M15.54 8.46c1.96 1.96 1.96 5.12 0 7.08s-5.12 1.96-7.07 0s-1.97-5.12 0-7.08s5.11-1.96 7.07 0m3.93-3.91s-.97.12-2.04.81a5.24 5.24 0 0 0-1.5-2.94a4.03 4.03 0 0 0-1.1 3.92c1.39.36 2.47 1.44 2.83 2.83c1.12.3 2.68.15 3.92-1.1a5.25 5.25 0 0 0-2.9-1.49c.39-.58.7-1.25.79-2.03M4.53 19.45s.97-.12 2.04-.81c.15 1.04.65 2.09 1.5 2.94c1.25-1.24 1.4-2.8 1.1-3.92a3.94 3.94 0 0 1-2.83-2.83c-1.12-.3-2.68-.15-3.92 1.1c.84.84 1.87 1.34 2.9 1.49c-.39.58-.7 1.26-.79 2.03"></path></svg>
                    </div>}
                {props?.chocolates?.map((varinats, index) => (
                    <div className='cartChocolates '
                        key={index}
                    >
                        <div className='ccc'> {varinats?.kind} </div>
                        <div className='ccc'> count :{varinats?.count} </div>
                    </div>
                ))}
            </div >
            {props?.chocolates?.length != 0 && <hr />}
        </div >
    );
}
export default CartFlowers;
