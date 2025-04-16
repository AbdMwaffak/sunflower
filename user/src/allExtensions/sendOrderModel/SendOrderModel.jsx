import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { getMe } from '../../RTK/Auth/getMeSlice';
import { Form } from 'react-bootstrap';
import { getAllcities } from '../../RTK/settings/getAllcitiesSlice';
import { back, postOrder } from '../../RTK/shoppingCart/postOrderSlice';
import { useTranslation } from 'react-i18next';
import Cookies from 'universal-cookie';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import './sendOrderModel.css'

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
    const { data, status, error } = useSelector((state) => state.postOrder);
    ////////////////////////
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false),
            setValidated(false),
            dispatch(back()),
            // props?.handelreload()
            props?.handelClear()
    }
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
        }
    };
    /////////////////////////
    useEffect(() => {
        dispatch(getMe())
        dispatch(getAllcities())
    }, [dispatch])
    /////////////////////////
    useEffect(() => {
        if (status == "success") {
            setTimeout(() => {
                handleClose()
            }, 4000);
            // props?.handelreload()
        }
    }, [dispatch, status])
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
                    {error && <p className='err' style={{ color: 'red' }}>{error}</p>}


                    {/* <div className='formBody' style={{ alignItems: "center" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width={50} height={50} viewBox="0 0 24 24" ><circle cx={4} cy={12} r={3} fill="currentColor"><animate id="svgSpinners3DotsBounce0" attributeName="cy" begin="0;svgSpinners3DotsBounce1.end+0.25s" calcMode="spline" dur="0.6s" keySplines=".33,.66,.66,1;.33,0,.66,.33" values="12;6;12"></animate></circle><circle cx={12} cy={12} r={3} fill="currentColor"><animate attributeName="cy" begin="svgSpinners3DotsBounce0.begin+0.1s" calcMode="spline" dur="0.6s" keySplines=".33,.66,.66,1;.33,0,.66,.33" values="12;6;12"></animate></circle><circle cx={20} cy={12} r={3} fill="currentColor"><animate id="svgSpinners3DotsBounce1" attributeName="cy" begin="svgSpinners3DotsBounce0.begin+0.2s" calcMode="spline" dur="0.6s" keySplines=".33,.66,.66,1;.33,0,.66,.33" values="12;6;12"></animate></circle></svg>
                    </div> : */}
                    <div className='formBody'>
                        {status == "failed" &&
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
                                <Form.Group className="mb-3" controlId="form2" style={{ width: "100%" }}>
                                    <Form.Label >
                                        {t('cart.RecipientPhone')}
                                    </Form.Label>
                                    <PhoneInput
                                        country={'sa'}
                                        required
                                        onChange={(value, country, event, formattedValue) => {
                                            setPhone(formattedValue);
                                        }}
                                        inputStyle={{
                                            width: '100%',
                                        }}
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
                                    <button type="submit" className='loginBT'  > {t('cart.send')}
                                    </button>
                                </Modal.Footer>
                            </Form>}

                        {status == "loading" &&
                            <div className='sendLoding'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="75" height="75" viewBox="0 0 24 24"><rect width="10" height="10" x="1" y="1" fill="currentColor" rx="1"><animate id="svgSpinnersBlocksShuffle30" fill="freeze" attributeName="x" begin="0;svgSpinnersBlocksShuffle3b.end" dur="0.2s" values="1;13" /><animate id="svgSpinnersBlocksShuffle31" fill="freeze" attributeName="y" begin="svgSpinnersBlocksShuffle38.end" dur="0.2s" values="1;13" /><animate id="svgSpinnersBlocksShuffle32" fill="freeze" attributeName="x" begin="svgSpinnersBlocksShuffle39.end" dur="0.2s" values="13;1" /><animate id="svgSpinnersBlocksShuffle33" fill="freeze" attributeName="y" begin="svgSpinnersBlocksShuffle3a.end" dur="0.2s" values="13;1" /></rect><rect width="10" height="10" x="1" y="13" fill="currentColor" rx="1"><animate id="svgSpinnersBlocksShuffle34" fill="freeze" attributeName="y" begin="svgSpinnersBlocksShuffle30.end" dur="0.2s" values="13;1" /><animate id="svgSpinnersBlocksShuffle35" fill="freeze" attributeName="x" begin="svgSpinnersBlocksShuffle31.end" dur="0.2s" values="1;13" /><animate id="svgSpinnersBlocksShuffle36" fill="freeze" attributeName="y" begin="svgSpinnersBlocksShuffle32.end" dur="0.2s" values="1;13" /><animate id="svgSpinnersBlocksShuffle37" fill="freeze" attributeName="x" begin="svgSpinnersBlocksShuffle33.end" dur="0.2s" values="13;1" /></rect><rect width="10" height="10" x="13" y="13" fill="currentColor" rx="1"><animate id="svgSpinnersBlocksShuffle38" fill="freeze" attributeName="x" begin="svgSpinnersBlocksShuffle34.end" dur="0.2s" values="13;1" /><animate id="svgSpinnersBlocksShuffle39" fill="freeze" attributeName="y" begin="svgSpinnersBlocksShuffle35.end" dur="0.2s" values="13;1" /><animate id="svgSpinnersBlocksShuffle3a" fill="freeze" attributeName="x" begin="svgSpinnersBlocksShuffle36.end" dur="0.2s" values="1;13" /><animate id="svgSpinnersBlocksShuffle3b" fill="freeze" attributeName="y" begin="svgSpinnersBlocksShuffle37.end" dur="0.2s" values="1;13" /></rect></svg>
                                <h4 style={{ color: "#151520" }}>
                                    {t('cart.sendingOrder')}
                                </h4>
                            </div>
                        }
                        {status == "success" &&
                            <div className='sendLoding'>
                                <svg xmlns="http://www.w3.org/2000/svg" width={75} height={75} viewBox="0 0 24 24" ><mask id="lineMdCheckAll0"><g fill="none" stroke="#fff" strokeDasharray={24} strokeDashoffset={24} strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}><path d="M2 13.5l4 4l10.75 -10.75"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.4s" values="24;0"></animate></path><path stroke="#000" strokeWidth={6} d="M7.5 13.5l4 4l10.75 -10.75"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.4s" dur="0.4s" values="24;0"></animate></path><path d="M7.5 13.5l4 4l10.75 -10.75"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.4s" dur="0.4s" values="24;0"></animate></path></g></mask><rect width={24} height={24} fill="currentColor" mask="url(#lineMdCheckAll0)"></rect></svg>
                                <h4 style={{ color: "#151520", textAlign: "center" }}>
                                    {t('cart.success1')}
                                    {t('cart.success2')}
                                </h4>
                            </div>
                        }

                    </div>
                </Modal.Body>

            </Modal>
        </>
    );
}
export default SendOrderModel;