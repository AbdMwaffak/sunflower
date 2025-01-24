import React, { useEffect, useState } from 'react';
import './perfumes.css'
import Api from '../../allExtensions/API';
import { Carousel, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPerfume } from '../../RTK/perfume/getAllPerfumeSlice';
import { addPerfumeToCart } from '../../RTK/shoppingCart/addPerfumeToCartSlice';
import ProfumeSize from '../../allExtensions/profumeSize/ProfumeSize';
import Aaa2 from '../../allExtensions/aaa2/Aaa2';
import AllowAddition2 from '../../allExtensions/allowAddition2/AllowAddition2';
import { getCart } from '../../RTK/shoppingCart/getCartSlice';
import NoToken from '../../allExtensions/noToken/NoToken';
import Cookies from 'universal-cookie';
import NoPerfumes from '../../allExtensions/noPerfumes/NoPerfumes';
import { Toaster } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';


const Perfumes = (props) => {
    const cookies = new Cookies();
    let lng = ''
    let token = ''
    if (cookies.get('token') !== undefined || null) {
        token = true
    } else token = false
    if (cookies.get('i18next') === "ar") {
        lng = "ar"
    } else lng = "en"
    /////////////////////////////
    const allPerfume = useSelector(state => state.getAllPerfume)?.data[0]
    const cartBroduct = useSelector(state => state.getCart)?.data?.cart
    //////////////////////////////
    const [reload, setReload] = useState("")
    const [card, setCard] = useState('');
    const [cardch, setCardch] = useState("true");
    const [oneNum, setOneNum] = useState([]);
    const [totalCost, setTotalCost] = useState([]);
    const [totalCosts, setTotalCosts] = useState(0);
    const [validated, setValidated] = useState(false);
    const [openModel, setOpenModel] = useState(false);
    const [openModel2, setOpenModel2] = useState(false);
    const [openModel3, setOpenModel3] = useState(false);
    const [turnOn, setTurnOn] = useState(false);
    //////////////////////////////
    const handelCunter = (num) => {
        if (num.count == 1 && oneNum?.some(p => num?.size == p?.size) == false) {
            oneNum.push(num)
        }
        else if (num?.count == 0) {
            oneNum?.map((one, index) => (
                one?.size == num?.size
                    ? oneNum?.splice(index, 1)
                    : one.count = one?.count
            ))
        } else {
            oneNum?.map((one) => (
                one.size == num.size
                    ? one.count = num.count
                    : one.count = one.count
            ))
        }
    }
    /////////////////////////////
    const handelprice = (pr) => {
        if (pr.count == 1 && totalCost?.some(p => pr?.id == p?.id) == false) {
            totalCost.push(pr)
        }
        else if (pr?.count == 0) {
            totalCost?.map((p, index) => (
                p?.id == pr?.id
                    ? (totalCost?.splice(index, 1))
                    : null
            ))
        } else {
            totalCost?.map((p) => (
                p.id == pr.id
                    ? (p.count = pr.count, p.price = pr.price)
                    : (p.count = p.count, p.price = p.price)
            ))
        }
        let sum = totalCost?.reduce((accumulator, currentValue) =>
            accumulator + currentValue.price, 0);
        setTotalCosts(sum)
    }
    /////////////////////////////
    const handelReload = () => {
        setReload(!reload)
    }
    ///////////////////////////
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (oneNum.length === 0) {
            event.preventDefault();
            event.stopPropagation();
            setOpenModel2(true)
        }
        else {
            setValidated(true);
            if (turnOn == false) {
                if (cookies.get('token') !== undefined || null) {
                    if (cartBroduct?.naturalFlowers?.length === 0) {
                        const value = {
                            perfumeOrderVariants: oneNum,
                            totalPrice: totalCosts,
                            message: card,
                        }
                        dispatch(addPerfumeToCart(value))
                        setReload(!reload)
                        setTurnOn(true)
                        setTimeout(() => {
                            setTurnOn(false);
                            props.numCounter()
                        }, 4000);
                    } else {
                        setOpenModel(true)
                    }
                } else {
                    setOpenModel3(true)
                }
            }
        }
    }
    /////////////////////////////
    const handleClose = () => {
        setTimeout(() => {
            setOpenModel3(false)
            setOpenModel2(false)
            setOpenModel(false)
        }, 1000);
    }
    /////////////////////////////
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllPerfume())
        if (cookies.get('token') !== undefined || null)
            dispatch(getCart())
    }, [dispatch, reload])
    /////////////////////////////
    useEffect(
        function () {
            document.title = `SUNFLOWER - Perfumes `;
            return function () { document.title = 'SUNFLOWER' };
        }, [])
    ///////////////////
    const { t } = useTranslation();
    return (
        <>
            <Toaster />
            {openModel3 &&
                <NoToken
                    handleClose={handleClose}
                />
            }
            {openModel2 &&
                <NoPerfumes
                    handleClose={handleClose}
                />
            }
            {openModel &&
                <AllowAddition2
                    handleClose={handleClose}
                    handelReload={handelReload}
                    handleSubmit={handleSubmit}
                />
            }
            <div className='bage'>
                <div className='title'>
                    {t('perfume.title')}
                </div>
                <div className='perfumesContener'>
                    <div className='perfumesMain'>
                        <div className='perfumesDecription '>
                            <span className='vv1'> {allPerfume?.name}  </span>
                            <hr className='tapp' />
                            {lng == "ar" ? allPerfume?.descriptionAr : allPerfume?.description}
                        </div>
                        <div className='inputperfumesImage'>
                            <Carousel data-bs-theme="dark">
                                {allPerfume?.images?.map((img, index) => (
                                    <Carousel.Item
                                        key={index}  >
                                        <img
                                            className="w-100 allImage"
                                            src={`${Api}/users/${img}`}
                                            alt={index}
                                        />
                                        <Carousel.Caption>  </Carousel.Caption>
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                        </div>
                    </div>
                    <div className='perfumesSize'>
                        <span className='vv1 whaid'>   {t('perfume.choose')}
                            <hr className='tapp' />
                        </span>
                        <div className='size'>
                            {(allPerfume?.variants?.filter(perf => {
                                if (perf.available == true) { return perf; }
                            }).length == 0) &&
                                <div style={{
                                    width: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center"
                                }}>
                                    <div className='noProducts' >
                                        <b> {t('perfume.noProducts1')}
                                            <svg xmlns="http://www.w3.org/2000/svg" width={25} height={25} viewBox="0 0 36 36" ><path fill="#ffcb4c" d="M36 18c0 9.941-8.059 18-18 18c-9.94 0-18-8.059-18-18C0 8.06 8.06 0 18 0c9.941 0 18 8.06 18 18"></path><ellipse cx={12.176} cy={14.71} fill="#65471b" rx={2.647} ry={3.706}></ellipse><circle cx={24.882} cy={14.294} r={6.882} fill="#f4f7f9"></circle><path fill="#65471b" d="M14.825 9.946c-.322 0-.64-.146-.848-.423c-.991-1.321-2.028-2.029-3.083-2.104c-1.39-.095-2.523.947-2.734 1.158A1.057 1.057 0 1 1 6.663 7.08c.457-.457 2.129-1.936 4.381-1.773c1.695.12 3.251 1.111 4.627 2.945a1.059 1.059 0 0 1-.846 1.694"></path><path fill="#292f33" d="M32.824 36a1.059 1.059 0 0 1-1.059-1.059V14.824a1.059 1.059 0 1 1 2.118 0v20.118A1.06 1.06 0 0 1 32.824 36"></path><path fill="#67757f" d="M32.824 12.706c-.054 0-.105.012-.158.016c-.732-3.628-3.943-6.369-7.784-6.369c-4.379 0-7.941 3.562-7.941 7.941s3.562 7.941 7.941 7.941c3.468 0 6.416-2.238 7.496-5.343a2.118 2.118 0 1 0 .446-4.186m-7.942 7.412c-3.211 0-5.823-2.612-5.823-5.824s2.613-5.824 5.823-5.824c3.211 0 5.824 2.612 5.824 5.824s-2.613 5.824-5.824 5.824"></path><path fill="#65471b" d="M21.175 28.588c-.159 0-.321-.036-.473-.112c-1.819-.91-3.587-.91-5.406 0a1.059 1.059 0 1 1-.947-1.895c2.421-1.21 4.877-1.21 7.3 0a1.06 1.06 0 0 1-.474 2.007"></path><path fill="#bdddf4" d="M28.049 9.411a5.788 5.788 0 0 0-3.167-.94a5.824 5.824 0 0 0-5.824 5.824c0 1.169.348 2.255.94 3.167zm-5.652 10.144a5.794 5.794 0 0 0 2.485.563a5.824 5.824 0 0 0 5.824-5.824c0-.89-.206-1.731-.563-2.485z"></path></svg>
                                            {" "} ! </b>
                                        <br />
                                        <b>
                                            {t('perfume.noProducts2')}
                                        </b>
                                    </div>
                                </div>}

                            {allPerfume?.variants?.filter(perf => {
                                if (perf.available == true) { return perf; }
                            }).map((size, index) => (
                                <ProfumeSize
                                    key={index}
                                    id={size?._id}
                                    price={size?.price}
                                    size={size?.size}
                                    handelCunter={handelCunter}
                                    handelprice={handelprice}
                                    handelReload={handelReload}
                                />
                            ))}
                        </div>
                    </div>
                    <div className='perfumesSize'>
                        <div className='cardContener'>
                            <div className='input3'>
                                <span className='vv2'> {t('perfume.attachCard')}   </span>
                                <Form className='yesNo' onChange={(e) => setCardch(e.target.value)}>
                                    <div key={`inline-radio`} className="yesNo1">
                                        <Form.Check
                                            inline
                                            label={t('perfume.yes')}
                                            name="group1"
                                            type="radio"
                                            value="false"
                                            id={`inline-radio`}
                                        />
                                        <Form.Check
                                            inline
                                            label={t('perfume.no')}
                                            name="group1"
                                            type="radio"
                                            value="true"
                                            id={`inline-radio`}
                                            onClick={() => setCard("")}
                                        />
                                    </div>
                                </Form>
                            </div>
                            <div className='input5'>
                                <Form.Control className='input6' as="textarea" aria-label="With textarea"
                                    onChange={(e) => setCard(e.target.value)}
                                    placeholder={t('public.write')}
                                    value={card}
                                    maxLength="150"
                                    disabled={cardch === "false" ? false : true}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='res' >
                        <div className='totalCost'>
                            {totalCosts}.{t('public.sar')}
                        </div>
                        <button className='formButton5'
                            onClick={handleSubmit}
                        >
                            <Aaa2 turnOn={turnOn} />
                            {t('perfume.add')}
                        </button>
                    </div>
                </div>
            </div >
        </>
    );
}
export default Perfumes;


