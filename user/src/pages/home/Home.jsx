import React, { useEffect, useState } from 'react';
import './home.css'
import Api from '../../allExtensions/API';
import CategorysCard from '../../allExtensions/categorysCard/CategorysCard';
import Location from '../../image/Location.png';
import NaturalFlowers from '../../image/NaturalFlowers.webp';
import Perfumes from '../../image/Perfumes.jfif';
import Carousel from 'react-bootstrap/Carousel';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../RTK/categoris/getCategoriesSlice ';
import { getAllOffers } from '../../RTK/offers/getAllOffersSlice';
import SliderX from '../../allExtensions/slider/SliderX';
import LoginModelProdectied from '../../allExtensions/loginModel/LoginModelProdectied';
import { useLocation } from 'react-router-dom';
import Cookies from 'universal-cookie';
import CategorysCardSkeleton from '../../allExtensions/categorysCard/CategorysCardSkeleton';
import { Toaster } from 'react-hot-toast';
import { getAllSettings } from '../../RTK/settings/getAllSettingsSlice';


const Home = (props) => {
    const start = useLocation()
    const allCategories = useSelector(state => state.getCategories)?.data
    const categoriesState = useSelector(state => state.getCategories)
    const allOffers = useSelector(state => state.getAllOffers)?.data
    const allSlider = useSelector(state => state.getAllSettings)?.data?.slider
    //////////////////////////////
    const [reload, setReload] = useState("")
    //////////////////////////////
    const cookies = new Cookies();
    let token = ''
    if (cookies.get('token') !== undefined || null) {
        token = true
    } else token = false
    //////////////////////////////
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getCategories())
        dispatch(getAllOffers())
        dispatch(getAllSettings())
    }, [dispatch, reload])
    //////////////////////////
    useEffect(
        function () {
            document.title = `SUNFLOWER - Home`;
            return function () { document.title = 'SUNFLOWER' };
        }, [])
    ///////////////////
    return (
        <>
            <Toaster />
            {(start?.state?.start == true && token == false) &&
                <LoginModelProdectied />}
            <div className='home'>
                <div className='slider'>
                    <Carousel data-bs-theme="dark" style={{ overflow: "heddin" }}>
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
                <div className='ourCategorysTitle'>
                    Our Categorys
                </div>
                <div className='ourCategorys'>
                    {categoriesState == "loading" &&
                        <>
                            <CategorysCardSkeleton />
                            <CategorysCardSkeleton />
                            <CategorysCardSkeleton />
                            <CategorysCardSkeleton />
                            <CategorysCardSkeleton />
                            <CategorysCardSkeleton />
                            <CategorysCardSkeleton />
                            <CategorysCardSkeleton />
                            <CategorysCardSkeleton />
                            <CategorysCardSkeleton />
                            <CategorysCardSkeleton />
                            <CategorysCardSkeleton />
                            <CategorysCardSkeleton />
                            <CategorysCardSkeleton />
                            <CategorysCardSkeleton />
                            <CategorysCardSkeleton />
                            <CategorysCardSkeleton />
                            <CategorysCardSkeleton />
                            <CategorysCardSkeleton />
                            <CategorysCardSkeleton />
                            <CategorysCardSkeleton />
                            <CategorysCardSkeleton />
                            <CategorysCardSkeleton />
                            <CategorysCardSkeleton />
                            <CategorysCardSkeleton />
                            <CategorysCardSkeleton />
                            <CategorysCardSkeleton />
                            <CategorysCardSkeleton />
                        </>
                    }
                    <CategorysCard
                        image={NaturalFlowers}
                        name='NaturalFlowers'
                    />
                    <CategorysCard
                        image={Perfumes}
                        name='Perfumes'
                    />
                    {allCategories?.filter(cate => {
                        if (cate.isActive == true) { return cate; }
                    }).map((category, index) => (
                        <CategorysCard
                            key={index}
                            id={category._id}
                            image={`${Api}/users/${category.image}`}
                            name={category.name} />
                    ))}
                </div>
                <div className='ourOffersTitle'>
                    Our Offers
                </div>
                <div className='ourOffers'>
                    {
                        allOffers?.length == 0 &&
                        <div className='new1'>
                            Wait for our new offers, there are many surprises
                            <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 36 36" ><path fill="#fdd888" d="M33 31c0 2.2-1.8 4-4 4H7c-2.2 0-4-1.8-4-4V14c0-2.2 1.8-4 4-4h22c2.2 0 4 1.8 4 4z"></path><path fill="#fdd888" d="M36 11c0 2.2-1.8 4-4 4H4c-2.2 0-4-1.8-4-4s1.8-4 4-4h28c2.2 0 4 1.8 4 4"></path><path fill="#fcab40" d="M3 15h30v2H3z"></path><path fill="#da2f47" d="M19 3h-2a3 3 0 0 0-3 3v29h8V6a3 3 0 0 0-3-3"></path><path fill="#da2f47" d="M16 7c1.1 0 1.263-.516.361-1.147L9.639 1.147a1.795 1.795 0 0 0-2.631.589L4.992 5.264C4.446 6.219 4.9 7 6 7zm4 0c-1.1 0-1.263-.516-.361-1.147l6.723-4.706a1.796 1.796 0 0 1 2.631.589l2.016 3.527C31.554 6.219 31.1 7 30 7z"></path></svg>
                        </div>}
                    {allOffers?.length != 0 &&
                        <>
                            <div className='new2'>
                                New sonflwer world website, offers on :
                            </div>
                            <SliderX
                                vv={allOffers}
                                numCounter={props?.numCounter}
                            /> </>
                    }
                </div>
                <div className='deliveryTitle'>
                    Delivery Serves
                </div>
                <div className='delivery'>
                    <div className='deliveryText'>
                        <div>
                            Delivery of flowers and cakes to<br />
                            <span className='vv'> Dammam </span>   and <span className='vv'> Khobar</span>
                        </div>
                        <div>
                            Delivery of the rest of the products to <br />
                            <span className='vv'>   the Eastern Province </span> and <span className='vv'>Riyadh </span>
                        </div>
                    </div>
                    <div className='deliveryImage'>
                        <img className='location' src={Location} />
                    </div>
                </div>
            </div >
        </>
    );
}
export default Home;
