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
import { useTranslation } from 'react-i18next';
import Cookies from 'universal-cookie';
import LogoutModelmyAccount from '../../allExtensions/loginModel/LogoutModelmyAccount';

const MyAccount = () => {
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
    ////////////////////////////////////
    const { t } = useTranslation();
    return (
        <>
            <Toaster />
            <div className='bage'>
                <div className='title'>
                    {me?.username}
                </div>
                <div className='myAccountContener'>
                    <div className='myAC-top'>
                        <div className=' myAC-R'>
                            <div className='myInfo'>
                                {t('me.name')} : {me?.username}
                                {/* <AccountModel type={"name"} /> */}
                            </div>
                            <div className='myInfo'>
                                {t('me.phone')} : {me?.phone}
                                {/* <AccountModel type={"phone"} /> */}
                            </div>
                            <div className='myInfo'>
                                {t('me.gender')} : {me?.gender}
                                {/* <AccountModel type={"gender"} /> */}
                            </div>
                            <div className='myInfo'>
                                {t('me.password')} : *********
                                {/* <AccountModel type={"passWord"} /> */}
                            </div>
                            <div className='myInfo'>
                                {t('me.email')} : {me?.email}
                                {/* <AccountModel type={"gmail"} /> */}
                            </div>
                            {/* <div className='myInfo'>
                                {t('me.birth')}  :
                                <AccountModel type={"birth"} />
                            </div> */}
                        </div>
                        <div className=' myAC-L'>
                            <img className='sunflowerBorder' src={sunflower} />
                            <img className='sunflowerBorder2' src={sunflower} />
                            <img className='userImage' src={`${Api}/users/${me?.image}`} />
                        </div>

                    </div>
                    <div className='myAC-top2'>
                        {/* <div className='myInfo'>

                            {t('me.adrress')}   : {me?.address?.neighborhood} -
                            {me?.address?.city} -
                            {me?.address?.street} -
                            {me?.address?.details}
                            <AccountModel type={"adrress"} />
                        </div> */}

                        <div className='res'>
                            <LogoutModelmyAccount />
                            {/* <button className='formButton5'>
                                {t('me.logout')}
                            </button> */}
                            {/* <button className='formButton5'>
                                {t('me.deleteMyAccount')}
                            </button> */}
                        </div>
                    </div>
                    <div className='myAC-top2'>
                        <div className='myOrdersInfo'>
                            {t('me.noOrders')} : {me?.ordersCount}
                        </div>
                        <div className='myOrdersInfo'>
                            {t('me.noPoints')} : {me?.points}
                        </div>
                    </div>
                    <div className='myAC-top2'>
                        <span className='vv1 ' > {t('me.message')}</span>
                        <hr className='tapp' />
                        <div className='cardContener'>
                            <Form className='input55' noValidate validated={validated}
                                onSubmit={handelSendMessage}
                            >
                                <Form.Control className='input6' as="textarea" aria-label="With textarea"
                                    onChange={(e) => setLoveMessage(e.target.value)}
                                    placeholder={t('me.wirteMessage')}
                                />
                                <button className='formButton'      >
                                    {t('me.sendMessage')}
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
