import React, { useEffect, useRef, useState } from 'react';
import DeleteAboutModel from '../deleteAboutModel/DeleteAboutModel';
import "./aboutElement.css"
const AboutElement = (props) => {
    const [openMenu, setOpenMenu] = useState(false)
    ////////////////////////////////////
    let menuRef = useRef()
    ////////////////////
    const handelReload = () => {
        setTimeout(() => {
            props?.handelReload()
        }, 1000);
    }
    ////////////////////
    useEffect(() => {
        let handler = (e) => {
            if (!menuRef.current.contains(e.target)) {
                setOpenMenu(false);
            }
        };
        document.addEventListener("mousedown", handler)
        return () => {
            document.removeEventListener("mousedown", handler)
        };
    })
    return (
        <div className='divAbout' >
            <div className='tt1'>
                <div className='meny'
                    ref={menuRef}>
                    <svg className='menuAb'
                        onClick={() => setOpenMenu(!openMenu)}
                        viewBox="0 0 24 24" height="24" width="24"
                        preserveAspectRatio="xMidYMid meet"
                        version="1.1" x="0px" y="0px" enableBackground="new 0 0 24 24">
                        <path fill="currentColor" d="M12,7c1.104,0,2-0.896,2-2c0-1.105-0.895-2-2-2c-1.104,0-2,0.894-2,2 C10,6.105,10.895,7,12,7z M12,9c-1.104,0-2,0.894-2,2c0,1.104,0.895,2,2,2c1.104,0,2-0.896,2-2C13.999,9.895,13.104,9,12,9z M12,15 c-1.104,0-2,0.894-2,2c0,1.104,0.895,2,2,2c1.104,0,2-0.896,2-2C13.999,15.894,13.104,15,12,15z">
                        </path></svg>

                    <div className={openMenu ? "menuOpenAb" : "menuCloseAb"} >
                        <DeleteAboutModel
                            openMenu={openMenu}
                            handelReload={handelReload}
                            id={props?.id}
                        />
                    </div>
                </div>
                <div className='ttt1'>
                    {props?.title}
                </div>
            </div>
            {props?.description}
        </div>
    );
}

export default AboutElement;
