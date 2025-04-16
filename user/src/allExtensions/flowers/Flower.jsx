import React, { useEffect, useRef, useState } from 'react';
import './flower.css'
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
const Flower = (props) => {
    const [eng, seteng] = useState(false)
    const [eng2, seteng2] = useState(false)
    ////////////////////////
    let menuRef = useRef()
    ////////////////////////////////////
    useEffect(() => {
        let handler = (e) => {
            if (!menuRef.current.contains(e.target)) {
                props.sidBarButtonHandler()
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
        <div className={props.sidBarButton ? "totalT" : "totalF"}
            onClick={() => seteng(!eng)}
            ref={menuRef} >
            <Link to={'../'} className={props.sidBarButton ? "petals1T" : "petals1F"}
                onClick={() => props.sidBarButtonHandler()}>
                <div className=' linkSB' >
                    {t('sidBar.home')}
                </div>
            </Link>
            <Link to={'../Articles'} className={props.sidBarButton ? "petals2T" : "petals2F"} onClick={() => props.sidBarButtonHandler()} >
                <div className='linkSB'>
                    {t('sidBar.articles')}
                </div>
            </Link>
            <Link to={'../AboutTheStore'} className={props.sidBarButton ? "petals3T" : "petals3F"} onClick={() => props.sidBarButtonHandler()} >
                <div className='linkSB'>
                    {t('sidBar.aboutStore')}
                </div>
            </Link>
            <Link to={'../ContactUs'} className={props.sidBarButton ? "petals4T" : "petals4F"} onClick={() => props.sidBarButtonHandler()} >
                <div className='linkSB' >
                    {t('sidBar.contactUs')}
                </div>
            </Link>
            <Link to={'../StoreMessages'} className={props.sidBarButton ? "petals5T" : "petals5F"} onClick={() => props.sidBarButtonHandler()} >
                <div className='linkSB'>
                    {t('sidBar.messages')}
                </div>
            </Link>
            <button className='ss' onClick={() => props.sidBarButtonHandler()}>
                <svg xmlns="http://www.w3.org/2000/svg" width="45.962" height="45.962" viewBox="0 0 45.962 45.962">
                    <path id="Path_2296" data-name="Path 2296" d="M5,0a5,5,0,0,1,5,5V50A5,5,0,0,1,0,50V5A5,5,0,0,1,5,0Z" transform="translate(38.891) rotate(45)" fill="#f1c92f" />
                    <path id="Path_2295" data-name="Path 2295" d="M5,0a5,5,0,0,1,5,5V50A5,5,0,0,1,0,50V5A5,5,0,0,1,5,0Z" transform="translate(0 7.071) rotate(-45)" fill="#f1c92f" />
                </svg>
            </button>
        </div>
    );
}

export default Flower;
