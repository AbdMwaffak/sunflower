import React, { useState } from 'react';
import './categorysCard.css'
import { Link } from 'react-router-dom';
import Api from '../API';

const CategorysCard = (props) => {
    const [openMenu, setOpenMenu] = useState(false)
    return (
        <div className='CategorysCard'>
            {/* ////////// ---  menu  ---//////// */}
            {/* <div className='rightHader'
            //   ref={menuRef}
            >
                <svg className='menu' onClick={() => setOpenMenu(!openMenu)}
                    viewBox="0 0 24 24" height="24" width="24"
                    preserveAspectRatio="xMidYMid meet"
                    version="1.1" x="0px" y="0px" enable-background="new 0 0 24 24">
                    <path fill="currentColor" d="M12,7c1.104,0,2-0.896,2-2c0-1.105-0.895-2-2-2c-1.104,0-2,0.894-2,2 C10,6.105,10.895,7,12,7z M12,9c-1.104,0-2,0.894-2,2c0,1.104,0.895,2,2,2c1.104,0,2-0.896,2-2C13.999,9.895,13.104,9,12,9z M12,15 c-1.104,0-2,0.894-2,2c0,1.104,0.895,2,2,2c1.104,0,2-0.896,2-2C13.999,15.894,13.104,15,12,15z">
                    </path></svg>
                <div className={openMenu ? "menuOpen" : "menuClose"} >
                    <ReturnModel openMenu={openMenu} />
                    <ReplacementModel openMenu={openMenu} />
                    <div className={openMenu ? "returnOpen" : "returnClose"} >   Product return </div>
                    <div className={openMenu ? "returnOpen" : "returnClose"}  > Product replacement  </div>
                </div>
                num
            </div> */}
            {/* /////////////////////////// */}
            <div className='imageCategory'>
                {/* {props?.linkName == "natural flowers" &&
                    <Link to={`/MyNaturalFlower/${props.id}`} className='link' >
                        <img className='imageCat' src={`${Api}/users/${props?.image}`} />
                    </Link>
                } */}
                {props?.linkName == "perfumes" &&
                    <Link to={`/MyPerfume/${props.id}`} className='link' >
                        <img className='imageCat' src={`${Api}/users/${props?.image}`} />
                    </Link>
                }
                {(props?.linkName !== "perfumes") &&
                    <Link to={`/EditeCategory/${props.id}`} className='link' >
                        <img className='imageCat' src={`${Api}/users/${props?.image}`} />
                    </Link>
                }
            </div>
            <div className='titleCategory'>
                {props.name}
            </div>

        </div>
    );
}

export default CategorysCard;
