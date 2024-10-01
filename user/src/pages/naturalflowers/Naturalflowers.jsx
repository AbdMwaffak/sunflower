import React, { useEffect, useState } from 'react';
import './naturalFlowers.css'
import '../../allExtensions/check/check.css';
import Back2 from '../../image/Back2.jpeg';
import { Form } from 'react-bootstrap';
import ExtraChocolate from '../../allExtensions/extraChocolate/ExtraChocolate';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBouquets } from '../../RTK/naturalFlowers/getAllBouquetsSlice';
import { getAllChocolate } from '../../RTK/naturalFlowers/getAllChocolateSlice';
import { getBand } from '../../RTK/naturalFlowers/getBandSlice';
import { getPaper } from '../../RTK/naturalFlowers/getPaperSlice';
import { addFlowerToCart } from '../../RTK/shoppingCart/addFlowerToCartSlice';
import Api from '../../allExtensions/API';
import { getCart } from '../../RTK/shoppingCart/getCartSlice';
import AllowAddition from '../../allExtensions/allowAddition/AllowAddition';
import Aaa from '../../allExtensions/aaa/Aaa';
import Cookies from 'universal-cookie';
import NoToken from '../../allExtensions/noToken/NoToken';
import NoPaperOrStrip from '../../allExtensions/noPaperOrStrip/NoPaperOrStrip';
import { Toaster } from 'react-hot-toast';


const Naturalflowers = (props) => {
    const cookies = new Cookies();
    /////////////////////////////
    const allBouquets = useSelector(state => state.getAllBouquets)?.data
    const allChocolate = useSelector(state => state.getAllChocolate)?.data
    const allBands = useSelector(state => state.getBand)?.data
    const allPapers = useSelector(state => state.getPaper)?.data
    const cartBroduct = useSelector(state => state.getCart)?.data?.cart
    /////////////////////////////
    const [reload, setReload] = useState("")
    /////////////////////////////
    const dispatch = useDispatch()
    /////////////////////////////
    const [sunflowersInfo, setSunflowersInfo] = useState({});
    const [paper, setPaper] = useState({});
    const [band, setBand] = useState({});
    const [card, setCard] = useState('');
    const [cardch, setCardch] = useState("true");
    const [chocoSum, setChocoSum] = useState(0);
    const [oneNum, setOneNum] = useState([]);
    const [validated, setValidated] = useState(false);
    const [openModel, setOpenModel] = useState(false);
    const [openModel2, setOpenModel2] = useState(false);
    const [openModel3, setOpenModel3] = useState(false);
    const [turnOn, setTurnOn] = useState(false);
    ///////////////////////////
    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget;
        if (turnOn == false) {
            if (cookies.get('token') !== undefined || null) {
                if (sunflowersInfo?._id === undefined || paper?._id === undefined || band?._id === undefined) {
                    event.preventDefault();
                    event.stopPropagation();
                    setValidated(true);
                    setOpenModel2(true)
                }
                else {
                    setValidated(true);
                    if (cartBroduct?.perfumes?.length === 0 && cartBroduct?.products?.length === 0) {
                        const value = {
                            naturalFlower: sunflowersInfo._id,
                            details: { band: band?._id, paper: paper._id },
                            chocolate: oneNum,
                            totalPrice: chocoSum + sunflowersInfo.price,
                            message: card,
                        }
                        dispatch(addFlowerToCart(value))
                        setReload(!reload)
                        setTurnOn(true)
                        setTimeout(() => {
                            setTurnOn(false);
                            props.numCounter()
                        }, 4000);

                    } else {
                        setOpenModel(true)
                    }
                }
            } else {
                setOpenModel3(true)
            }
        }
    };
    /////////////////////////////
    const handelIncreaseSum = (e, num) => {
        setChocoSum(chocoSum + e)
        if (num.count == 1) {
            oneNum.push(num)
        } else {
            oneNum?.map((one) => (
                one.id == num.id
                    ? one.count = num.count
                    : one.count = one.count
            ))
        }
    }
    /////////////////////////////
    const handelDecreaseSum = (e, num) => {
        setChocoSum(chocoSum - e)
        if (num?.count == 0) {
            oneNum?.map((one, index) => (
                one?.id == num?.id
                    ? oneNum?.splice(index, 1)
                    : one.count = one?.count
            ))
        } else
            oneNum?.map((one) => (
                one?.id == num?.id
                    ? one.count = num?.count
                    : one.count = one?.count
            ))
    }
    /////////////////////////////
    const handelReload = () => {
        setReload(!reload)
    }
    /////////////////////////////
    const handleClose = () => {
        setTimeout(() => {
            setOpenModel(false)
            setOpenModel2(false)
            setOpenModel3(false)
        }, 1000);
    }
    /////////////////////////////
    useEffect(() => {
        dispatch(getAllBouquets())
        dispatch(getAllChocolate())
        dispatch(getBand())
        dispatch(getPaper())
        if (cookies.get('token') !== undefined || null)
            dispatch(getCart())
    }, [dispatch, reload])
    //////////////////////////
    useEffect(
        function () {
            document.title = `SUNFLOWER - Naturalflowers `;
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
                <NoPaperOrStrip
                    handleClose={handleClose}
                    flowersNumber={sunflowersInfo?._id}
                    paper={paper?._id}
                    strip={band?._id}
                />
            }
            {openModel &&
                <AllowAddition
                    handleClose={handleClose}
                    handelReload={handelReload}
                    handleSubmit={handleSubmit}
                />
            }
            <div className='naturalFlowers'>
                <div className='naturalFlowersTitle'>
                    Natural flowers
                </div>
                <div className='flowersBouquet'>
                    <div className='flowersBouquetMain'>
                        <div className='input1'>
                            <span className='vv1'>  Create your own bouquet</span>
                            <hr />
                            <Form className='input2' noValidate validated={validated}
                                onSubmit={handleSubmit}
                            >
                                <div className='input3'>
                                    <span className='vv2'>  Number of sunflowers </span>
                                    <Form.Select className='input4' aria-label="Default select example"
                                        style={{ width: "40%" }}
                                        required
                                        onChange={(e) => setSunflowersInfo(allBouquets[e.target.value])}
                                    >
                                        <option value={""}>Open this select menu</option>
                                        {typeof allBouquets != 'string' &&
                                            allBouquets?.map((bouquet, index) => (
                                                <option key={index} value={index} > {bouquet?.count}   </option>
                                            ))}
                                    </Form.Select>
                                </div>
                                <div className='input3'>
                                    <span className='vv2'>    Color of wrapping papers </span>
                                    <Form.Select className='input4' aria-label="Default select example"
                                        style={{ backgroundColor: paper?.color, width: "40%" }}
                                        required
                                        onChange={(e) => setPaper(allPapers[e.target.value])}
                                    >
                                        <option value={""}>Open this select menu</option>
                                        {typeof allPapers != 'string' &&
                                            allPapers?.map((paper, index) => (
                                                <option key={index} value={index} data-mdb-icon="dd" style={{ backgroundColor: paper.color }} >
                                                </option>
                                            ))}
                                    </Form.Select>
                                </div>
                                <div className='input3'>
                                    <span className='vv2'>    Color of strips </span>
                                    <Form.Select className='input4' aria-label="Default select example"
                                        style={{ backgroundColor: band?.color, width: "40%" }}
                                        required
                                        onChange={(e) => setBand(allBands[e.target.value])}
                                    >
                                        <option value={""}>Open this select menu</option>
                                        {typeof allBands != 'string' &&
                                            allBands?.map((band, index) => (
                                                <option key={index} value={index} data-mdb-icon="dd" style={{ backgroundColor: band.color }} >
                                                </option>
                                            ))}
                                    </Form.Select>
                                </div>
                                <div className='input3'>
                                    <span className='vv2'> Do you want to attach a card? </span>
                                    <div className='yesNo' onChange={(e) => setCardch(e.target.value)}>
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
                                    </div>
                                </div>
                                <div className='input5'>
                                    <Form.Control className='input6' as="textarea" aria-label="With textarea"
                                        onChange={(e) => setCard(e.target.value)}
                                        placeholder='write here '
                                        value={card}
                                        disabled={cardch === "false" ? false : true}
                                    />
                                </div>
                            </Form>
                        </div>
                        <div className='inputImage'>
                            <img className='imgNaturalFlowers' src={sunflowersInfo?.image ? `${Api}/users/${sunflowersInfo?.image}` : Back2} />
                            <div className='cbatsha' >
                                {sunflowersInfo?.description}
                            </div>
                        </div>
                    </div>
                    <div className='flowersBouquetExtra'>
                        <span className='vv1'>  Extra </span>
                        <span className='vv2'> Choose the chocolate you want to add to the package to make your package special </span>
                        <div className='chocolate'>

                            {typeof allChocolate == 'string' &&
                                // <div className='noChocolate' >
                                <div className='noProducts' >
                                    {allChocolate}
                                </div>

                            }
                            {typeof allChocolate != 'string' &&
                                allChocolate?.map((Chocolate, index) => (
                                    <ExtraChocolate
                                        key={index}
                                        id={Chocolate?._id}
                                        name={Chocolate?.name}
                                        price={Chocolate?.price}
                                        image={Chocolate?.image}
                                        handelIncreaseSum={handelIncreaseSum}
                                        handelDecreaseSum={handelDecreaseSum}
                                    />
                                ))}
                        </div>
                    </div>
                    <div className='res' >
                        <div className='totalCost'>
                            {chocoSum + (sunflowersInfo?.price ? sunflowersInfo?.price : 0)}
                        </div>
                        <button className='addToCart'
                            type='submit'
                            onClick={handleSubmit}
                        >
                            <Aaa turnOn={turnOn} />
                            add to cart
                            <h4 className='boint'> ....</h4>
                            <svg className='addToCartIcon'
                                xmlns="http://www.w3.org/2000/svg" width="57.66" height="60.863" viewBox="0 0 57.66 60.863">
                                <path id="Path_6" data-name="Path 6" d="M22.822,54.253a4.8,4.8,0,1,0,4.8,4.8A4.8,4.8,0,0,0,22.822,54.253Zm33.635-9.61H18.017a3.2,3.2,0,1,1,0-6.407h27.2a9.652,9.652,0,0,0,9.241-6.97l5.079-17.776a3.2,3.2,0,0,0-3.08-4.084H17.181A9.631,9.631,0,0,0,8.155,3H5.2a3.2,3.2,0,0,0,0,6.407H8.155a3.218,3.218,0,0,1,3.08,2.323l.5,1.745v.016l5.255,18.394A9.61,9.61,0,0,0,18.017,51.05h38.44a3.2,3.2,0,1,0,0-6.407ZM52.21,15.813,48.3,29.506a3.218,3.218,0,0,1-3.081,2.324H23.636l-.817-2.858L19.062,15.813Zm-3.762,38.44a4.8,4.8,0,1,0,4.8,4.8A4.8,4.8,0,0,0,48.448,54.253Z" transform="translate(-2 -3)" fill="#fff" />
                            </svg>
                        </button>
                    </div>
                </div >
            </div >
        </>
    );
}
export default Naturalflowers;
