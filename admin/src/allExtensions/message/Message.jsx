import React, { useEffect, useRef, useState } from 'react'
import './message.css'
import Api from '../API'
import logo from '../../images/logo.svg';
import DeleteMsgModel from '../deleteMsgModel/DeleteMsgModel';
import ReplyToMsgModel from '../replyToMsgModel/ReplyToMsgModel';
import { useTranslation } from 'react-i18next';
import Cookies from 'universal-cookie';
function Message(props) {
    //////////////////////////////
    const cookies = new Cookies();
    let lng = ''
    let token = ''
    if (cookies.get('adminToken') !== undefined || null) {
        token = true
    } else token = false
    if (cookies.get('i18next') === "ar") {
        lng = "ar"
    } else lng = "en"
    //////////////////////////////
    const [openMenu, setOpenMenu] = useState(false)
    //////////////////
    let menuRef = useRef()
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
    ////////////////////////////////////
    const { t, i18n } = useTranslation();
    return (
        <>

            <div className='message'>
                <svg className='tail'
                    viewBox="0 0 8 13" height="26" width="16" preserveAspectRatio="xMidYMid meet" version="1.1" x="0px" y="0px" enableBackground="new 0 0 8 13"><title>tail-in</title><path opacity="0.13" fill="#0000000" d="M1.533,3.568L8,12.193V1H2.812 C1.042,1,0.474,2.156,1.533,3.568z"></path><path fill="currentColor" d="M1.533,2.568L8,11.193V0L2.812,0C1.042,0,0.474,1.156,1.533,2.568z"></path></svg>
                <div className='postHader' dir='ltr'>
                    <div className=' leftHader'
                        ref={menuRef}>
                        <svg className='menuMs' onClick={() => setOpenMenu(!openMenu)}
                            viewBox="0 0 24 24" height="24" width="24"
                            preserveAspectRatio="xMidYMid meet"
                            version="1.1" x="0px" y="0px" enableBackground="new 0 0 24 24">
                            <path fill="currentColor" d="M12,7c1.104,0,2-0.896,2-2c0-1.105-0.895-2-2-2c-1.104,0-2,0.894-2,2 C10,6.105,10.895,7,12,7z M12,9c-1.104,0-2,0.894-2,2c0,1.104,0.895,2,2,2c1.104,0,2-0.896,2-2C13.999,9.895,13.104,9,12,9z M12,15 c-1.104,0-2,0.894-2,2c0,1.104,0.895,2,2,2c1.104,0,2-0.896,2-2C13.999,15.894,13.104,15,12,15z">
                            </path></svg>

                        <div className={openMenu ? "menuOpen" : "menuClose"} >

                            <DeleteMsgModel
                                openMenu={openMenu}
                                name={props?.userDetails?.name}
                                handelReload={props?.handelReload}
                                id={props?.id}

                            />

                            <ReplyToMsgModel
                                openMenu={openMenu}
                                id={props.id}
                                handelReload={props.handelReload}
                            />
                            {/* <ReturnModel openMenu={openMenu} />*/}
                            {/* <ReplacementModel openMenu={openMenu} /> */}
                        </div>
                        <div className='postLogo'>

                            <img className='imgLogo' src={`${Api}/users/${props?.userDetails?.image}`} />
                        </div>
                        <div className='userName'>
                            {props?.userDetails?.name}
                        </div>
                    </div>
                    {/* ////////// */}
                    <div className='date'>
                        {props.createdAt.split('T')[0]}
                    </div>

                </div>
                <hr className='tapp' />
                <div className='postBody'>
                    <div className='text'>
                        {props?.message}
                    </div>
                </div>
            </div>
            {props.reply != '' &&
                <div className='messageReply'>
                    <div className='postHader' dir='ltr'>
                        <div className='leftHader'>
                            <div className='postLogoRely'>

                                <img className='postLogoRely' src={logo} />
                            </div>
                            <div className='userName' style={{ flexDirection: lng == "ar" ? "row-reverse" : "row" }}>
                                <div>
                                    {t("messages.replyto")}
                                </div>
                                <div>
                                    {`"${props?.userDetails?.name}"`}
                                </div>
                            </div>
                        </div>
                        <div className='date'>
                            {props.createdAt.split('T')[0]}
                        </div>

                    </div>
                    <hr className='tapp' />
                    <div className='postBody'>
                        <div className='text'>
                            {props?.reply}
                        </div>

                    </div>
                    <svg className='tail2'
                        viewBox="0 0 8 13" height="26" width="16" preserveAspectRatio="xMidYMid meet" version="1.1" x="0px" y="0px" enableBackground="new 0 0 8 13"><title>tail-in</title><path opacity="0.13" fill="#0000000" d="M1.533,3.568L8,12.193V1H2.812 C1.042,1,0.474,2.156,1.533,3.568z"></path><path fill="currentColor" d="M1.533,2.568L8,11.193V0L2.812,0C1.042,0,0.474,1.156,1.533,2.568z"></path></svg>

                </div>}
        </>
    )
}

export default Message
