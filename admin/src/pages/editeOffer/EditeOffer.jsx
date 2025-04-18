import React, { useEffect, useState } from 'react';
import './editeOffer.css'
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOffersById } from '../../RTK/offers/getOffersByIdSlice';
import { Col, Row } from 'react-bootstrap';
import { patchOffersBuId } from '../../RTK/offers/patchOffersBuIdSlice';
import AddProductToOffer from '../../allExtensions/addProductToOffer/AddProductToOffer';
import { stateOfferById } from '../../RTK/offers/stateOfferByIdSlice';
import { deleteProductfromOfferById } from '../../RTK/offers/deleteProductfromOfferByIdSlice';
import ErrorMessage from '../../allExtensions/errorMessage/ErrorMessage';
import { Toaster } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import DeleteOfferModel from '../../allExtensions/deleteOfferModel/DeleteOfferModel';
import Cookies from 'universal-cookie';


const EditeOffer = () => {
    //////////////////////////////
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
    const id = useParams().MyOffersId
    const offer = useSelector(state => state.getOffersById)?.data
    let startImage = `${offer.mainImage}`
    let startName = offer?.name
    let startNameAr = offer?.nameAr
    /////////////////////////////
    const [imageSquer, setImageSquer] = useState([]);
    const [image, setImage] = useState([]);
    const [name, setName] = useState(' ');
    const [nameAr, setNameAr] = useState(' ');
    const [discount, setDiscount] = useState(0);
    const [oldePrice, setOldePrice] = useState(0);
    const [newPrice, setNewPrice] = useState(0);
    const [description, setDescription] = useState(" ")
    const [descriptionAr, setDescriptionAr] = useState(" ")
    const [validated1, setValidated1] = useState(false);
    const [validated2, setValidated2] = useState(false);
    const [validated3, setValidated3] = useState(false);
    const [validated4, setValidated4] = useState(false);
    const [validated5, setValidated5] = useState(false);
    const [validated6, setValidated6] = useState(false);
    const [validated7, setValidated7] = useState(false);
    const [openModel1, setOpenModel1] = useState(false);
    const [reload, setReload] = useState(true);
    ///////////////////////////
    const dispatch = useDispatch()
    ///////////////////////////
    const imag2OnChange = (event) => {
        setImage(event.target.files[0])
        setImageSquer(URL.createObjectURL(event.target.files[0]))
    }
    ///////////////////////////
    const handleState = () => {
        if (offer?.products?.length != 0) {
            dispatch(stateOfferById(id))
            setTimeout(() => {
                setReload(!reload)
            }, 1000);
        }
        else {
            setOpenModel1(true)
        }
    }
    ///////////////////////////
    const handleClose = () => {
        setTimeout(() => {
            setOpenModel1(false)
        }, 1000);
    }
    ///////////////////////////
    const handelReload = () => {
        setTimeout(() => {
            setReload(!reload)
        }, 1000);
    }
    ///////////////////////////
    const handleSubmit1 = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setValidated1(true);
        }
        else {
            const formData = new FormData();
            formData.append('mainImage', image);
            const value = {
                reqobj: formData,
                id: id
            }
            dispatch(patchOffersBuId(value))
            setTimeout(() => {
                setReload(!reload)
            }, 1000);
        }
    };
    ///////////////////////////
    const handleSubmit2 = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setValidated2(true);
        }
        else {
            const formData = new FormData();
            formData.append('name', name);
            const value = {
                reqobj: formData,
                id: id
            }
            dispatch(patchOffersBuId(value))
            setTimeout(() => {
                setReload(!reload)
            }, 1000);
        }
    };
    ///////////////////////////
    const handleSubmit6 = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setValidated6(true);
        }
        else {
            const formData = new FormData();
            formData.append('nameAr', nameAr);
            const value = {
                reqobj: formData,
                id: id
            }
            dispatch(patchOffersBuId(value))
            setTimeout(() => {
                setReload(!reload)
            }, 1000);
        }
    };
    ///////////////////////////
    const handleSubmit3 = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setValidated3(true);
        }
        else {
            const formData = new FormData();
            formData.append('discount', discount);

            const value = {
                reqobj: formData,
                id: id
            }
            dispatch(patchOffersBuId(value))
            setTimeout(() => {
                setReload(!reload)
            }, 1000);
        }
    };
    ///////////////////////////
    const handleSubmit4 = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setValidated4(true);
        }
        else {
            const formData = new FormData();
            formData.append('description', description);

            const value = {
                reqobj: formData,
                id: id
            }
            dispatch(patchOffersBuId(value))
            setTimeout(() => {
                setReload(!reload)
            }, 1000);
        }
    };
    ///////////////////////////
    const handleSubmit7 = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setValidated7(true);
        }
        else {
            const formData = new FormData();
            formData.append('descriptionAr', descriptionAr);
            const value = {
                reqobj: formData,
                id: id
            }
            dispatch(patchOffersBuId(value))
            setTimeout(() => {
                setReload(!reload)
            }, 1000);
        }
    };
    ///////////////////////////
    const handleSubmit5 = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setValidated5(true);
        }
        else {
            const formData = new FormData();
            formData.append('priceB', oldePrice);
            formData.append('priceA', newPrice);
            const value = {
                reqobj: formData,
                id: id
            }
            dispatch(patchOffersBuId(value))
            setTimeout(() => {
                setReload(!reload)
            }, 1000);
        }
    };
    ///////////////////////////
    const handelDeleteProduct = (productId) => {
        const value = {
            productId: productId,
            offerId: id
        }
        dispatch(deleteProductfromOfferById(value))
        setTimeout(() => {
            setReload(!reload)
        }, 1000);
    }
    ///////////////////////////
    useEffect(() => {
        dispatch(getOffersById(id))
    }, [dispatch, id, reload])
    //////////////////////////////
    useEffect(
        function () {
            document.title = `SUNFLOWER - ${offer?.name}`;
            return function () { document.title = 'SUNFLOWER' };
        }, [offer?.name])
    ////////////////////////////////////
    const { t } = useTranslation();
    return (
        <>
            <Toaster />
            {openModel1 &&
                <ErrorMessage
                    handleClose={handleClose}
                    handelReload={handelReload}
                    messageTitle={t('public.error')}
                    message={t('editOffer.message1')}
                />
            }
            <div className='editeOffers'>
                <div className='title'>
                    {lng == "ar" ? startNameAr : startName}
                </div>
                <div className='editeContener'>
                    <div className='newOffer'>
                        <div className='editeOffer'>
                            <div className='activeTitel'>
                                {t('editOffer.thisOfferIs')} {offer?.isActive ? `${t('public.active')}` : `${t('public.notActive')}`}
                            </div>
                            <div className='onOff'>
                                <button type='submit' className='formButton' style={{ width: "100%", margin: "0px" }} onClick={handleState}> {offer?.isActive ? `${t('public.disable')}` : `${t('public.enable')}`}</button>
                                <DeleteOfferModel
                                    handelReload={handelReload}
                                    id={id}
                                />
                            </div>
                            <hr className='tapp' />
                            <Form noValidate validated={validated1} onSubmit={handleSubmit1} className='addCategory1'>
                                <Form.Group className="mb-3" controlId="validationCustom01">
                                    <Form.Label>  {t('editOffer.editOfferImage')}</Form.Label>
                                    <div className='rowEdit'>
                                        <div className='addCategory1'>
                                            <Form.Control
                                                required
                                                type="file"
                                                onChange={imag2OnChange}
                                            />
                                        </div>
                                        <button type="submit" className='editInfo'  >
                                            <svg className='svgEdit' xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 24 24" ><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.946 3.173c.587-.587.88-.88 1.206-1.021c.469-.203 1-.203 1.469 0c.325.14.619.434 1.206 1.021s.88.881 1.021 1.206c.203.469.203 1 0 1.469c-.14.325-.434.619-1.021 1.206l-5.022 5.022c-1.237 1.237-1.855 1.855-2.63 2.222s-1.646.452-3.387.624L9 15l.078-.788c.172-1.741.257-2.612.624-3.387s.985-1.393 2.222-2.63zM6 15H3.75a1.75 1.75 0 1 0 0 3.5h9.5a1.75 1.75 0 1 1 0 3.5H11" color="currentColor"></path></svg>
                                        </button>
                                    </div>
                                </Form.Group>
                            </Form>
                            <Form noValidate validated={validated6} onSubmit={handleSubmit6} className='addCategory1'>
                                <Form.Group className="mb-3" controlId="validationCustom01">
                                    <Form.Label> {t('editOffer.editOfferNameAr')}</Form.Label>
                                    <div className='rowEdit'>
                                        <div className='addCategory1'>
                                            <Form.Control
                                                type="string"
                                                placeholder={offer?.nameAr}
                                                required
                                                onChange={(e) => setNameAr(e.target.value)}
                                            />
                                        </div>
                                        <button type="submit" className='editInfo'  >
                                            <svg className='svgEdit' xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 24 24" ><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.946 3.173c.587-.587.88-.88 1.206-1.021c.469-.203 1-.203 1.469 0c.325.14.619.434 1.206 1.021s.88.881 1.021 1.206c.203.469.203 1 0 1.469c-.14.325-.434.619-1.021 1.206l-5.022 5.022c-1.237 1.237-1.855 1.855-2.63 2.222s-1.646.452-3.387.624L9 15l.078-.788c.172-1.741.257-2.612.624-3.387s.985-1.393 2.222-2.63zM6 15H3.75a1.75 1.75 0 1 0 0 3.5h9.5a1.75 1.75 0 1 1 0 3.5H11" color="currentColor"></path></svg>
                                        </button>
                                    </div>
                                </Form.Group>
                            </Form>
                            <Form noValidate validated={validated2} onSubmit={handleSubmit2} className='addCategory1'>
                                <Form.Group className="mb-3" controlId="validationCustom01">
                                    <Form.Label> {t('editOffer.editOfferNameEn')}</Form.Label>
                                    <div className='rowEdit'>
                                        <div className='addCategory1'>
                                            <Form.Control
                                                type="string"
                                                placeholder={offer?.name}
                                                required
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                        </div>
                                        <button type="submit" className='editInfo'  >
                                            <svg className='svgEdit' xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 24 24" ><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.946 3.173c.587-.587.88-.88 1.206-1.021c.469-.203 1-.203 1.469 0c.325.14.619.434 1.206 1.021s.88.881 1.021 1.206c.203.469.203 1 0 1.469c-.14.325-.434.619-1.021 1.206l-5.022 5.022c-1.237 1.237-1.855 1.855-2.63 2.222s-1.646.452-3.387.624L9 15l.078-.788c.172-1.741.257-2.612.624-3.387s.985-1.393 2.222-2.63zM6 15H3.75a1.75 1.75 0 1 0 0 3.5h9.5a1.75 1.75 0 1 1 0 3.5H11" color="currentColor"></path></svg>
                                        </button>
                                    </div>
                                </Form.Group>
                            </Form>
                            <Form noValidate validated={validated3} onSubmit={handleSubmit3} className='addCategory1'>
                                <Form.Group className="mb-3" controlId="validationCustom01">
                                    <Form.Label>{t('editOffer.editOfferDiscount')}</Form.Label>
                                    <div className='rowEdit'>
                                        <div className='addCategory1'>
                                            <Form.Control
                                                type="number"
                                                placeholder={`${offer?.discount}%`}
                                                required
                                                onChange={(e) => setDiscount(e.target.value)}
                                            />
                                        </div>
                                        <button type="submit" className='editInfo'  >
                                            <svg className='svgEdit' xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 24 24" ><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.946 3.173c.587-.587.88-.88 1.206-1.021c.469-.203 1-.203 1.469 0c.325.14.619.434 1.206 1.021s.88.881 1.021 1.206c.203.469.203 1 0 1.469c-.14.325-.434.619-1.021 1.206l-5.022 5.022c-1.237 1.237-1.855 1.855-2.63 2.222s-1.646.452-3.387.624L9 15l.078-.788c.172-1.741.257-2.612.624-3.387s.985-1.393 2.222-2.63zM6 15H3.75a1.75 1.75 0 1 0 0 3.5h9.5a1.75 1.75 0 1 1 0 3.5H11" color="currentColor"></path></svg>
                                        </button>
                                    </div>
                                </Form.Group>
                            </Form>
                            <Form noValidate validated={validated7} onSubmit={handleSubmit7} className='addCategory1'>
                                <Form.Group className="mb-3" controlId="validationCustom01">
                                    <Form.Label>{t('editOffer.editOfferDescriptionAr')}</Form.Label>
                                    <div className='rowEdit'>
                                        <div className='addCategory1'>
                                            <Form.Control
                                                className='textarea2'
                                                as="textarea"
                                                type="text"
                                                placeholder={offer?.descriptionAr}
                                                required
                                                onChange={(e) => setDescriptionAr(e.target.value)}
                                            />
                                        </div>
                                        <button type="submit" className='editInfo'  >
                                            <svg className='svgEdit' xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 24 24" ><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.946 3.173c.587-.587.88-.88 1.206-1.021c.469-.203 1-.203 1.469 0c.325.14.619.434 1.206 1.021s.88.881 1.021 1.206c.203.469.203 1 0 1.469c-.14.325-.434.619-1.021 1.206l-5.022 5.022c-1.237 1.237-1.855 1.855-2.63 2.222s-1.646.452-3.387.624L9 15l.078-.788c.172-1.741.257-2.612.624-3.387s.985-1.393 2.222-2.63zM6 15H3.75a1.75 1.75 0 1 0 0 3.5h9.5a1.75 1.75 0 1 1 0 3.5H11" color="currentColor"></path></svg>
                                        </button>
                                    </div>
                                </Form.Group>
                            </Form>
                            <Form noValidate validated={validated4} onSubmit={handleSubmit4} className='addCategory1'>
                                <Form.Group className="mb-3" controlId="validationCustom01">
                                    <Form.Label>{t('editOffer.editOfferDescriptionEn')}</Form.Label>
                                    <div className='rowEdit'>
                                        <div className='addCategory1'>
                                            <Form.Control
                                                className='textarea2'
                                                as="textarea"
                                                type="text"
                                                placeholder={offer?.description}
                                                required
                                                onChange={(e) => setDescription(e.target.value)}
                                            />
                                        </div>
                                        <button type="submit" className='editInfo'  >
                                            <svg className='svgEdit' xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 24 24" ><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.946 3.173c.587-.587.88-.88 1.206-1.021c.469-.203 1-.203 1.469 0c.325.14.619.434 1.206 1.021s.88.881 1.021 1.206c.203.469.203 1 0 1.469c-.14.325-.434.619-1.021 1.206l-5.022 5.022c-1.237 1.237-1.855 1.855-2.63 2.222s-1.646.452-3.387.624L9 15l.078-.788c.172-1.741.257-2.612.624-3.387s.985-1.393 2.222-2.63zM6 15H3.75a1.75 1.75 0 1 0 0 3.5h9.5a1.75 1.75 0 1 1 0 3.5H11" color="currentColor"></path></svg>
                                        </button>
                                    </div>
                                </Form.Group>
                            </Form>
                            <Form noValidate validated={validated5} onSubmit={handleSubmit5} className='addCategory1'>
                                <Row>
                                    <Form.Group as={Col} className="mb-3" controlId="validationCustom01">
                                        <Form.Label>{t('editOffer.editOldPrice')}</Form.Label>
                                        <Form.Control
                                            type="number"
                                            placeholder={`${offer?.priceB}.${t("public.sar")}`}
                                            required
                                            onChange={(e) => setOldePrice(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Form.Group as={Col} className="mb-3" controlId="validationCustom01">
                                        <Form.Label>{t('editOffer.editNewPrice')}</Form.Label>
                                        <div className='rowEdit'>
                                            <div className='addCategory1'>
                                                <Form.Control
                                                    type="number"
                                                    placeholder={`${offer?.priceA}.${t("public.sar")}`}
                                                    required
                                                    onChange={(e) => setNewPrice(e.target.value)}
                                                />
                                            </div>
                                            <button as={Col} type="submit" className='editInfo'  >
                                                <svg className='svgEdit' xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 24 24" ><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.946 3.173c.587-.587.88-.88 1.206-1.021c.469-.203 1-.203 1.469 0c.325.14.619.434 1.206 1.021s.88.881 1.021 1.206c.203.469.203 1 0 1.469c-.14.325-.434.619-1.021 1.206l-5.022 5.022c-1.237 1.237-1.855 1.855-2.63 2.222s-1.646.452-3.387.624L9 15l.078-.788c.172-1.741.257-2.612.624-3.387s.985-1.393 2.222-2.63zM6 15H3.75a1.75 1.75 0 1 0 0 3.5h9.5a1.75 1.75 0 1 1 0 3.5H11" color="currentColor"></path></svg>
                                            </button>
                                        </div>
                                    </Form.Group>
                                </Row>
                            </Form>
                        </div>
                        <div className='disblayOffer'>
                            <div className='newImageOffer'>
                                <img className='imageCat' src={imageSquer == "" ? offer?.mainImage : imageSquer} alt="" />
                            </div>
                            <div className='editOfferInfo'>
                                <div className='divInfo'> {t('editOffer.name')} : {name == " " ? lng == "ar" ? offer?.nameAr : offer?.name : lng == "ar" ? nameAr : name}   </div>
                                <hr className='tapp' />
                                <div className='divInfo'> {t('editOffer.discount')} : {" "} {discount == " " ? offer?.discount : discount}%   </div>
                                <hr className='tapp' />
                                <div className='divPrice'>
                                    <div className='oldPrice'>  {oldePrice == " " ? offer?.priceB : oldePrice}.{t("public.sar")} </div>
                                    <svg style={{ transform: "rotate(92deg)", color: "#f1c92f" }}
                                        xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" ><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.3} d="M4.483 10.895c-.43 0-.645-.545-.34-.863l7.516-6.884a.467.467 0 0 1 .682 0l7.517 6.884c.304.318.088.863-.341.863H15.68a.495.495 0 0 0-.483.506v9.093c0 .28-.216.506-.482.506H9.284a.494.494 0 0 1-.482-.506v-9.093a.495.495 0 0 0-.483-.506z"></path></svg>
                                    {newPrice == " " ? offer?.priceA : newPrice}.{t("public.sar")}
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
                <AddProductToOffer
                    handelReload={handelReload}
                    offerId={id}
                />
                <div className='supTitle'>
                    <div >
                        {t('editOffer.supTitle')}
                    </div>
                    {lng == "ar" ? startNameAr : startName}
                </div>
                <div className='produtsByOffer'>
                    {offer?.products?.length == 0 &&
                        <div className='noProducts' >
                            <b> {t('editOffer.noProducts1')} {" "}
                                <svg xmlns="http://www.w3.org/2000/svg" width={25} height={25} viewBox="0 0 36 36" ><path fill="#ffcb4c" d="M36 18c0 9.941-8.059 18-18 18c-9.94 0-18-8.059-18-18C0 8.06 8.06 0 18 0c9.941 0 18 8.06 18 18"></path><ellipse cx={12.176} cy={14.71} fill="#65471b" rx={2.647} ry={3.706}></ellipse><circle cx={24.882} cy={14.294} r={6.882} fill="#f4f7f9"></circle><path fill="#65471b" d="M14.825 9.946c-.322 0-.64-.146-.848-.423c-.991-1.321-2.028-2.029-3.083-2.104c-1.39-.095-2.523.947-2.734 1.158A1.057 1.057 0 1 1 6.663 7.08c.457-.457 2.129-1.936 4.381-1.773c1.695.12 3.251 1.111 4.627 2.945a1.059 1.059 0 0 1-.846 1.694"></path><path fill="#292f33" d="M32.824 36a1.059 1.059 0 0 1-1.059-1.059V14.824a1.059 1.059 0 1 1 2.118 0v20.118A1.06 1.06 0 0 1 32.824 36"></path><path fill="#67757f" d="M32.824 12.706c-.054 0-.105.012-.158.016c-.732-3.628-3.943-6.369-7.784-6.369c-4.379 0-7.941 3.562-7.941 7.941s3.562 7.941 7.941 7.941c3.468 0 6.416-2.238 7.496-5.343a2.118 2.118 0 1 0 .446-4.186m-7.942 7.412c-3.211 0-5.823-2.612-5.823-5.824s2.613-5.824 5.823-5.824c3.211 0 5.824 2.612 5.824 5.824s-2.613 5.824-5.824 5.824"></path><path fill="#65471b" d="M21.175 28.588c-.159 0-.321-.036-.473-.112c-1.819-.91-3.587-.91-5.406 0a1.059 1.059 0 1 1-.947-1.895c2.421-1.21 4.877-1.21 7.3 0a1.06 1.06 0 0 1-.474 2.007"></path><path fill="#bdddf4" d="M28.049 9.411a5.788 5.788 0 0 0-3.167-.94a5.824 5.824 0 0 0-5.824 5.824c0 1.169.348 2.255.94 3.167zm-5.652 10.144a5.794 5.794 0 0 0 2.485.563a5.824 5.824 0 0 0 5.824-5.824c0-.89-.206-1.731-.563-2.485z"></path></svg>
                                ! </b>
                            <br />
                            <b>
                                {t('editOffer.noProducts2')}
                                <svg className='aboveHand' xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 36 36" ><path fill="#ffdc5d" d="M30 20.145s.094-2.362-1.791-3.068c-1.667-.625-2.309.622-2.309.622s.059-1.913-1.941-2.622c-1.885-.667-2.75.959-2.75.959s-.307-1.872-2.292-2.417C17.246 13.159 16 14.785 16 14.785V2.576C16 1.618 15.458.001 13.458 0S11 1.66 11 2.576v20.5c0 1-1 1-1 0V20.41c0-3.792-2.037-6.142-2.75-6.792c-.713-.65-1.667-.98-2.82-.734c-1.956.416-1.529 1.92-.974 3.197c1.336 3.078 2.253 7.464 2.533 9.538c.79 5.858 5.808 10.375 11.883 10.381c6.626.004 12.123-5.298 12.128-11.924z"></path></svg>
                            </b>
                        </div>}
                    {offer?.products?.map((product, index) => (
                        <div className='offerPro'
                            key={index}>
                            <div className='arrayImg'>
                                <img className='imageCat' src={product?.image} alt="" />
                            </div>
                            <div className='arrayName'> {lng == "ar" ? product?.nameAr : product?.name} </div>
                            <div className='arrayDesc'> {lng == "ar" ? product?.descriptionAr : product?.description}  </div>
                            <button className='formButton' style={{ width: "100%" }}
                                onClick={() => handelDeleteProduct(product?._id)}
                            >
                                {t('public.delete')}</button>
                        </div>
                    ))}
                </div>
            </div >
        </>
    )
}

export default EditeOffer;
