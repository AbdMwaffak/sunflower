import React, { useEffect, useState } from 'react';
import './about.css'
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { getAllabout } from '../../RTK/about/getAllaboutSlice';
import { addabout } from '../../RTK/about/addaboutSlice';
import AboutElement from '../../allExtensions/aboutElement/AboutElement';
import SuccessfulMessage from '../../allExtensions/successfulMessage/SuccessfulMessage';
import { Toaster } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
const About = () => {
    const allAbout = useSelector(state => state.getAllabout).data
    const addState = useSelector(state => state.addAbout)
    ////////////////////////////////////
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [stateMessage, setStateMessage] = useState(false);
    const [validated, setValidated] = useState(false);
    const [reload, setReload] = useState(true);
    const dispatch = useDispatch()
    ////////////////////////////////////
    const handelReload = () => {
        setTimeout(() => {
            setReload(!reload)
        }, 1000);
    }
    ////////////////////////////////////
    useEffect(
        function () {
            document.title = `SUNFLOWER - About Us `;
            return function () { document.title = 'SUNFLOWER' };
        }, [])
    ////////////////////////////////////
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setValidated(true);
        }
        else {

            const value = {
                title: title,
                description: description
            }
            dispatch(addabout(value))
            setTimeout(() => {
                setReload(!reload)
            }, 1000);

            setStateMessage(true)
        }
    };
    ////////////////////////////////////
    const handleClose = () => {
        setTimeout(() => {
            setStateMessage(false)
        }, 1000);
    }
    ////////////////////////////////////
    useEffect(() => {
        dispatch(getAllabout())
    }, [dispatch, reload])
    ////////////////////////////////////
    const { t, i18n } = useTranslation();
    return (
        <>
            <Toaster />
            {/* {
                stateMessage &&

                < SuccessfulMessage
                    handleClose={handleClose}
                    state={addState}
                    open={stateMessage}
                />
            } */}
            <div className='myAbout'>
                <div className='title'>
                    {t('about.title')}
                </div>
                <div className='editeContener'>
                    <div className='newAbout'>

                        <Form noValidate validated={validated} onSubmit={handleSubmit} className='addAbout'>
                            {/* <Form.Group className="mb-3" controlId="validationCustom02">
                                <Form.Label> {t('about.addTitleAr')}</Form.Label>
                                <Form.Control
                                    type="string"
                                    placeholder="write title here"
                                    required
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </Form.Group> */}
                            {/* ///////// */}
                            <Form.Group className="mb-3" controlId="validationCustom02">
                                <Form.Label> {t('about.addTitleEn')}</Form.Label>
                                <Form.Control
                                    type="string"
                                    placeholder="write title here"
                                    required
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </Form.Group>
                            {/* ///////// */}
                            {/* <Form.Group className="mb-3 " controlId="validationCustom02">
                                <Form.Label> {t('about.addDescriptionAr')} </Form.Label>
                                <Form.Control
                                    className='textarea2'
                                    as="textarea"
                                    type="text"
                                    placeholder="write description here "
                                    required
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </Form.Group> */}

                            {/* ///////// */}
                            <Form.Group className="mb-3 " controlId="validationCustom02">
                                <Form.Label> {t('about.addDescriptionEn')} </Form.Label>
                                <Form.Control
                                    className='textarea2'
                                    as="textarea"
                                    type="text"
                                    placeholder="write description here "
                                    required
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </Form.Group>
                            <hr className='tapp' />
                            <button type="submit" className='formButton'>{t('about.addInformation')}</button>
                        </Form>
                    </div>
                </div >
                <div className='supTitle'>
                    {t('about.supTitle')}
                </div>
                <div className='currentAbout'>
                    {allAbout?.length == 0 &&

                        <div className='noProducts'
                            style={{ marginTop: "10px", marginBottom: "10px" }}
                        >
                            <b> {t('about.noProducts1')}
                                <svg xmlns="http://www.w3.org/2000/svg" width={25} height={25} viewBox="0 0 36 36" ><path fill="#ffcb4c" d="M36 18c0 9.941-8.059 18-18 18c-9.94 0-18-8.059-18-18C0 8.06 8.06 0 18 0c9.941 0 18 8.06 18 18"></path><ellipse cx={12.176} cy={14.71} fill="#65471b" rx={2.647} ry={3.706}></ellipse><circle cx={24.882} cy={14.294} r={6.882} fill="#f4f7f9"></circle><path fill="#65471b" d="M14.825 9.946c-.322 0-.64-.146-.848-.423c-.991-1.321-2.028-2.029-3.083-2.104c-1.39-.095-2.523.947-2.734 1.158A1.057 1.057 0 1 1 6.663 7.08c.457-.457 2.129-1.936 4.381-1.773c1.695.12 3.251 1.111 4.627 2.945a1.059 1.059 0 0 1-.846 1.694"></path><path fill="#292f33" d="M32.824 36a1.059 1.059 0 0 1-1.059-1.059V14.824a1.059 1.059 0 1 1 2.118 0v20.118A1.06 1.06 0 0 1 32.824 36"></path><path fill="#67757f" d="M32.824 12.706c-.054 0-.105.012-.158.016c-.732-3.628-3.943-6.369-7.784-6.369c-4.379 0-7.941 3.562-7.941 7.941s3.562 7.941 7.941 7.941c3.468 0 6.416-2.238 7.496-5.343a2.118 2.118 0 1 0 .446-4.186m-7.942 7.412c-3.211 0-5.823-2.612-5.823-5.824s2.613-5.824 5.823-5.824c3.211 0 5.824 2.612 5.824 5.824s-2.613 5.824-5.824 5.824"></path><path fill="#65471b" d="M21.175 28.588c-.159 0-.321-.036-.473-.112c-1.819-.91-3.587-.91-5.406 0a1.059 1.059 0 1 1-.947-1.895c2.421-1.21 4.877-1.21 7.3 0a1.06 1.06 0 0 1-.474 2.007"></path><path fill="#bdddf4" d="M28.049 9.411a5.788 5.788 0 0 0-3.167-.94a5.824 5.824 0 0 0-5.824 5.824c0 1.169.348 2.255.94 3.167zm-5.652 10.144a5.794 5.794 0 0 0 2.485.563a5.824 5.824 0 0 0 5.824-5.824c0-.89-.206-1.731-.563-2.485z"></path></svg>
                                ! </b>
                            <br />
                            <b>
                                {t('about.noProducts2')}
                                <svg className='aboveHand' xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 36 36" ><path fill="#ffdc5d" d="M30 20.145s.094-2.362-1.791-3.068c-1.667-.625-2.309.622-2.309.622s.059-1.913-1.941-2.622c-1.885-.667-2.75.959-2.75.959s-.307-1.872-2.292-2.417C17.246 13.159 16 14.785 16 14.785V2.576C16 1.618 15.458.001 13.458 0S11 1.66 11 2.576v20.5c0 1-1 1-1 0V20.41c0-3.792-2.037-6.142-2.75-6.792c-.713-.65-1.667-.98-2.82-.734c-1.956.416-1.529 1.92-.974 3.197c1.336 3.078 2.253 7.464 2.533 9.538c.79 5.858 5.808 10.375 11.883 10.381c6.626.004 12.123-5.298 12.128-11.924z"></path></svg>
                            </b>
                        </div>
                    }
                    {allAbout?.map((about, index) => (
                        <AboutElement
                            key={index}
                            title={about?.title}
                            description={about?.description}
                            id={about?._id}
                            handelReload={handelReload}
                        />
                    ))}
                </div>
            </div >
        </>
    )
}

export default About;
