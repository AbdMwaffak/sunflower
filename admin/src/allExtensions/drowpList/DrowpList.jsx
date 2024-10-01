import React, { useState } from 'react';
import './drowpList.css'
import { Link } from 'react-router-dom';
const DrowpList = (props) => {
    const [eng, seteng] = useState(false)
    console.log(props.DrowpListButton)
    return (
        <div className={props.DrowpListButton ? "drowpListT" : "drowpListF"} onClick={() => seteng(!eng)}>
            <Link to={'/MyAccount/:userName'} className='linkDL' onClick={() => props.DrowpListButtonHandler()}>
                <div className='listItem' >
                    My Account
                </div>
            </Link>

            <Link to={'/MyReturnOrder'} className='linkDL' onClick={() => props.DrowpListButtonHandler()}>
                <div className='listItem' >
                    My Return Order
                </div>
            </Link>
            <Link to={'/MyOrder'} className='linkDL' onClick={() => props.DrowpListButtonHandler()}>
                <div className='listItem' >
                    My Order
                </div>
            </Link>
            <Link to={'/MyCoupons'} className='linkDL' onClick={() => props.DrowpListButtonHandler()}>
                <div className='listItem' >
                    My Coupons
                </div>
            </Link>
            <Link to={'/MyFavorites'} className='linkDL' onClick={() => props.DrowpListButtonHandler()}>
                <div className='listItem' >
                    My Favorites
                </div>
            </Link>

        </div>
    );
}

export default DrowpList;
