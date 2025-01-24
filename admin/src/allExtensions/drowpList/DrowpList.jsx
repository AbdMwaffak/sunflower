import React, { useEffect, useRef, useState } from 'react';
import './drowpList.css'
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { useDispatch } from 'react-redux';
// import LoginModel from '../loginModel/LoginModel';
import LogoutModel from '../logoutModel/LogoutModel';
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
            <div className='linkDL' onClick={() => props.DrowpListButtonHandler()} >
                <LogoutModel />
            </div>
            <Link to={'/MyAccount'} className='linkDL' onClick={() => props.DrowpListButtonHandler()}>
                <div className='listItem' >
                    {t("me.myAccount")}
                </div>
            </Link>
            {/* <Link to={'/MyReturnOrder'} className='linkDL' onClick={() => props.DrowpListButtonHandler()}>
                <div className='listItem' >
                    My Return Order
                </div>
            </Link>
            <Link to={'/MyOrder'} className='linkDL' onClick={() => props.DrowpListButtonHandler()}>
                <div className='listItem' >
                    My Order
                </div>
            </Link>
            <Link to={'/MyFavorites'} className='linkDL' onClick={() => props.DrowpListButtonHandler()}>
                <div className='listItem' >
                    My Favorites
                </div>
            </Link> */}

        </div>
    );
}

export default DrowpList;
