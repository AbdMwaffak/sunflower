import React, { useEffect, useState } from 'react';
import './myNaturalFlower.css'
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { postBouquet } from '../../RTK/naturalFlowers/postBouquetSlice';
import { getAllBouquets } from '../../RTK/naturalFlowers/getAllBouquetsSlice';
import { postBand } from '../../RTK/band/postBandSlice';
import { postPaper } from '../../RTK/paper/postPaperSlice';
import { getBand } from '../../RTK/band/getBandSlice';
import { getPaper } from '../../RTK/paper/getPaperSlice';
import BouquetCard from '../../allExtensions/editBouquet/BouquetCard';
import { deleteBand } from '../../RTK/band/deleteBandSlice';
import { deletePaper } from '../../RTK/paper/deletePaperSlice';
import { Toaster } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import Cookies from 'universal-cookie';

const MyNaturalFlower = () => {
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
    const allBouquets = useSelector(state => state.getAllBouquets)?.data
    const allPapers = useSelector(state => state.getPaper)?.data
    const allBands = useSelector(state => state.getBand)?.data
    const addState = useSelector(state => state.postBouquet)
    ///////////////////////////////
    const [imageSquer, setImageSquer] = useState([]);
    const [image, setImage] = useState([]);
    const [num, setNum] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [descriptionAr, setDescriptionAr] = useState('');
    const [colorBand, setColorBand] = useState('null');
    const [bandColorsDiv, setBandColorsDiv] = useState('');
    const [colorPaper, setColorPaper] = useState('null');
    const [paperColorsDiv, setPaperColorsDiv] = useState('');
    const [stateMessage, setStateMessage] = useState(false);
    const [validated, setValidated] = useState(false);
    const [reload, setReload] = useState(true);
    ///////////////////////////////
    const dispatch = useDispatch()
    ///////////////////////////////
    const imag2OnChange = (event) => {
        setImage(event.target.files[0])
        setImageSquer(URL.createObjectURL(event.target.files[0]))
    }
    ///////////////////////////////
    const reloadHandel = () => {
        setTimeout(() => {
            setReload(!reload)
        }, 1000);
    }
    ///////////////////////////////
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
        const formData = new FormData();
        formData.append('image', image);
        formData.append('count', num);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('descriptionAr', descriptionAr);
        dispatch(postBouquet(formData))
        setTimeout(() => {
            setReload(!reload)
        }, 1000);
        setStateMessage(true)
    };
    ///////////////////////////////
    const handleDeleteBand = (id) => {
        dispatch(deleteBand(id))
        setTimeout(() => {
            setReload(!reload)
        }, 1000);
    };
    ///////////////////////////////
    const handleSubmitColorBand = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        if (colorBand === 'null') {
            event.preventDefault();
            event.stopPropagation();
        }
        else {
            const value = {
                color: colorBand
            }
            dispatch(postBand(value))
            setTimeout(() => {
                setReload(!reload)
            }, 1000);
        }
    };
    ///////////////////////////////
    const handleDeletePaper = (id) => {
        dispatch(deletePaper(id))
        setTimeout(() => {
            setReload(!reload)
        }, 1000);
    };
    ///////////////////////////////
    const handleSubmitColorPaper = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        if (colorPaper === 'null') {
            event.preventDefault();
            event.stopPropagation();
        }
        else {
            const value = {
                color: colorPaper
            }
            dispatch(postPaper(value))
            setTimeout(() => {
                setReload(!reload)
            }, 1000);
        }
    };
    ///////////////////////////////
    const handleClose = () => {
        setTimeout(() => {
            setStateMessage(false)
        }, 1000);
    }
    ///////////////////////////////
    useEffect(() => {
        dispatch(getAllBouquets())
        dispatch(getBand())
        dispatch(getPaper())
    }, [dispatch, reload])
    ///////////////////////////////
    useEffect(
        function () {
            document.title = `SUNFLOWER - My Natural Flower`;
            return function () { document.title = 'SUNFLOWER' };
        }, [])
    ////////////////////////////////////
    const { t } = useTranslation();
    return (
        <>
            <Toaster />
            <div className='myNaturalFlower'>
                <div className='title'>
                    {t('flower.title')}
                </div>
                <div className='editeContener'>
                    <div className='newNaturalFlower'>
                        <Form noValidate validated={validated} onSubmit={handleSubmit} className='addNaturalFlower'>
                            {/* <button style={{ width: "100%", margin: "0px" }} type='submit' className='formButton' onClick={handleState}> {categories?.isActive ? `${t('public.disable')}` : `${t('public.enable')}`}  </button> */}
                            <hr className='tapp' />
                            <Form.Group className="mb-3" controlId="validationCustom01">
                                <Form.Label>  {t('flower.AddBouquetImage')} </Form.Label>
                                <Form.Control
                                    required
                                    type="file"
                                    onChange={imag2OnChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="validationCustom03">
                                <Form.Label>  {t('flower.AddNumberOfFlowers')}</Form.Label>
                                <Form.Control
                                    type="number"
                                    min={1}
                                    placeholder={t("public.write")}
                                    required
                                    onChange={(e) => setNum(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="validationCustom03">
                                <Form.Label> {t('flower.AddPriceOfBouquet')}</Form.Label>
                                <Form.Control
                                    type="number"
                                    min={1}
                                    placeholder={t("public.write")}
                                    required
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="validationCustom03">
                                <Form.Label> {t('flower.AddBouquetDescriptionAr')}</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    type="string "
                                    placeholder={t("public.write")}
                                    required
                                    onChange={(e) => setDescriptionAr(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="validationCustom03">
                                <Form.Label> {t('flower.AddBouquetDescriptionEn')}</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    type="string "
                                    placeholder={t("public.write")}
                                    required
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </Form.Group>
                            <hr className='tapp' />
                            <button type="submit" className='formButton'>  {t('public.addButton')}</button>
                        </Form>
                        <div className='displayNowFlower'>
                            <div className='newImageFlower'>
                                {imageSquer.length != 0 &&
                                    <img className='imageFlower' src={imageSquer} />
                                }
                            </div>
                            <div className='newTitleFlower'>
                                <div className='info' >
                                    <div className='' >
                                        {t('flower.cuantety')} :   {num}
                                    </div>
                                    <div className='' >
                                        {t('flower.price')}  :   {price}
                                    </div>
                                </div>
                                <hr />
                                <div className=''>
                                    {description}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className='editeContener'>
                    <div className='accessories'>
                        <div className='addBand1'>
                            <Form onSubmit={handleSubmitColorBand} className='addBandForm'>

                                <Form.Group className="mb-3" controlId="validationCustom01">
                                    <Form.Label>{t('flower.colorBand')} </Form.Label>
                                    <div className='rowEdit'>
                                        <div className='addCategory1'>
                                            <Form.Control
                                                required
                                                type="color"
                                                onChange={(e) => setColorBand(e.target.value)}
                                            />
                                        </div>
                                        <div className='displayColr' style={{ backgroundColor: colorBand }} >  </div>

                                        <button type="submit" className='editInfo'  >
                                            <svg className='svgEdit' xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 24 24" ><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.946 3.173c.587-.587.88-.88 1.206-1.021c.469-.203 1-.203 1.469 0c.325.14.619.434 1.206 1.021s.88.881 1.021 1.206c.203.469.203 1 0 1.469c-.14.325-.434.619-1.021 1.206l-5.022 5.022c-1.237 1.237-1.855 1.855-2.63 2.222s-1.646.452-3.387.624L9 15l.078-.788c.172-1.741.257-2.612.624-3.387s.985-1.393 2.222-2.63zM6 15H3.75a1.75 1.75 0 1 0 0 3.5h9.5a1.75 1.75 0 1 1 0 3.5H11" color="currentColor"></path></svg>
                                        </button>
                                    </div>
                                </Form.Group>
                            </Form>
                            <div className='colorsAvailable'>
                                {t('flower.allColorsAvailable')}
                                <div className='addB' onClick={() => setBandColorsDiv(!bandColorsDiv)} style={{ display: "flex" }}>
                                    <svg className={bandColorsDiv ? "orderArrwOpen" : "orderArrwClose"}
                                        xmlns="http://www.w3.org/2000/svg" width={28} height={28} viewBox="0 0 24 24" ><g transform="rotate(-90 12 12)"><path stroke="currentColor" strokeDasharray={8} strokeDashoffset={8} strokeLinecap="round" strokeWidth={2} d="M9 12L14 7M9 12L14 17" fill="currentColor"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="8;0"></animate></path></g></svg>
                                </div>
                            </div>
                            <div className={bandColorsDiv ? "bandColor1" : "bandColor2"}>
                                {typeof allBands !== "string" &&
                                    <div className='inDiv'>
                                        {allBands?.map((band, index) => (
                                            <div className={bandColorsDiv ? "pItameOn" : "pItameOn"} key={index}>
                                                <div className="pItameColor" style={{ backgroundColor: band.color }}>
                                                </div>
                                                <button className='deleteColor'
                                                    onClick={() => handleDeleteBand(band._id)}
                                                >
                                                    {t('public.delete')}
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                }
                            </div>
                        </div>
                        <div className='addPaper1'>
                            <Form onSubmit={handleSubmitColorPaper} className='addPaperForm'>
                                <Form.Group className="mb-3" controlId="validationCustom01">
                                    <Form.Label>{t('flower.colorpaper')} </Form.Label>
                                    <div className='rowEdit'>
                                        <div className='addCategory1'>
                                            <Form.Control
                                                required
                                                type="color"
                                                onChange={(e) => setColorPaper(e.target.value)}
                                            />
                                        </div>
                                        <div className='displayColr' style={{ backgroundColor: colorPaper }} >  </div>
                                        <button type="submit" className='editInfo'  >
                                            <svg className='svgEdit' xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 24 24" ><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.946 3.173c.587-.587.88-.88 1.206-1.021c.469-.203 1-.203 1.469 0c.325.14.619.434 1.206 1.021s.88.881 1.021 1.206c.203.469.203 1 0 1.469c-.14.325-.434.619-1.021 1.206l-5.022 5.022c-1.237 1.237-1.855 1.855-2.63 2.222s-1.646.452-3.387.624L9 15l.078-.788c.172-1.741.257-2.612.624-3.387s.985-1.393 2.222-2.63zM6 15H3.75a1.75 1.75 0 1 0 0 3.5h9.5a1.75 1.75 0 1 1 0 3.5H11" color="currentColor"></path></svg>
                                        </button>
                                    </div>
                                </Form.Group>
                            </Form>
                            <div className='colorsAvailable'>
                                {t('flower.allColorsAvailable')}
                                <div className='addB' onClick={() => setPaperColorsDiv(!paperColorsDiv)} style={{ display: "flex" }}>
                                    <svg className={paperColorsDiv ? "orderArrwOpen" : "orderArrwClose"}
                                        xmlns="http://www.w3.org/2000/svg" width={28} height={28} viewBox="0 0 24 24" ><g transform="rotate(-90 12 12)"><path stroke="currentColor" strokeDasharray={8} strokeDashoffset={8} strokeLinecap="round" strokeWidth={2} d="M9 12L14 7M9 12L14 17" fill="currentColor"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="8;0"></animate></path></g></svg>
                                </div>
                            </div>
                            <div className={paperColorsDiv ? "bandColor1" : "bandColor2"}>
                                {typeof allPapers !== "string" &&
                                    <div className='inDiv' >
                                        {allPapers?.map((paper, index) => (
                                            <div className={paperColorsDiv ? "pItameOn" : "pItameOn"} key={index}>
                                                <div className="pItameColor" style={{ backgroundColor: paper.color }}>
                                                </div>
                                                <button className='deleteColor'
                                                    onClick={() => handleDeletePaper(paper._id)}
                                                >
                                                    {t('public.delete')}
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div> */}

                <div className='supTitle'>
                    {t('flower.supTitle')}
                </div>
                <div className='currentBouquets'>
                    {allBouquets?.length == 0 &&
                        <div className='noProducts' >
                            <b>{t('flower.noProducts1')}
                                <svg xmlns="http://www.w3.org/2000/svg" width={25} height={25} viewBox="0 0 36 36" ><path fill="#ffcb4c" d="M36 18c0 9.941-8.059 18-18 18c-9.94 0-18-8.059-18-18C0 8.06 8.06 0 18 0c9.941 0 18 8.06 18 18"></path><ellipse cx={12.176} cy={14.71} fill="#65471b" rx={2.647} ry={3.706}></ellipse><circle cx={24.882} cy={14.294} r={6.882} fill="#f4f7f9"></circle><path fill="#65471b" d="M14.825 9.946c-.322 0-.64-.146-.848-.423c-.991-1.321-2.028-2.029-3.083-2.104c-1.39-.095-2.523.947-2.734 1.158A1.057 1.057 0 1 1 6.663 7.08c.457-.457 2.129-1.936 4.381-1.773c1.695.12 3.251 1.111 4.627 2.945a1.059 1.059 0 0 1-.846 1.694"></path><path fill="#292f33" d="M32.824 36a1.059 1.059 0 0 1-1.059-1.059V14.824a1.059 1.059 0 1 1 2.118 0v20.118A1.06 1.06 0 0 1 32.824 36"></path><path fill="#67757f" d="M32.824 12.706c-.054 0-.105.012-.158.016c-.732-3.628-3.943-6.369-7.784-6.369c-4.379 0-7.941 3.562-7.941 7.941s3.562 7.941 7.941 7.941c3.468 0 6.416-2.238 7.496-5.343a2.118 2.118 0 1 0 .446-4.186m-7.942 7.412c-3.211 0-5.823-2.612-5.823-5.824s2.613-5.824 5.823-5.824c3.211 0 5.824 2.612 5.824 5.824s-2.613 5.824-5.824 5.824"></path><path fill="#65471b" d="M21.175 28.588c-.159 0-.321-.036-.473-.112c-1.819-.91-3.587-.91-5.406 0a1.059 1.059 0 1 1-.947-1.895c2.421-1.21 4.877-1.21 7.3 0a1.06 1.06 0 0 1-.474 2.007"></path><path fill="#bdddf4" d="M28.049 9.411a5.788 5.788 0 0 0-3.167-.94a5.824 5.824 0 0 0-5.824 5.824c0 1.169.348 2.255.94 3.167zm-5.652 10.144a5.794 5.794 0 0 0 2.485.563a5.824 5.824 0 0 0 5.824-5.824c0-.89-.206-1.731-.563-2.485z"></path></svg>
                                ! </b>
                            <br />
                            <b>
                                {t('flower.noProducts2')}
                                <svg className='aboveHand' xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 36 36" ><path fill="#ffdc5d" d="M30 20.145s.094-2.362-1.791-3.068c-1.667-.625-2.309.622-2.309.622s.059-1.913-1.941-2.622c-1.885-.667-2.75.959-2.75.959s-.307-1.872-2.292-2.417C17.246 13.159 16 14.785 16 14.785V2.576C16 1.618 15.458.001 13.458 0S11 1.66 11 2.576v20.5c0 1-1 1-1 0V20.41c0-3.792-2.037-6.142-2.75-6.792c-.713-.65-1.667-.98-2.82-.734c-1.956.416-1.529 1.92-.974 3.197c1.336 3.078 2.253 7.464 2.533 9.538c.79 5.858 5.808 10.375 11.883 10.381c6.626.004 12.123-5.298 12.128-11.924z"></path></svg>
                            </b>
                        </div>}
                    {allBouquets?.map((bouquet) => (
                        <BouquetCard
                            key={bouquet._id}
                            id={bouquet._id}
                            price={bouquet.price}
                            count={bouquet.count}
                            image={bouquet.image}
                            description={lng == "ar" ? bouquet.descriptionAr : bouquet.description}
                            reloadHandel={reloadHandel}
                        />
                    ))}
                </div>
            </div >
        </>
    );
}

export default MyNaturalFlower;
