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


const Perfumes = (props) => {
    const cookies = new Cookies();
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
            <div className='perfumes'>
                <div className='perfumesTitle'>
                    Perfumes
                </div>
                <div className='perfumesContener'>
                    <div className='perfumesMain'>
                        <div className='perfumesDecription '>
                            <span className='vv1'> {allPerfume?.name} perfume </span>
                            <hr />
                            {allPerfume?.description}
                        </div>
                        <div className='inputperfumesImage'>
                            <Carousel data-bs-theme="dark">
                                {allPerfume?.images?.map((img, index) => (
                                    <Carousel.Item
                                        key={index}  >
                                        <img
                                            className="w-100 profileImg"
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
                        <span className='vv1 whaid'>  Choose the right size for you
                            <hr />
                        </span>
                        <div className='size'>

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
                                <span className='vv2'> Do you want to attach a card? </span>
                                <Form className='yesNo' onChange={(e) => setCardch(e.target.value)}>
                                    <div key={`inline-radio`} className="mb-3">
                                        <Form.Check
                                            inline
                                            label="Yes"
                                            name="group1"
                                            type="radio"
                                            value="false"
                                            id={`inline-radio`}
                                        />
                                        <Form.Check
                                            inline
                                            label="No"
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
                                    placeholder='write here '
                                    value={card}
                                    maxLength="150"
                                    disabled={cardch === "false" ? false : true}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='res' >
                        <div className='totalCost'>
                            {totalCosts}
                        </div>
                        <button className='addToCart'
                            onClick={handleSubmit}
                        >
                            <Aaa2 turnOn={turnOn} />
                            add to cart
                        </button>
                    </div>
                </div>
            </div >
        </>
    );
}
export default Perfumes;


