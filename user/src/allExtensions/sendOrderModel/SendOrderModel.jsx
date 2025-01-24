import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { getMe } from '../../RTK/Auth/getMeSlice';
import './sendOrderModel.css'
import { Form } from 'react-bootstrap';
import { getAllcities } from '../../RTK/settings/getAllcitiesSlice';
import { postOrder } from '../../RTK/shoppingCart/postOrderSlice';
import { useTranslation } from 'react-i18next';
import Cookies from 'universal-cookie';
function SendOrderModel(props) {
    const cookies = new Cookies();
    let lng = ''
    let token = ''
    if (cookies.get('token') !== undefined || null) {
        token = true
    } else token = false
    if (cookies.get('i18next') === "ar") {
        lng = "ar"
    } else lng = "en"
    /////////////////////////
    const me = useSelector(state => state.getMe)?.data
    const cities = useSelector(state => state.getAllcities)?.data
    ////////////////////////
    const [show, setShow] = useState(false);
    const handleClose = () => { setShow(false), setValidated(false) }
    const handleShow = () => setShow(true);

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [city, setCity] = useState("");
    const [addressDetails, setAddressDetails] = useState("");
    const [notes, setNotes] = useState("");

    const [validated, setValidated] = useState(false);
    /////////////////////////
    const dispatch = useDispatch()
    const handleSubmit = (e) => {
        const form = e.currentTarget;
        e.preventDefault();
        e.stopPropagation();
        if (form.checkValidity() === false) {
            setValidated(true);
        }
        else {
            setValidated(true);
            const value = {
                neighborhood: "String",
                paymentMethod: "String",
                userId: me.id,
                name: name,
                phone: phone,
                city: city,
                addressDetails: addressDetails,
                notes: notes,
                cart: props.cart
            }
            dispatch(postOrder(value))
            props?.handelReload()
            props?.handelClear()
            handleClose()
        }
    };
    /////////////////////////
    useEffect(() => {
        dispatch(getMe())
        dispatch(getAllcities())
    }, [dispatch])
    ////////////////////////////////////
    const { t } = useTranslation();
    return (
        <>
            <div className='formButton' onClick={handleShow}  >
                {t('cart.sendorder')}
            </div>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>ORDER </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='formBody'>
                        <Form noValidate validated={validated} onSubmit={handleSubmit} >
                            <Form.Group className="mb-3" controlId="form1">
                                <Form.Label >  {t('cart.RecipientName')} </Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="....."
                                    required
                                    onChange={(e) => setName(e.target.value)}
                                />

                            </Form.Group>
                            {/* //////////// */}
                            <Form.Group className="mb-3" controlId="form2">
                                <Form.Label >
                                    {t('cart.RecipientPhone')}
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="....."
                                    required
                                    onChange={(e) => setPhone(e.target.value)}
                                />

                            </Form.Group>
                            {/* //////////// */}
                            <Form.Group className="mb-3" controlId="form3">
                                <Form.Label>
                                    {t('cart.city')}
                                </Form.Label>
                                <Form.Select className='input4' aria-label="Default select example"
                                    required
                                    onChange={(e) => setCity(e.target.value)} >
                                    <option value={""}>{t('cart.open')}</option>
                                    {cities?.filter(cities => {
                                        if (cities.isActive == true) { return cities; }
                                    }).map((city, index) => (
                                        <option key={index} value={city.name}> {lng == "ar" ? city.nameAr : city.name} </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                            {/* //////////// */}
                            <Form.Group className="mb-3" controlId="form2">
                                <Form.Label>
                                    {t('cart.adressDetails')}
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="....."
                                    required
                                    onChange={(e) => (setAddressDetails(e.target.value))}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="form1">
                                <Form.Label >
                                    {t('cart.notes')}
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="....."
                                    onChange={(e) => setNotes(e.target.value)}
                                />

                            </Form.Group>
                            <Modal.Footer id='modal-footer' >
                                <button type="submit" className='loginBT'  > {t('cart.send')}  </button>
                            </Modal.Footer>
                        </Form>
                    </div>
                </Modal.Body>

            </Modal>
        </>
    );
}
export default SendOrderModel;