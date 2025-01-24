import React, { useEffect, useState } from 'react';
import './myAccount.css'
import sunflower from '../../images/sunflower3-svg.png'
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getMe } from '../../RTK/Auth/getMeSlice';
import Api from '../../allExtensions/API';
import toast, { Toaster } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import Cookies from 'universal-cookie';
import logo from '../../images/logo.svg'
import LogoutModelmyAccount from '../../allExtensions/logoutModel/LogoutModelmyAccount';
import AdminNotifications from '../../allExtensions/adminNotifications/AdminNotifications';

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
                    {t("me.title")}
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
                        </div>
                        <div className=' myAC-L'>
                            <img className='sunflowerBorder' src={sunflower} />
                            <img className='sunflowerBorder2' src={sunflower} />
                            <img className='userImage' src={logo} />
                        </div>

                    </div>
                    <div className='myAC-top2'>
                        <div className='res'>
                            <LogoutModelmyAccount />
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}
export default MyAccount;
