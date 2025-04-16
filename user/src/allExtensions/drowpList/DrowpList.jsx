import React, { useEffect, useState } from 'react';
import './drowpList.css'
import { Link } from 'react-router';
import Cookies from 'universal-cookie';
import { useDispatch } from 'react-redux';
import LoginModel from '../loginModel/LoginModel';
import LogoutModel from '../loginModel/LogoutModel';
import { useTranslation } from 'react-i18next';
const DrowpList = (props) => {
    const [eng, seteng] = useState(false)
    //////////////////////////
    const cookies = new Cookies();
    const lng = cookies.get("i18next") || "en";
    //////////////////////////
    const [login, setLogin] = useState(false)
    const dispatch = useDispatch()
    useEffect(() => {
        if (cookies.get('token') !== undefined || null) {
            setLogin(true)
        }
        else { setLogin(false) }
    }, [dispatch, props.num])
    ////////////////////////////////////
    const { t } = useTranslation();
    return (
        <div className={props.DrowpListButton ? "drowpListT" : "drowpListF"} onClick={() => seteng(!eng)} ref={props?.menuRef}
            style={{ left: lng == "ar" ? "0px" : "-166px" }}
        >
            {!login &&
                <LoginModel />
            }
            {login &&
                <LogoutModel />
            }
            <Link to={'/MyAccount/:userName'} className='linkDL' onClick={() => props.DrowpListButtonHandler()}>
                <div className='listItem' >
                    {t('drowpList.myAccount')}
                </div>
            </Link>

            {/* <Link to={'/MyReturnOrder'} className='linkDL' onClick={() => props.DrowpListButtonHandler()}>
                <div className='listItem' >
                    {t('drowpList.myReturnOrders')}
                </div>
            </Link> */}
            <Link to={'/MyOrder'} className='linkDL' onClick={() => props.DrowpListButtonHandler()}>
                <div className='listItem' >
                    {t('drowpList.myOrder')}
                </div>
            </Link>
            <Link to={'/MyFavorites'} className='linkDL' onClick={() => props.DrowpListButtonHandler()}>
                <div className='listItem' >
                    {t('drowpList.myFavorites')}
                </div>
            </Link>

        </div>
    );
}

export default DrowpList;
