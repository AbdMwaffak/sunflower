import React, { useEffect, useState } from 'react';
import './productProfile.css';
import Carousel from 'react-bootstrap/Carousel';
import ProductCard from '../../allExtensions/productCard/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { getProductById } from '../../RTK/product/getProductByIdSlice ';
import { useLocation, useParams } from 'react-router';
import Api from '../../allExtensions/API';
import { addToCart } from '../../RTK/shoppingCart/addToCartSlice';
import AllowPoint from '../../allExtensions/allowPoint/AllowPoint';
import AllowAddition3 from '../../allExtensions/allowAddition3/AllowAddition3';
import { getCart } from '../../RTK/shoppingCart/getCartSlice';
import { getMe } from '../../RTK/Auth/getMeSlice';
import Aaa3 from '../../allExtensions/aaa3/Aaa3';
import Cookies from 'universal-cookie';
import NoToken from '../../allExtensions/noToken/NoToken';
import NoSizeOrColor from '../../allExtensions/noSizeOrColor/NoSizeOrColor';
import { getSuggested } from '../../RTK/product/getSuggestedSlice';
import { Toaster } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { Form } from 'react-bootstrap';
import Aaa from '../../allExtensions/aaa/Aaa';


const ProductProfile = (props) => {
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
    const id = useParams()?.id
    const product = useSelector(state => state.getProductById)?.data
    const allSuggested = useSelector(state => state.getSuggested)?.data
    const cartBroduct = useSelector(state => state.getCart)?.data?.cart
    const me = useSelector(state => state.getMe)?.data
    //////////////////////////////
    const [reload, setReload] = useState(true)
    const [openModel2, setOpenModel2] = useState(false);
    const [openModel3, setOpenModel3] = useState(false);
    const [openModel4, setOpenModel4] = useState(false);
    const [turnOn, setTurnOn] = useState(false);

    const [card, setCard] = useState('');
    const [cardch, setCardch] = useState("true");
    //////////////////////////////
    const dispatch = useDispatch()
    //////////////////////////////
    const handeladdToCartMoney = () => {
        if (turnOn == false) {
            if (cookies.get('token') !== undefined || null) {
                const value = {
                    product: id,
                    quantity: 1,
                    paymentMethod: "money"
                }
                dispatch(addToCart(value))
                setTurnOn(true)
                setTimeout(() => {
                    setTurnOn(false);
                }, 4000);
                setReload(!reload)
                props.numCounter()
            } else {
                setOpenModel3(true)
            }
        }
    }
    //////////////////////////////
    const handeladdToCartPoints = () => {
        if (turnOn == false) {
            if (cookies.get('token') !== undefined || null) {
                if (me?.points != 0 && me?.points >= product?.priceInPoints) {
                    const value = {
                        product: id,
                        paymentMethod: "points"
                    }
                    dispatch(addToCart(value))
                    setReload(!reload)
                    setTurnOn(true)
                    setTimeout(() => {
                        setTurnOn(false);
                    }, 4000);
                    props.numCounter()
                } else {
                    setOpenModel2(true)
                }
            } else {
                setOpenModel3(true)
            }
        }
    }
    //////////////////////////////
    const handleClose = () => {
        setTimeout(() => {
            setOpenModel2(false)
            setOpenModel3(false)
            setOpenModel4(false)
        }, 1000);
    }
    //////////////////////////////
    const handelReload = () => {
        setReload(!reload)
    }
    ///////////////////////////
    useEffect(() => {
        dispatch(getProductById(id))
        if (cookies.get('token') !== undefined || null) {
            dispatch(getCart())
            dispatch(getMe())
            dispatch(getSuggested(id))
        }
    }, [dispatch, id, reload])
    //////////////////////////
    useEffect(
        function () {
            document.title = `SUNFLOWER - Product Profile `;
            return function () { document.title = 'SUNFLOWER' };
        }, [])
    ////////////////////////////////////
    const { t } = useTranslation();
    return (
        <>
            <Toaster />
            {openModel2 &&
                <AllowPoint
                    // productPoint={nPsize}
                    handleClose={handleClose}
                />}
            {openModel3 &&
                <NoToken
                    handleClose={handleClose}
                />
            }
            {openModel4 &&
                <NoSizeOrColor
                    productSize={nsize}
                    productColor={ncolor}
                    handleClose={handleClose}
                />
            }
            <div className='bage'>
                <div className='title'>
                    {lng == "ar" ? product.nameAr : product.name}
                </div>
                <div className='productContener'>
                    <div className='productMain' >
                        <div className='productDescription'>
                            <h3> {t('product.ProductDescription')} </h3>
                            <hr className='tapp' />
                            <p>  {lng == "ar" ? product?.descriptionAr : product?.description} </p>
                        </div>
                        <div className='imgSlider'>
                            <Carousel data-bs-theme="dark">
                                {product?.images?.map((img, index) => (
                                    <Carousel.Item
                                        key={index}
                                    >
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
                    <div className='productPrice'>
                        {product.price} {t('public.sar')}
                    </div>
                    <div className='productColors'>
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
                    <div className='res'>
                        <button className='formButton5' onClick={handeladdToCartMoney}>
                            <Aaa turnOn={turnOn} />
                            {t('product.addtoCart(by money)')}  </button>
                        {product.isAvailableToSellInPoints &&
                            <button className='formButton5' onClick={handeladdToCartPoints}>
                                <Aaa turnOn={turnOn} />
                                {t('product.addtoCart(by points)')}  </button>
                        }
                        {!product.isAvailableToSellInPoints &&
                            <button className='formButton5' >
                                {t('product.noPoints')}  </button>

                        }
                    </div>
                </div>
                <div className='supTitle'>
                    {t('product.suggestions')}
                </div>
                <div className='suggestions'>
                    {allSuggested?.filter(prod => {
                        if (prod.isActive == true) { return prod; }
                    }).map((product, index) => (
                        <ProductCard
                            key={index}
                            id={product._id}
                            image={`${Api}/users/${product.images[0]}`}
                            images={product.images}
                            name={lng == "ar" ? product?.nameAr : product?.name}
                            price={product.price}
                            sizes={product.sizes}
                            colors={product.colors}
                            description={product.description}
                            categoryName={product.categoryName}
                            createdAt={product.createdAt}
                            isFavorite={product.isFavorite}
                            handelReload={handelReload}
                        />
                    ))}
                </div>
            </div >
        </>
    );
}
export default ProductProfile;
