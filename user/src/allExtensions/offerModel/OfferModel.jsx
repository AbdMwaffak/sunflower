import { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './offersMpdel.css'
import { useDispatch } from 'react-redux';
import { addOfferToCart } from '../../RTK/shoppingCart/addOfferToCartSlice';

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
    ///////////////////////////
    return (
        <>
            <button className='getIt' onClick={handleShow} >  Get it  </button>
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
                                    Discount : {props?.discount}%
                                </div>
                                <div className='offerPrice2'>
                                    <div className='prevPrice '>
                                        Previous price :
                                        <div className="lineThrough">  {props?.priceB} </div>
                                    </div>
                                    <div className='currPrice '>
                                        Current price :
                                        <div>  {props?.priceA} </div>
                                    </div>
                                </div>
                            </div>
                            <div className='mainImageOffer'>
                                <img className='imageCat' src={props.mainImage} />
                            </div>
                        </div>
                        <hr className='hrCart' />
                        Offer products
                        <hr className='hrCart' />
                        <div className='produtsByOffer'>
                            {props?.products?.map((product, index) => (
                                <div className='offerPro'
                                    key={index}>
                                    <div className='arrayImg'>
                                        <img className='imageCat' src={product?.image} alt="" />
                                    </div>
                                    <div className='arrayName'>  {product?.name}</div>
                                    <div className='arrayDesc'>{product?.description} </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className='addToCart' onClick={handleAdd}>add to cart</button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default OfferModel;