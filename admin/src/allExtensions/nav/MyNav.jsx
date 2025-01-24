import { Link } from 'react-router-dom';
import LogoutModel from '../logoutModel/LogoutModel';
import './nav.css';
import { useEffect, useRef, useState } from 'react';
import Logo from '../../images/logo.svg'
import DarkMode from '../darkMode/DarkMode';
import LanguageSwitcher from '../language Switcher/Language Switcher'
import DrowpList from '../drowpList/DrowpList';
import Cookies from 'universal-cookie';
import { useTranslation } from 'react-i18next';
import AdminNotifications from '../adminNotifications/AdminNotifications';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../../RTK/orders/getOrdersSlice';

const MyNav = (props) => {
    const cookies = new Cookies();
    let lng = ''
    let token = ''
    if (cookies.get('token') !== undefined || null) {
        token = true
    } else token = false
    if (cookies.get('i18next') === "ar") {
        lng = "ar"
    } else lng = "en"
    ////////////////////////////////////
    const [DrowpListButton, setDrowpListButton] = useState(false);
    const [notificationsListButton, setNotificationsListButton] = useState(false);
    const [not, setNot] = useState(false);
    const [searchKey, setSearchKey] = useState("")
    const [smSeartch, setSmSearch] = useState(true);
    const [oldOrder, setOldOrder] = useState([]);
    ///////////////////////
    const allOrders = useSelector(state => state.getOrders)?.data
    ///////////////////////
    const [sid, setSid] = useState(false);
    ///////////////////////
    const notificationsListButtonHandler = () => {
        setNotificationsListButton(false);
    }
    ///////////////////////
    const notHandler = (e) => {
        setNot(e);
        props?.numCounter(e)
    }
    ///////////////////////
    const DrowpListButtonHandler = () => {
        setDrowpListButton(false);
    }
    ///////////////////////
    let menuRef = useRef()
    useEffect(() => {
        let handler = (e) => {
            if (!menuRef.current.contains(e.target)) {
                setDrowpListButton(false);
            }
        };
        document.addEventListener("mousedown", handler)
        return () => {
            document.removeEventListener("mousedown", handler)
        };
    })
    ///////////////////////
    let notRef = useRef()
    useEffect(() => {
        let handler = (e) => {
            if (!notRef.current.contains(e.target)) {
                setNotificationsListButton(false);
            }
        };
        document.addEventListener("mousedown", handler)
        return () => {
            document.removeEventListener("mousedown", handler)
        };
    })
    ///////////////////////
    var animation111 = document.getElementById("an1")
    var animation112 = document.getElementById("an2")
    var animation113 = document.getElementById("an3")
    var animation221 = document.getElementById("bn1")
    var animation222 = document.getElementById("bn2")
    var animation223 = document.getElementById("bn3")
    function RestartNavAnimate() {
        animation111?.beginElement();
        animation112?.beginElement();
        animation113?.beginElement();
        animation221?.beginElement();
        animation222?.beginElement();
        animation223?.beginElement();
    }
    ///////////////////////
    const hanleSearch = (e) => {
        e.preventDefault();
        if (searchKey.length != 0) {
            setSearchKey("")
        }
    }
    ///////////////////////////////
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getOrders())
    }, [dispatch])
    //////////////////////////
    // useEffect(() => {
    //     setTimeout(() => {

    //         oldOrder.length
    //     }, 2000);

    // }, [dispatch])
    //////////////////////////
    const { t } = useTranslation();
    return (
        <div className='navBar'>
            {!smSeartch &&
                <div className='sercheIn2'>
                    <button className='bArrrow' onClick={() => setSmSearch(true)} style={{ transform: lng == "ar" ? "rotate(180deg)" : " " }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width={"25px"} height={"25px"} viewBox="0 0 512 512" ><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={45} d="M244 400L100 256l144-144M120 256h292"></path></svg>
                    </button>
                    <form className='sercheInputform'>
                        <input className='sercheInput'
                            onChange={(e) => setSearchKey(e.target.value)}
                            placeholder={t("search.search")}
                        ></input>
                        <button type='supmit' className='start'
                            onClick={hanleSearch}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width={"25px"} height={"25px"} viewBox="0 0 24 24" ><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11.5a7.5 7.5 0 1 1-15 0a7.5 7.5 0 0 1 15 0m-2.107 5.42l3.08 3.08"></path></svg>
                        </button>
                    </form>
                </div>
            }
            {smSeartch &&
                <>
                    <div className='leftNav'>
                        <div className='menue' onClick={() => {
                            props.sidBarButtom(), setSid(!sid), RestartNavAnimate()
                        }}>
                            <svg style={{ display: sid ? "flex" : "none" }} xmlns="http://www.w3.org/2000/svg" width={"28px"} height={"28px"} viewBox="0 0 24 24" ><g fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth={2}><path d="M5 5L19 5"> <animate id='an1' fill="freeze" attributeName="d" begin="0.2s" dur="0.4s" values="M5 5L19 5;M5 5L19 19"></animate></path><path d="M5 12H19"><animate id='an2' fill="freeze" attributeName="d" dur="0.4s" values="M5 12H19;M12 12H12"></animate><set attributeName="opacity" begin="0.4s" to={0}></set></path><path d="M5 19L19 19"><animate id='an3' fill="freeze" attributeName="d" begin="0.2s" dur="0.4s" values="M5 19L19 19;M5 19L19 5"></animate></path></g></svg>
                            <svg style={{ display: sid ? "none" : "flex" }} xmlns="http://www.w3.org/2000/svg" width={"28px"} height={"28px"} viewBox="0 0 24 24" ><g fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth={2}><path d="M5 5L19 19"><animate id='bn1' fill="freeze" attributeName="d" dur="0.4s" values="M5 5L19 19;M5 5L19 5"></animate></path><path d="M12 12H12" opacity={0}><animate id='bn2' fill="freeze" attributeName="d" begin="0.2s" dur="0.4s" values="M12 12H12;M5 12H19"></animate><set attributeName="opacity" begin="0.2s" to={1} repeatCount="indefinite" ></set></path><path d="M5 19L19 5"><animate id='bn3' fill="freeze" attributeName="d" dur="0.4s" values="M5 19L19 5;M5 19L19 19"></animate></path></g></svg>
                        </div>
                        <Link to={'/MyCategory'} className='' >
                            <div className='logo'><img className='flowerLogo' src={Logo} /></div>
                        </Link>
                        <DarkMode />
                        <div className='sercheIn'>
                            <form className='sercheInputform'>
                                <input className='sercheInput'
                                    onChange={(e) => setSearchKey(e.target.value)}
                                    placeholder={t("search.search")}
                                ></input>
                                <button className='start'
                                    onClick={hanleSearch}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width={"25px"} height={"25px"} viewBox="0 0 24 24" ><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11.5a7.5 7.5 0 1 1-15 0a7.5 7.5 0 0 1 15 0m-2.107 5.42l3.08 3.08"></path></svg>
                                </button>
                            </form>
                        </div>

                    </div>
                    <div className='rightNav'>
                        <LanguageSwitcher />

                        <button className='bSearch' onClick={() => setSmSearch(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width={"30px"} height={"30px"} viewBox="0 0 24 24" ><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11.5a7.5 7.5 0 1 1-15 0a7.5 7.5 0 0 1 15 0m-2.107 5.42l3.08 3.08"></path></svg>
                        </button>
                        <div className='bb'>
                            <button className='b2' onClick={() => setNotificationsListButton(!notificationsListButton)}     >
                                <svg xmlns="http://www.w3.org/2000/svg" width={"30px"} height={"30px"} viewBox="0 0 24 24" ><g fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth={1.3}><g><path strokeDasharray={28} strokeDashoffset={28} d="M12 3V5"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.2s" values="4;0"></animate></path><path strokeDasharray={28} strokeDashoffset={28} d="M12 5C8.68629 5 6 7.68629 6 11L6 17C5 17 4 18 4 19H12M12 5C15.3137 5 18 7.68629 18 11L18 17C19 17 20 18 20 19H12"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.2s" dur="0.4s" values="28;0"></animate></path><animateTransform attributeName="transform" begin="0.8s" dur="6s" keyTimes="0;0.05;0.15;0.2;1" repeatCount="indefinite" type="rotate" values="0 12 3;3 12 3;-3 12 3;0 12 3;0 12 3"></animateTransform></g><path strokeDasharray={8} strokeDashoffset={8} d="M10 20C10 21.1046 10.8954 22 12 22C13.1046 22 14 21.1046 14 20"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.6s" dur="0.2s" values="8;0"></animate><animateTransform attributeName="transform" begin="1s" dur="6s" keyTimes="0;0.05;0.15;0.2;1" repeatCount="indefinite" type="rotate" values="0 12 8;6 12 8;-6 12 8;0 12 8;0 12 8"></animateTransform></path></g></svg>

                                {not > 0 && <div className='cartNum'>
                                    {/* 
                                    {(allOrders?.filter(order => {
                                        if (order.orderStatus == "processing") { return order; }
                                    })).length +
                                } */}
                                    {not}
                                </div>}
                            </button>
                            <AdminNotifications
                                notRef={notRef}
                                oldOrder={allOrders?.filter(order => {
                                    if (order.orderStatus == "processing") { return order; }
                                })
                                }
                                notHandler={notHandler}
                                notificationsListButton={notificationsListButton}
                                notificationsListButtonHandler={() => notificationsListButtonHandler()}
                            />

                        </div>
                        <div className='bb'>
                            <button className='b3' onClick={() => setDrowpListButton(!DrowpListButton)} >
                                <svg xmlns="http://www.w3.org/2000/svg" width={"20px"} height={"20px"} viewBox="0 0 24 24" ><g fill="none" stroke="currentColor" strokeDasharray={28} strokeDashoffset={28} strokeLinecap="round" strokeWidth={1.5}><path d="M4 21V20C4 16.6863 6.68629 14 10 14H14C17.3137 14 20 16.6863 20 20V21"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.4s" values="28;0"></animate></path><path d="M12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7C16 9.20914 14.2091 11 12 11Z"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.5s" dur="0.4s" values="28;0"></animate></path></g></svg>
                            </button>
                            <DrowpList
                                menuRef={menuRef}
                                DrowpListButton={DrowpListButton}
                                DrowpListButtonHandler={() => DrowpListButtonHandler()}
                            />
                        </div>
                        {/* <button className='b3' onClick={() => setDrowpListButton(!DrowpListButton)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width={"20px"} height={"20px"} viewBox="0 0 24 24" ><g fill="none" stroke="currentColor" strokeDasharray={28} strokeDashoffset={28} strokeLinecap="round" strokeWidth={1.5}><path d="M4 21V20C4 16.6863 6.68629 14 10 14H14C17.3137 14 20 16.6863 20 20V21"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.4s" values="28;0"></animate></path><path d="M12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7C16 9.20914 14.2091 11 12 11Z"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.5s" dur="0.4s" values="28;0"></animate></path></g></svg>
                        </button> */}
                        {/* <LogoutModel /> */}
                    </div>
                </>}
        </div >
    )
}
export default MyNav
