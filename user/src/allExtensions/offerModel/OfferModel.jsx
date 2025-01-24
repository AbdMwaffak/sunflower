import { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './offersMpdel.css'
import { useDispatch } from 'react-redux';
import { addOfferToCart } from '../../RTK/shoppingCart/addOfferToCartSlice';
import { useTranslation } from 'react-i18next';
import Cookies from 'universal-cookie';
import { colgroup } from 'framer-motion/client';

function OfferModel(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    ///////////////////////////
    const dispatch = useDispatch()
    const handleAdd = () => {
        dispatch(addOfferToCart({ offerId: props?.id }))
        setShow(false)
        props.numCounter()
    }
    ////////////////////////////////////
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
    const { t } = useTranslation();
    return (
        <>
            <button className='getIt' onClick={handleShow} > {t('offers.getIt')}   </button>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title>GET OFFER</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='offerModel'>
                        <div className='offerModel2'>
                            <div className='offerInfo'>
                                <div className='offerTitle'>
                                    {props?.name}
                                </div>
                                <div className='offerDescription'>
                                    {props?.description}
                                </div>
                                <div className='offerDisPrice'>
                                    {t('offers.discount')}   : {props?.discount}%
                                </div>
                                <div className='offerPrice2'>
                                    <div className='prevPrice '>
                                        {t('offers.previousPrice')} :
                                        <div className="lineThrough">  {props?.priceB} </div>
                                    </div>
                                    <div className='currPrice '>
                                        {t('offers.currentPrice')}    :
                                        <div>  {props?.priceA} </div>
                                    </div>
                                </div>
                            </div>
                            <div className='mainImageOffer'>
                                <img className='allImage' src={props.mainImage} />
                            </div>
                        </div>
                        <hr className='hrCart' />
                        <h5>      {t('offers.offerproducts')} </h5>
                        <hr className='hrCart' />
                        <div className='produtsByOffer'>
                            {props?.products?.map((product, index) => (
                                <div className='offerPro'
                                    key={index}>
                                    <div className='arrayImg'>
                                        <img className='allImage' src={product?.image} alt="" />
                                    </div>
                                    <div className='arrayName'>   {lng == "ar" ? product?.nameAr : product?.name}</div>
                                    <div className='arrayDesc'> {lng == "ar" ? product?.descriptionAr : product?.description} </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer id='modal-footer' >
                    <div className='buttonDiv'>
                        <button className='formButton' onClick={handleAdd}> {t('offers.addtoCart')}</button>
                    </div>
                </Modal.Footer>
            </Modal >
        </>
    );
}
export default OfferModel;