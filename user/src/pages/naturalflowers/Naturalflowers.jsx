import React, { useEffect, useState } from 'react';
import './naturalFlowers.css'
import '../../allExtensions/check/check.css';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBouquets } from '../../RTK/naturalFlowers/getAllBouquetsSlice';
import { getAllChocolate } from '../../RTK/naturalFlowers/getAllChocolateSlice';
import { getBand } from '../../RTK/naturalFlowers/getBandSlice';
import { getPaper } from '../../RTK/naturalFlowers/getPaperSlice';
import Api from '../../allExtensions/API';
import { getCart } from '../../RTK/shoppingCart/getCartSlice';
import AllowAddition from '../../allExtensions/allowAddition/AllowAddition';
import Cookies from 'universal-cookie';
import NoToken from '../../allExtensions/noToken/NoToken';
import { Toaster } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import ProductCard from '../../allExtensions/productCard/ProductCard';


const Naturalflowers = (props) => {
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
    const allBouquets = useSelector(state => state.getAllBouquets)?.data
    ///////////////////////////// 
    const [reload, setReload] = useState("")
    /////////////////////////////
    const dispatch = useDispatch()
    /////////////////////////////
    const [card, setCard] = useState('');
    const [validated, setValidated] = useState(false);
    const [openModel, setOpenModel] = useState(false);
    const [openModel3, setOpenModel3] = useState(false);
    const [turnOn, setTurnOn] = useState(false);
    ///////////////////////////
    const handelReload = () => {
        setReload(!reload)
    }
    /////////////////////////////
    const handleClose = () => {
        setTimeout(() => {
            setOpenModel(false)
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
    //////////////////////////
    const { t } = useTranslation();
    return (
        <>
            <Toaster />
            {openModel3 &&
                <NoToken
                    handleClose={handleClose}
                />
            }
            {openModel &&
                <AllowAddition
                    handleClose={handleClose}
                    handelReload={handelReload}
                />
            }
            <div className='bage'>
                <div className='title'>
                    {t('flower.title')}
                </div>
                <div className='flowersBouquet'>
                    {allBouquets?.map((bouquet, index) => (
                        <ProductCard
                            key={index}
                            id={bouquet._id}
                            image={`${Api}/users/${bouquet.images[0]}`}
                            images={bouquet.images}
                            name={lng == "ar" ? bouquet.nameAr : bouquet.name}
                            description={lng == "ar" ? bouquet.descriptionAr : bouquet.description}
                            price={bouquet.price}
                            categoryName={bouquet.categoryName}
                            createdAt={bouquet.createdAt}
                            isFavorite={bouquet.isFavorite}
                            handelReload={handelReload}
                            numCounter={props?.numCounter}

                        />

                    ))}
                    <div className='res' >
                    </div>
                </div >
            </div >
        </>
    );
}
export default Naturalflowers;
