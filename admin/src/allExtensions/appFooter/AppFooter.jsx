import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSettings } from '../../RTK/settings/getAllSettingsSlice';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './appFooter.css'

const AppFooter = () => {
    const allSettings = useSelector(state => state.getAllSettings).data
    ///////////////////
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllSettings())
    }, [dispatch])
    ////////////////////////////////////
    const { t } = useTranslation();
    return (
        <div className='appFooter'>
            <div className='appFooterContent1' >
                <div className='appFooterContent2' >
                    <div className='footerTitle'>
                        Sunflower world
                    </div>
                    {t("footer.message1")}
                    <div className='contSocial'>
                        <div className='contIcon '>
                            <div className='contCer'>
                                <svg xmlns="http://www.w3.org/2000/svg" width={"80%"} height={"80%"} viewBox="0 0 48 48" ><path fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M5.5 42.5h37m0-27.935h-37L24 5.5zM7 39.447h34M7 17.618h34M26.075 34.953a1.44 1.44 0 0 0 1.44 1.441h0h-7.03h0a1.44 1.44 0 0 0 1.44-1.44V22.11a1.44 1.44 0 0 0-1.44-1.44h7.03a1.44 1.44 0 0 0-1.44 1.44zm-12.485 0a1.44 1.44 0 0 0 1.441 1.441h0H8h0a1.44 1.44 0 0 0 1.441-1.44V22.11A1.44 1.44 0 0 0 8 20.67h7.031a1.44 1.44 0 0 0-1.44 1.44z"></path><path fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M13.59 34.953a1.44 1.44 0 0 0 1.441 1.441h0H8h0a1.44 1.44 0 0 0 1.441-1.44V22.11A1.44 1.44 0 0 0 8 20.67h7.031a1.44 1.44 0 0 0-1.44 1.44zm24.969 0A1.44 1.44 0 0 0 40 36.394h0h-7.031h0a1.44 1.44 0 0 0 1.44-1.44V22.11a1.44 1.44 0 0 0-1.44-1.44H40a1.44 1.44 0 0 0-1.441 1.44z"></path></svg>
                            </div>
                        </div>
                        <div className='cont'>     {t("footer.message2")}  </div>
                    </div>
                    <hr className='tapp' />
                    <div className='copyright'>
                        <div>    {t("footer.message3")}| sunflower world-2025</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AppFooter;
