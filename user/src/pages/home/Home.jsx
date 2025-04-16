import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import Cookies from 'universal-cookie';
import { Toaster } from 'react-hot-toast';
import { getAllSettings } from '../../RTK/settings/getAllSettingsSlice';
import { useTranslation } from 'react-i18next';
import { getAllcities } from '../../RTK/settings/getAllcitiesSlice';
import { getAllOffers } from '../../RTK/offers/getAllOffersSlice';
import Carousel from 'react-bootstrap/Carousel';
import SliderX from '../../allExtensions/slider/SliderX';
import LoginModelProdectied from '../../allExtensions/loginModel/LoginModelProdectied';
import CouponCard from '../../allExtensions/couponCard/CouponCard';
import Map from '../../allExtensions/map/Map';
import FlowersHome from '../../allExtensions/flowersHome/FlowersHome';
import CategoriesBar from '../../allExtensions/categoriesBar/CategoriesBar';
import './home.css'


const Home = (props) => {
    const cookies = new Cookies();
    let lng = ''
    let token = ''
    if (cookies.get('token') !== undefined || null) {
        token = true
    } else token = false
    if (cookies.get('i18next') === "ar") {
        lng = "ar"
    } else lng = "en"
    //////////////////////////////
    const start = useLocation()
    const allOffers = useSelector(state => state.getAllOffers)?.data
    const allSlider = useSelector(state => state.getAllSettings)?.data?.slider
    const cities = useSelector(state => state.getAllcities)?.data
    //////////////////////////////
    const [reload, setReload] = useState("")
    //////////////////////////////
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllOffers())
        dispatch(getAllSettings())
        dispatch(getAllcities())

    }, [dispatch, reload])
    //////////////////////////
    useEffect(
        function () {
            document.title = `SUNFLOWER - Home`;
            return function () { document.title = 'SUNFLOWER' };
        }, [])
    ////////////////////////////////////
    const { t } = useTranslation();
    return (
        <>
            <Toaster />
            {(start?.state?.start == true && token == false) &&
                <LoginModelProdectied />}
            <div className='bage'>
                <div className='slider'>
                    <Carousel data-bs-theme="dark" style={{ overflow: "heddin", height: "100%" }}>
                        {allSlider?.map((itame, index) => (
                            <Carousel.Item style={{ overflow: "heddin" }} key={index}>
                                <img
                                    className="w-100 homeImg"
                                    src={itame?.image}
                                    alt="First slide"
                                />
                                <Carousel.Caption>
                                </Carousel.Caption>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </div>
                <CategoriesBar lng={lng} />
                <FlowersHome numCounter={props?.numCounter} />

<div className='supTitle'>
                    {t('home.ourOffers')}
                </div>
                <div className='ourOffers'>
                    {allOffers?.filter(vv => {
                        if (vv.products.length !== 0) { return vv; }
                    }).length == 0 &&
                        <div className='new1'>
                            {t('home.offerOff')}
                            <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 36 36" ><path fill="#fdd888" d="M33 31c0 2.2-1.8 4-4 4H7c-2.2 0-4-1.8-4-4V14c0-2.2 1.8-4 4-4h22c2.2 0 4 1.8 4 4z"></path><path fill="#fdd888" d="M36 11c0 2.2-1.8 4-4 4H4c-2.2 0-4-1.8-4-4s1.8-4 4-4h28c2.2 0 4 1.8 4 4"></path><path fill="#fcab40" d="M3 15h30v2H3z"></path><path fill="#da2f47" d="M19 3h-2a3 3 0 0 0-3 3v29h8V6a3 3 0 0 0-3-3"></path><path fill="#da2f47" d="M16 7c1.1 0 1.263-.516.361-1.147L9.639 1.147a1.795 1.795 0 0 0-2.631.589L4.992 5.264C4.446 6.219 4.9 7 6 7zm4 0c-1.1 0-1.263-.516-.361-1.147l6.723-4.706a1.796 1.796 0 0 1 2.631.589l2.016 3.527C31.554 6.219 31.1 7 30 7z"></path></svg>
                        </div>}
                    {allOffers?.filter(vv => {
                        if (vv.products.length !== 0) { return vv; }
                    }).length == 1 &&
                        <>
                            <div className='new2'>
                                {t('home.offerOn')}
                            </div>
                            <div className='currentOffers'>
                                {allOffers?.filter(vv => {
                                    if (vv.products.length !== 0) { return vv; }
                                }).map((item, index) => (
                                    <CouponCard
                                        key={index}
                                        discount={item?.discount}
                                        mainImage={item?.mainImage}
                                        description={lng == "ar" ? item.descriptionAr : item.description}
                                        name={lng == "ar" ? item.nameAr : item.name}
                                        priceA={item?.priceA}
                                        priceB={item?.priceB}
                                        products={item?.products}
                                        id={item?._id}
                                        numCounter={props?.numCounter}
                                    />
                                ))
                                }
                            </div>
                        </>
                    }

                    {allOffers?.filter(vv => {
                        if (vv.products.length !== 0) { return vv; }
                    }).length > 1 &&
                        <>
                            <div className='new2'>
                                {t('home.offerOn')}
                            </div>
                            <SliderX
                                vv={allOffers}
                                numCounter={props?.numCounter}
                            /> </>
                    }
                </div>
                <div className='supTitle'>
                    {t('home.deliveryServes')}
                </div>
                <div className='delivery'>
                    <div className='new3'>
                        {t('home.deliveryText')}
                    </div>
                    <div className='deliveryText'>
                        {cities?.filter(cities => {
                            if (cities.isActive == true) { return cities; }
                        }).map((city, index) => (
                            <div className='citydev' key={index} >  {lng == "ar" ? city?.nameAr : city?.name} </div>
                        ))}
                    </div>
                    <div className='map1'>
                        <Map />
                    </div>
                </div>
            </div >
        </>
    );
}
export default Home;
