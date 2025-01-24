import React, { useEffect, useState } from 'react';
import './chocolateCard.css'
import { deleteChocolate } from '../../RTK/chocolate/deleteChocolateSlice';
import { useDispatch } from 'react-redux';
import { patchChocolate } from '../../RTK/chocolate/patchChocolateSlice';
import { Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const ChocolateCard = (props) => {
    const dispatch = useDispatch()
    //////////////////////////
    const [imageSquer, setImageSquer] = useState([]);
    const [image, setImage] = useState([]);
    const [name, setName] = useState('');
    const [nameAr, setNameAr] = useState('');
    const [price, setPrice] = useState(0);
    const [chocolateDiv, setChocolateDiv] = useState(false)
    const [validated1, setValidated1] = useState(false);
    const [validated2, setValidated2] = useState(false);
    const [validated3, setValidated3] = useState(false);
    const [validated4, setValidated4] = useState(false);
    const [reload, setReload] = useState(true);
    ///////////////////////////
    useEffect(() => {
        setImageSquer(props.image)
        setName(props.name)
        setPrice(props.price)
    }, [props.id])
    ///////////////////////////
    const handelDelete = (e) => {
        dispatch(deleteChocolate(props.id))
        props.reloadHandel()
    }
    ///////////////////////////
    const imag2OnChange = (event) => {
        setImage(event.target.files[0])
        setImageSquer(URL.createObjectURL(event.target.files[0]))
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
            formData.append('image', image);
            const value = {
                reqobj: formData,
                id: props.id
            }
            dispatch(patchChocolate(value))
            setReload(!reload)
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
                id: props.id
            }
            dispatch(patchChocolate(value))
            setReload(!reload)
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
            formData.append('nameAr', nameAr);
            const value = {
                reqobj: formData,
                id: props.id
            }
            dispatch(patchChocolate(value))
            setReload(!reload)
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
            formData.append('price', price);
            const value = {
                reqobj: formData,
                id: props.id
            }
            dispatch(patchChocolate(value))
            setReload(!reload)
        }
    };
    ////////////////////////////////////
    const { t } = useTranslation();
    return (
        <div className='chocolateCard'>
            <div className='chocolateHader'>
                <div className='chocolateItame'>

                    <div className='chocolateImage'>
                        <img className='imageFlower' src={imageSquer} />
                    </div>
                    <div className='chocolateItame1' >   {t('chocolate.name')} : {name}</div>
                    <div className='chocolateItame1' >  {t('chocolate.price')} : {price}.{t("public.sar")} </div>
                </div>
                <div className='cardButton'>
                    <button className='deleteChock'
                        onClick={handelDelete}
                    >
                        {t('public.delete')}
                    </button>
                    {/* /////////// */}
                    <div className='addB' onClick={() => setChocolateDiv(!chocolateDiv)} style={{ display: "flex" }}>
                        <svg className={chocolateDiv ? "orderArrwOpen" : "orderArrwClose"}
                            xmlns="http://www.w3.org/2000/svg" width={28} height={28} viewBox="0 0 24 24" ><g transform="rotate(-90 12 12)"><path stroke="currentColor" strokeDasharray={8} strokeDashoffset={8} strokeLinecap="round" strokeWidth={2} d="M9 12L14 7M9 12L14 17" fill="currentColor"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="8;0"></animate></path></g></svg>
                    </div>
                </div>
            </div>
            <div className={chocolateDiv ? "chocolateColor1" : "chocolateColor2"}>
                <Form noValidate validated={validated1} onSubmit={handleSubmit1} className='updateChoco'>
                    <Form.Group className="mb-3" controlId="validationCustom01">
                        <Form.Label>  {t('chocolate.editChocolateImage')}</Form.Label>
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
                <Form noValidate validated={validated2} onSubmit={handleSubmit2} className='updateChoco'>
                    <Form.Group className="mb-3" controlId="validationCustom01">
                        <Form.Label> {t('chocolate.editChocolateNameEn')}</Form.Label>
                        <div className='rowEdit'>
                            <div className='addCategory2'>
                                <Form.Control
                                    type="text"
                                    placeholder={props?.name}
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
                <Form noValidate validated={validated3} onSubmit={handleSubmit3} className='updateChoco'>
                    <Form.Group className="mb-3" controlId="validationCustom01">
                        <Form.Label> {t('chocolate.editChocolateNameAr')}</Form.Label>
                        <div className='rowEdit'>
                            <div className='addCategory2'>
                                <Form.Control
                                    type="text"
                                    placeholder={props?.nameAr}
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
                <Form noValidate validated={validated4} onSubmit={handleSubmit4} className='updateChoco'>
                    <Form.Group className="mb-3" controlId="validationCustom01">
                        <Form.Label> {t('chocolate.editChocolatePrice')}</Form.Label>
                        <div className='rowEdit'>
                            <div className='addCategory2'>
                                <Form.Control
                                    type="number"
                                    min={0}
                                    placeholder={`${props?.price} .${t("public.sar")}`}
                                    required
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>
                            <button type="submit" className='editInfo'  >
                                <svg className='svgEdit' xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 24 24" ><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.946 3.173c.587-.587.88-.88 1.206-1.021c.469-.203 1-.203 1.469 0c.325.14.619.434 1.206 1.021s.88.881 1.021 1.206c.203.469.203 1 0 1.469c-.14.325-.434.619-1.021 1.206l-5.022 5.022c-1.237 1.237-1.855 1.855-2.63 2.222s-1.646.452-3.387.624L9 15l.078-.788c.172-1.741.257-2.612.624-3.387s.985-1.393 2.222-2.63zM6 15H3.75a1.75 1.75 0 1 0 0 3.5h9.5a1.75 1.75 0 1 1 0 3.5H11" color="currentColor"></path></svg>
                            </button>
                        </div>
                    </Form.Group>
                </Form>
            </div>
        </div>

    );
}

export default ChocolateCard;
