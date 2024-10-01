import React, { useEffect, useState } from 'react';
import './myAccount.css'
import sunflower from '../../image/sunflower3-svg.png'
import { Form } from 'react-bootstrap';
import AccountModel from '../../allExtensions/accountModel/AccountModel'
import { useDispatch, useSelector } from 'react-redux';
import { getMe } from '../../RTK/Auth/getMeSlice';
import Api from '../../allExtensions/API';
import { sendMessage } from '../../RTK/message/sendMessageSlice';
import { Toaster } from 'react-hot-toast';

const MyAccount = () => {
    const me = useSelector(state => state.getMe)?.data
    ///////////////////////////
    const [loveMessage, setLoveMessage] = useState('')
    const [validated, setValidated] = useState(false);
    ////////////////////////////
    const dispatch = useDispatch()
    ///////////////////////////
    const handelSendMessage = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
        const value = {
            message: loveMessage
        }
        dispatch(sendMessage(value))
    }
    ///////////////////////////
    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])
    ///////////////////////////

    useEffect(
        function () {
            document.title = `SUNFLOWER - My Account `;
            return function () { document.title = 'SUNFLOWER' };
        }, [])
    ///////////////////
    return (
        <>
            <Toaster />
            <div className='myAccount'>
                <div className='myAccountTitle'>
                    user Name
                </div>
                <div className='myAccountContener'>
                    <div className='myAC-top'>
                        <div className=' myAC-L'>
                            <img className='sunflowerBorder' src={sunflower} />
                            <img className='sunflowerBorder2' src={sunflower} />
                            <img className='userImage' src={`${Api}/users/${me?.image}`} />
                        </div>
                        <div className=' myAC-R'>
                            <div className='myInfo'>
                                name : {me?.username}
                                <AccountModel type={"name"} />
                            </div>
                            <div className='myInfo'>
                                phone : {me?.phone}
                                <AccountModel type={"phone"} />
                            </div>
                            <div className='myInfo'>
                                gender : {me?.phone}
                                <AccountModel type={"gender"} />
                            </div>
                            <div className='myInfo'>
                                passWord : *********
                                <AccountModel type={"passWord"} />
                            </div>
                            <div className='myInfo'>
                                date of birth  :
                                <AccountModel type={"birth"} />
                            </div>
                        </div>
                    </div>
                    <div className='myAC-top2'>
                        <div className='myInfo'>

                            adrress : {me?.address?.neighborhood} -
                            {me?.address?.city} -
                            {me?.address?.street} -
                            {me?.address?.details}
                            <AccountModel type={"adrress"} />
                        </div>
                        <div className='myInfo'>
                            gmail : {me?.email}
                            <AccountModel type={"gmail"} />
                        </div>
                        <div className='res'>
                            <button className='addToCart'>
                                LogOut
                            </button>
                            <button className='addToCart'>
                                Delete My Account
                            </button>
                        </div>
                    </div>
                    <div className='myAC-top2'>
                        <div className='myOrdersInfo'>
                            My number of orders : {me?.points}
                        </div>
                        <div className='myOrdersInfo'>
                            Total loyalty points : {me?.ordersCount}
                        </div>
                    </div>
                    <div className='myAC-top2'>
                        <span className='vv1 ' > Create a love message to the store </span>
                        <div className='cardContener'>
                            <Form className='input55' noValidate validated={validated}
                                onSubmit={handelSendMessage}
                            >
                                <Form.Control className='input6' as="textarea" aria-label="With textarea"
                                    onChange={(e) => setLoveMessage(e.target.value)}
                                    placeholder='write your love message here '
                                />
                                <button className='addToCart'      >
                                    send the message
                                </button>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default MyAccount;
