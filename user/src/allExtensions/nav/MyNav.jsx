import { Link, useNavigate } from 'react-router';
import './nav.css';
import Logo from '../../image/logo.svg'
import { useEffect, useRef, useState } from 'react';
import DrowpList from '../drowpList/DrowpList';
import { useDispatch, useSelector } from 'react-redux';
import { getCart } from '../../RTK/shoppingCart/getCartSlice';
import Cookies from 'universal-cookie';
import LanguageSwitcher from '../language Switcher/Language Switcher';
import DarkMode from '../darkMode/DarkMode';
import { useTranslation } from 'react-i18next';
import Flower from '../flowers/Flower';


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
    const navigate = useNavigate();
    //////////////////////////
    const cartBroduct = useSelector(state => state.getCart)?.data?.cart
    //////////////////////////
    const [login, setLogin] = useState(false)
    const [searchKey, setSearchKey] = useState("")
    const [sidBarButton, setSidBarButton] = useState(false);
    const [DrowpListButton, setDrowpListButton] = useState(false);
    const [smSeartch, setSmSearch] = useState(true);
    //////////////////////////
    var animation111 = document.getElementById("an1")
    var animation112 = document.getElementById("an2")
    var animation113 = document.getElementById("an3")
    var animation221 = document.getElementById("bn1")
    var animation222 = document.getElementById("bn2")
    var animation223 = document.getElementById("bn3")
    function restartNavAnimate() {
        animation111?.beginElement();
        animation112?.beginElement();
        animation113?.beginElement();
        animation221?.beginElement();
        animation222?.beginElement();
        animation223?.beginElement();
    }
    //////////////////////
    const sidBarButtonHandler = () => {
        setSidBarButton(false);
    }
    //////////////////////
    const sidBarButtonHandlerM = () => {
        setSidBarButton(!sidBarButton)
        restartNavAnimate()
    }
    //////////////////////
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
    const dispatch = useDispatch()
    ///////////////////////
    const hanleSearch = (e) => {
        e.preventDefault();
        if (searchKey.length != 0) {
            navigate(`/Search/${searchKey}`)
            setSearchKey("")
        }
    }
    ///////////////////////
    useEffect(() => {
        if (cookies.get('token') !== undefined || null) {
            dispatch(getCart())
            setLogin(true)
        }
        else { setLogin(false) }
    }, [dispatch, props.num])
    ////////////////////////////////////
    const { t } = useTranslation();
    return (
        <div className='navBar'>
            {!smSeartch &&
                <div className='sercheIn2'>
                    <button className='bArrrow' onClick={() => setSmSearch(true)} style={{ transform: lng == "ar" ? "rotate(180deg)" : " " }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width={25} height={25} viewBox="0 0 512 512" ><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={45} d="M244 400L100 256l144-144M120 256h292"></path></svg>
                    </button>
                    <form className='sercheInputform'>
                        <input className='sercheInput'
                            onChange={(e) => setSearchKey(e.target.value)}
                            placeholder={t("search.search")}
                            value={searchKey}
                        ></input>
                        <button type='supmit' className='start'
                            onClick={hanleSearch}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width={25} height={25} viewBox="0 0 24 24" ><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11.5a7.5 7.5 0 1 1-15 0a7.5 7.5 0 0 1 15 0m-2.107 5.42l3.08 3.08"></path></svg>
                        </button>
                    </form>
                </div>
            }
            {smSeartch &&
                <>
                    <div className='leftNav'>
                        <Flower
                            sidBarButton={sidBarButton}
                            sidBarButtonHandler={() => sidBarButtonHandler()}
                        />
                        <div className='menue' style={{ display: sidBarButton ? "flex" : "none" }}
                            onClick={() => {
                                sidBarButtonHandlerM()
                            }}> 
                            <svg xmlns="http://www.w3.org/2000/svg" width={28} height={28} viewBox="0 0 24 24" ><g fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth={2}><path d="M5 5L19 5"> <animate id='an1' fill="freeze" attributeName="d" begin="0.2s" dur="0.4s" values="M5 5L19 5;M5 5L19 19"></animate></path><path d="M5 12H19"><animate id='an2' fill="freeze" attributeName="d" dur="0.4s" values="M5 12H19;M12 12H12"></animate><set attributeName="opacity" begin="0.4s" to={0}></set></path><path d="M5 19L19 19"><animate id='an3' fill="freeze" attributeName="d" begin="0.2s" dur="0.4s" values="M5 19L19 19;M5 19L19 5"></animate></path></g></svg>
                        </div>
                        <div className='menue' style={{ display: sidBarButton ? "none" : "flex" }}
                            onClick={() => {
                                sidBarButtonHandlerM()
                            }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width={28} height={28} viewBox="0 0 24 24" ><g fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth={2}><path d="M5 5L19 19"><animate id='bn1' fill="freeze" attributeName="d" dur="0.4s" values="M5 5L19 19;M5 5L19 5"></animate></path><path d="M12 12H12" opacity={0}><animate id='bn2' fill="freeze" attributeName="d" begin="0.2s" dur="0.4s" values="M12 12H12;M5 12H19"></animate><set attributeName="opacity" begin="0.2s" to={1} repeatCount="indefinite" ></set></path><path d="M5 19L19 5"><animate id='bn3' fill="freeze" attributeName="d" dur="0.4s" values="M5 19L19 5;M5 19L19 19"></animate></path></g></svg>
                        </div>
                        <Link to={'../'} className='' >
                            <div className='logo'><img className='flowerLogo' src={Logo} /></div>
                        </Link>
                        <DarkMode />
                        <div className='sercheIn'>
                            <form className='sercheInputform'>
                                <input className='sercheInput'
                                    onChange={(e) => setSearchKey(e.target.value)}
                                    placeholder={t("search.search")}
                                    value={searchKey}
                                ></input>
                                <button className='start'
                                    onClick={hanleSearch}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width={25} height={25} viewBox="0 0 24 24" ><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11.5a7.5 7.5 0 1 1-15 0a7.5 7.5 0 0 1 15 0m-2.107 5.42l3.08 3.08"></path></svg>
                                </button>
                            </form>
                        </div>
                    </div>
                    <div className='rightNav'>
                        <LanguageSwitcher />
                        <button className='bSearch' onClick={() => setSmSearch(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width={"30px"} height={"30px"} viewBox="0 0 24 24" ><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11.5a7.5 7.5 0 1 1-15 0a7.5 7.5 0 0 1 15 0m-2.107 5.42l3.08 3.08"></path></svg>
                        </button>
                        <Link to={'../MyCart'} className='linkSB'  >
                            <button className='b1' >
                                <svg className='b1Icon' xmlns="http://www.w3.org/2000/svg" width={"20px"} height={"20px"} viewBox="0 0 24 24" ><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.3} color="currentColor"><path d="M8 16h7.263c4.488 0 5.17-2.82 5.998-6.93c.239-1.187.358-1.78.071-2.175s-.837-.395-1.938-.395H6"></path><path d="M8 16L5.379 3.515A2 2 0 0 0 3.439 2H2.5m6.38 14h-.411C7.105 16 6 17.151 6 18.571a.42.42 0 0 0 .411.429H17.5"></path><circle cx={10.5} cy={20.5} r={1.5}></circle><circle cx={17.5} cy={20.5} r={1.5}></circle></g></svg>
                                {(cartBroduct?.products?.moneyProducts?.length > 0 ||
                                    cartBroduct?.products?.moneyProducts?.length > 0) &&
                                    <div className='cartNum'>
                                        {cartBroduct?.naturalFlowers?.length +
                                            cartBroduct?.perfumes?.length +
                                            cartBroduct?.offers?.length +
                                            cartBroduct?.products?.moneyProducts?.length +
                                            cartBroduct?.products?.pointsProducts?.length}
                                    </div>}
                                {((cartBroduct?.products == undefined ||
                                    cartBroduct?.products?.length == 0) && (
                                        cartBroduct?.naturalFlowers?.length +
                                        cartBroduct?.perfumes?.length
                                        + cartBroduct?.offers?.length
                                        > 0)) &&
                                    <div className='cartNum'>
                                        {cartBroduct?.naturalFlowers?.length +
                                            cartBroduct?.perfumes?.length +
                                            cartBroduct?.offers?.length}
                                    </div>
                                }
                            </button>
                        </Link>
                        <button className='b3' onClick={() => setDrowpListButton(!DrowpListButton)} ref={menuRef}>
                            <svg xmlns="http://www.w3.org/2000/svg" width={"20px"} height={"20px"} viewBox="0 0 24 24" ><g fill="none" stroke="currentColor" strokeDasharray={28} strokeDashoffset={28} strokeLinecap="round" strokeWidth={1.5}><path d="M4 21V20C4 16.6863 6.68629 14 10 14H14C17.3137 14 20 16.6863 20 20V21"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.4s" values="28;0"></animate></path><path d="M12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7C16 9.20914 14.2091 11 12 11Z"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.5s" dur="0.4s" values="28;0"></animate></path></g></svg>
                            <DrowpList
                                menuRef={menuRef}
                                DrowpListButton={DrowpListButton}
                                DrowpListButtonHandler={() => DrowpListButtonHandler()}
                            />
                        </button>
                    </div>
                </>}
        </div >
    )
}
export default MyNav
