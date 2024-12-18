import React, { useState } from 'react';
import { updateContact } from '../../RTK/settings/updateContactSlice';
import { Form } from 'react-bootstrap';
import './contact.css'
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

const Contact = (props) => {
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [whatsapp, setWhatsapp] = useState('')
    const [instagram, setInstagram] = useState('')
    const [facebook, setFacebook] = useState('')
    const [tiktok, setTiktok] = useState('')

    const [validated1, setValidated1] = useState(false);
    const [validated2, setValidated2] = useState(false);
    const [validated3, setValidated3] = useState(false);
    const [validated4, setValidated4] = useState(false);
    const [validated5, setValidated5] = useState(false);
    const [validated6, setValidated6] = useState(false);
    ////////////////////////////
    const dispatch = useDispatch()
    ////////////////////////////
    const handleEditEamil = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setValidated1(true);
        }
        else {
            const value = {
                email: email
            }
            dispatch(updateContact(value))
            props.handleReload()
        }
    }
    ////////////////////////////
    const handleEditPhone = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setValidated1(true);
        }
        else {
            const value = {
                phone: phone
            }
            dispatch(updateContact(value))
            props.handleReload()
        }
    }
    ////////////////////////////
    const handleEditWhatsapp = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setValidated1(true);
        }
        else {
            const value = {
                whatsapp: whatsapp
            }
            dispatch(updateContact(value))
            props.handleReload()
        }
    }
    ////////////////////////////
    const handleEditFacebook = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setValidated1(true);
        }
        else {
            const value = {
                facebook: facebook
            }
            dispatch(updateContact(value))
            props.handleReload()
        }
    }
    ////////////////////////////
    const handleEditInstagram = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setValidated1(true);
        }
        else {
            const value = {
                instagram: instagram
            }
            dispatch(updateContact(value))
            props.handleReload()
        }
    }
    ////////////////////////////
    const handleEditTiktok = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setValidated1(true);
        }
        else {
            const value = {
                tiktok: tiktok
            }
            dispatch(updateContact(value))
            props.handleReload()
        }
    }
    ////////////////////////////////////
    const { t, i18n } = useTranslation();

    return (
        <div className='editContact'>
            {/* //////////// */}
            <Form noValidate validated={validated1} onSubmit={handleEditEamil} className='addCategory1 shadow1'>

                <Form.Group className="mb-3" controlId="validationCustom01">
                    <Form.Label> {t('settings.email')} :  {props?.settings?.email}</Form.Label>
                    <div className='rowEdit'>
                        <div className='addCategory1'>
                            <Form.Control
                                placeholder='write new email to edit it.'
                                required
                                type="text"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <button type="submit" className='editInfo'  >
                            <svg className='svgEdit' xmlns="http://www.w3.org/2000/svg" width={"30px"} height={"30px"} viewBox="0 0 24 24" ><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.946 3.173c.587-.587.88-.88 1.206-1.021c.469-.203 1-.203 1.469 0c.325.14.619.434 1.206 1.021s.88.881 1.021 1.206c.203.469.203 1 0 1.469c-.14.325-.434.619-1.021 1.206l-5.022 5.022c-1.237 1.237-1.855 1.855-2.63 2.222s-1.646.452-3.387.624L9 15l.078-.788c.172-1.741.257-2.612.624-3.387s.985-1.393 2.222-2.63zM6 15H3.75a1.75 1.75 0 1 0 0 3.5h9.5a1.75 1.75 0 1 1 0 3.5H11" color="currentColor"></path></svg>

                        </button>
                    </div>
                </Form.Group>
            </Form>
            {/* <hr className='tapp' /> */}
            {/* //////////// */}
            <Form noValidate validated={validated2} onSubmit={handleEditPhone} className='addCategory1 shadow1'>

                <Form.Group className="mb-3" controlId="validationCustom01">
                    <Form.Label>{t('settings.phone')} :  {props?.settings?.phone}</Form.Label>
                    <div className='rowEdit'>
                        <div className='addCategory1'>
                            <Form.Control
                                placeholder='write new phone to edit it.'
                                required
                                type="text"
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                        <button type="submit" className='editInfo'  >
                            <svg className='svgEdit' xmlns="http://www.w3.org/2000/svg" width={"30px"} height={"30px"} viewBox="0 0 24 24" ><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.946 3.173c.587-.587.88-.88 1.206-1.021c.469-.203 1-.203 1.469 0c.325.14.619.434 1.206 1.021s.88.881 1.021 1.206c.203.469.203 1 0 1.469c-.14.325-.434.619-1.021 1.206l-5.022 5.022c-1.237 1.237-1.855 1.855-2.63 2.222s-1.646.452-3.387.624L9 15l.078-.788c.172-1.741.257-2.612.624-3.387s.985-1.393 2.222-2.63zM6 15H3.75a1.75 1.75 0 1 0 0 3.5h9.5a1.75 1.75 0 1 1 0 3.5H11" color="currentColor"></path></svg>

                        </button>
                    </div>
                </Form.Group>
            </Form>
            {/* <hr className='tapp' /> */}
            {/* //////////// */}
            <Form noValidate validated={validated3} onSubmit={handleEditWhatsapp} className='addCategory1 shadow1'>

                <Form.Group className="mb-3" controlId="validationCustom01">
                    <Form.Label>{t('settings.whatsapp')} : {props?.settings?.whatsapp}</Form.Label>
                    <div className='rowEdit'>
                        <div className='addCategory1'>
                            <Form.Control
                                placeholder='write new whatsapp to edit it.'
                                required
                                type="text"
                                onChange={(e) => setWhatsapp(e.target.value)}
                            />
                        </div>
                        <button type="submit" className='editInfo'  >
                            <svg className='svgEdit' xmlns="http://www.w3.org/2000/svg" width={"30px"} height={"30px"} viewBox="0 0 24 24" ><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.946 3.173c.587-.587.88-.88 1.206-1.021c.469-.203 1-.203 1.469 0c.325.14.619.434 1.206 1.021s.88.881 1.021 1.206c.203.469.203 1 0 1.469c-.14.325-.434.619-1.021 1.206l-5.022 5.022c-1.237 1.237-1.855 1.855-2.63 2.222s-1.646.452-3.387.624L9 15l.078-.788c.172-1.741.257-2.612.624-3.387s.985-1.393 2.222-2.63zM6 15H3.75a1.75 1.75 0 1 0 0 3.5h9.5a1.75 1.75 0 1 1 0 3.5H11" color="currentColor"></path></svg>

                        </button>
                    </div>
                </Form.Group>
            </Form>
            {/* <hr className='tapp' /> */}
            {/* //////////// */}
            <Form noValidate validated={validated4} onSubmit={handleEditInstagram} className='addCategory1 shadow1'>

                <Form.Group className="mb-3" controlId="validationCustom01">
                    <Form.Label> {t('settings.instagram')} : {props?.settings?.instagram}</Form.Label>
                    <div className='rowEdit'>
                        <div className='addCategory1'>
                            <Form.Control
                                placeholder='write new instagram to edit it.'
                                required
                                type="text"
                                onChange={(e) => setInstagram(e.target.value)}
                            />
                        </div>
                        <button type="submit" className='editInfo'  >
                            <svg className='svgEdit' xmlns="http://www.w3.org/2000/svg" width={"30px"} height={"30px"} viewBox="0 0 24 24" ><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.946 3.173c.587-.587.88-.88 1.206-1.021c.469-.203 1-.203 1.469 0c.325.14.619.434 1.206 1.021s.88.881 1.021 1.206c.203.469.203 1 0 1.469c-.14.325-.434.619-1.021 1.206l-5.022 5.022c-1.237 1.237-1.855 1.855-2.63 2.222s-1.646.452-3.387.624L9 15l.078-.788c.172-1.741.257-2.612.624-3.387s.985-1.393 2.222-2.63zM6 15H3.75a1.75 1.75 0 1 0 0 3.5h9.5a1.75 1.75 0 1 1 0 3.5H11" color="currentColor"></path></svg>

                        </button>
                    </div>
                </Form.Group>
            </Form>
            {/* <hr className='tapp' /> */}
            {/* //////////// */}
            <Form noValidate validated={validated5} onSubmit={handleEditFacebook} className='addCategory1 shadow1'>

                <Form.Group className="mb-3" controlId="validationCustom01">
                    <Form.Label>{t('settings.facebook')} : {props?.settings?.facebook}</Form.Label>
                    <div className='rowEdit'>
                        <div className='addCategory1'>
                            <Form.Control
                                placeholder='write new facebook to edit it.'
                                required
                                type="text"
                                onChange={(e) => setFacebook(e.target.value)}
                            />
                        </div>
                        <button type="submit" className='editInfo'  >
                            <svg className='svgEdit' xmlns="http://www.w3.org/2000/svg" width={"30px"} height={"30px"} viewBox="0 0 24 24" ><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.946 3.173c.587-.587.88-.88 1.206-1.021c.469-.203 1-.203 1.469 0c.325.14.619.434 1.206 1.021s.88.881 1.021 1.206c.203.469.203 1 0 1.469c-.14.325-.434.619-1.021 1.206l-5.022 5.022c-1.237 1.237-1.855 1.855-2.63 2.222s-1.646.452-3.387.624L9 15l.078-.788c.172-1.741.257-2.612.624-3.387s.985-1.393 2.222-2.63zM6 15H3.75a1.75 1.75 0 1 0 0 3.5h9.5a1.75 1.75 0 1 1 0 3.5H11" color="currentColor"></path></svg>

                        </button>
                    </div>
                </Form.Group>
            </Form>
            {/* <hr className='tapp' /> */}
            {/* //////////// */}
            <Form noValidate validated={validated6} onSubmit={handleEditTiktok} className='addCategory1 shadow1'>

                <Form.Group className="mb-3" controlId="validationCustom01">
                    <Form.Label>{t('settings.tiktok')} : {props?.settings?.tiktok}</Form.Label>
                    <div className='rowEdit'>
                        <div className='addCategory1'>
                            <Form.Control
                                placeholder='write new tiktok to edit it.'
                                required
                                type="text"
                                onChange={(e) => setTiktok(e.target.value)}
                            />
                        </div>
                        <button type="submit" className='editInfo'  >
                            <svg className='svgEdit' xmlns="http://www.w3.org/2000/svg" width={"30px"} height={"30px"} viewBox="0 0 24 24" ><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.946 3.173c.587-.587.88-.88 1.206-1.021c.469-.203 1-.203 1.469 0c.325.14.619.434 1.206 1.021s.88.881 1.021 1.206c.203.469.203 1 0 1.469c-.14.325-.434.619-1.021 1.206l-5.022 5.022c-1.237 1.237-1.855 1.855-2.63 2.222s-1.646.452-3.387.624L9 15l.078-.788c.172-1.741.257-2.612.624-3.387s.985-1.393 2.222-2.63zM6 15H3.75a1.75 1.75 0 1 0 0 3.5h9.5a1.75 1.75 0 1 1 0 3.5H11" color="currentColor"></path></svg>

                        </button>
                    </div>
                </Form.Group>
            </Form>
            {/* //////////// */}

        </div>
    );
}

export default Contact;
