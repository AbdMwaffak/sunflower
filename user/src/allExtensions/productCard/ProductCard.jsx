import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './productCard.css'
import { useNavigate } from 'react-router';
import { addToFavorite } from '../../RTK/favorite/addToFavoriteSlice';
import ShareButton from '../shareButton/ShareButton';
import NoToken from '../noToken/NoToken';
import Cookies from 'universal-cookie';
import FavoriteButton from '../favoriteButton/FavoriteButton';
import { useTranslation } from 'react-i18next';
import { addToCart } from '../../RTK/shoppingCart/addToCartSlice';
import { getCart } from '../../RTK/shoppingCart/getCartSlice';
import CardAttachedModel from '../cardAttachedModel/CardAttachedModel';
import Aaa from '../aaa/Aaa';
 
const ProductCard = (props) => {
    const cookies = new Cookies();
    //////////////////
    const navigate = useNavigate();
    const handelgo = () => {
        navigate(`/product/${props.id}`, { state: { id: props.id } })
    }
    //////////////////
    const cartBroduct = useSelector(state => state.getCart)?.data?.cart
    //////////////////
    const [reload, setReload] = useState(true)
    const [openModel3, setOpenModel3] = useState(false);
    const [turnOn, setTurnOn] = useState(false);
    const [card, setCard] = useState('');
    //////////////////
    const dispatch = useDispatch()
    const hanelAddToFavorite = () => {
        if (cookies.get('token') !== undefined || null) {
            dispatch(addToFavorite({ productId: props.id }))
            props?.handelReload()
        } else { setOpenModel3(true) }
    }
    //////////////////////////////
    const handeladdToCartMoney = (card) => {
        if (turnOn == false) {
            if (cookies.get('token') !== undefined || null) {
                const value = {
                    product: props?.id,
                    message: card,
                    paymentMethod: "money"
                }
                dispatch(addToCart(value))
                setReload(!reload);
                setTurnOn(true)
                setTimeout(() => {
                    setTurnOn(false);
                }, 4000);
            } else {
                setOpenModel3(true)
            }
        }
    }
    //////////////////////////////
    const handleClose = () => {
        setTimeout(() => {
            setOpenModel3(false)
        }, 1000);
    }
    ////////////////////////////////////
    useEffect(() => {
        if (cookies.get('token') !== undefined || null) {
            dispatch(getCart())
        }
    }, [dispatch, props?.id, reload])
    //////////////////////////
    const handelReload = () => {
        setReload(!reload)
    }
    ///////////////////////////
    const { t } = useTranslation();
    return (
        <>
            {openModel3 &&
                <NoToken handleClose={handleClose} />
            }
            <div className='productCard'>
                <div className='pName'>     {props?.name}</div>
                <div className='imageCard'>
                    <img className='cardImg' src={props.image} onClick={handelgo} />
                    <div className='imgNum'>
                        1/{props?.images?.length}
                    </div>
                    <div className='producButten'>
                        <ShareButton
                            id={props?.id}
                            img={props?.image} />
                        <div className='favoret' onClick={hanelAddToFavorite}>
                            < FavoriteButton isFavorite={props?.isFavorite} />
                        </div>
                    </div>
                </div>
                <div className='productTitle'>
                    <div className=' title2' >
                        <div className=' pDate '>   {props.price} .{t('public.sar')} </div>
                        <div className=' pDate'> {props?.createdAt?.split("T")[0]}</div>
                    </div>
                </div>
                <div className='cardDescription' >
                    {props?.description}
                </div>
                <div className='cardTail'  >
                    < CardAttachedModel
                        handeladdToCartMoney={handeladdToCartMoney}
                    />
                    <Aaa turnOn={turnOn} />
                </div>
            </div>
        </>
    );
}
export default ProductCard;
