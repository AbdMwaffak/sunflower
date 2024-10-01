import React, { useState } from 'react';
import './flower.css'
import { Link } from 'react-router-dom';
const Flower = (props) => {
    const [eng, seteng] = useState(false)
    const [eng2, seteng2] = useState(false)
    return (
        <div className={props.sidBarButton ? "totalT" : "totalF"} onClick={() => seteng(!eng)} >

            <div className={props.sidBarButton ? "petals1T" : "petals1F"}>

                <Link to={'/home'} className='linkSB' onClick={() => props.sidBarButtonHandler()}>
                    Home
                </Link> </div>

            <div className={props.sidBarButton ? "petals2T" : "petals2F"}>
                <Link to={'/MyArticles'} className='linkSB' onClick={() => props.sidBarButtonHandler()} >
                    MyArticles
                </Link> </div>
            <div className={props.sidBarButton ? "petals3T" : "petals3F"}>
                <Link to={'/AboutTheStore'} className='linkSB' onClick={() => props.sidBarButtonHandler()} >
                    About the store
                </Link> </div>
            <div className={props.sidBarButton ? "petals4T" : "petals4F"}>
                <Link to={'/ContactUs'} className='linkSB' onClick={() => props.sidBarButtonHandler()} >
                    Contact us
                </Link> </div>
            <div className={props.sidBarButton ? "petals5T" : "petals5F"}>
                <Link to={'/StoreMessages'} className='linkSB' onClick={() => props.sidBarButtonHandler()} >
                    Messages
                </Link> </div>

            <button className='ss' onClick={() => props.sidBarButtonHandler()}>

                <svg xmlns="http://www.w3.org/2000/svg" width="45.962" height="45.962" viewBox="0 0 45.962 45.962">
                    <path id="Path_2296" data-name="Path 2296" d="M5,0a5,5,0,0,1,5,5V50A5,5,0,0,1,0,50V5A5,5,0,0,1,5,0Z" transform="translate(38.891) rotate(45)" fill="#f1c92f" />
                    <path id="Path_2295" data-name="Path 2295" d="M5,0a5,5,0,0,1,5,5V50A5,5,0,0,1,0,50V5A5,5,0,0,1,5,0Z" transform="translate(0 7.071) rotate(-45)" fill="#f1c92f" />
                </svg>


            </button>
        </div>
        // </div>
    );
}

export default Flower;
