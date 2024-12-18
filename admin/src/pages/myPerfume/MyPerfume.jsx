import React, { useEffect, useState } from 'react';
import './myPerfume.css'
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { patchPerfume } from '../../RTK/perfume/patchPerfumeSlice';
import { getAllPerfume } from '../../RTK/perfume/getAllPerfumeSlice';
import { postPerfume } from '../../RTK/perfume/postPerfumeSlice';
import AddperfumeSize from '../../allExtensions/addperfumeSize/AddperfumeSize';
import Api from '../../allExtensions/API';
import ProfumeSize from './ProfumeSize';
import { Toaster } from 'react-hot-toast';
import { Carousel } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';


const MyPerfume = () => {
    const perfumeLength = useSelector(state => state.getAllPerfume)?.data?.length
    const perfume = useSelector(state => state.getAllPerfume)?.data
    const addState = useSelector(state => state.postPerfume)
    //////////////////////
    const [imagesSquer, setImagesSquer] = useState([]);
    const [images, setImages] = useState([]);
    const [reload, setReload] = useState([]);
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [stateMessage, setStateMessage] = useState(false);
    const [validated, setValidated] = useState(false);
    const [validated1, setValidated1] = useState(false);
    const [validated2, setValidated2] = useState(false);
    const [validated3, setValidated3] = useState(false);
    //////////////////////
    const dispatch = useDispatch()
    //////////////////////
    const imag2OnChange = e => {
        const fileArray = Array.from(e.target.files)
        fileArray.map(f => f["id"] = Math.random() * Math.pow(10, 16))
        setImages(fileArray)

        const fileArraySquer2 = []
        const fileArraySquer = Array.from(e.target.files)
        fileArraySquer.map((f, index) => (
            fileArraySquer2.push(URL.createObjectURL(e.target?.files[index]))))
        setImagesSquer(fileArraySquer2)
    }
    //////////////////////
    const handleReload = () => {
        setTimeout(() => {
            setReload(!reload)
        }, 2000);
    }
    //////////////////////
    const handleSubmitName = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setValidated1(true);
        }
        else {
            const formData = new FormData();
            formData.append('name', name);
            dispatch(patchPerfume(formData))
            setReload(!reload)
        }
    };
    //////////////////////
    const handleSubmitImage = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setValidated2(true);
        }
        else {
            const formData = new FormData();
            for (const image of images) {
                formData.append("images", image);
            }
            dispatch(patchPerfume(formData))
            setReload(!reload)
        }
    };
    //////////////////////
    const handleSubmitDescription = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setValidated3(true);
        }
        else {
            const formData = new FormData();
            formData.append('description', description);
            dispatch(patchPerfume(formData))
            setReload(!reload)
        }
    };
    //////////////////////
    const handleAddPerfume = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setValidated(true);
        }
        else {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('description', description);


            for (const image of images) {
                formData.append("images", image);
            }

            dispatch(postPerfume(formData))
            setTimeout(() => {
                setReload(!reload)
                setStateMessage(true)
                setImages([])
                setImagesSquer([])
            }, 1000);
        }
    };
    //////////////////////
    const handleClose = () => {
        setTimeout(() => {
            setStateMessage(false)
        }, 1000);
    }
    ////////////////////////////////////
    useEffect(() => {
        dispatch(getAllPerfume())
    }, [dispatch, reload])
    ////////////////////////////////////
    useEffect(
        function () {
            document.title = `SUNFLOWER - My Perfume`;
            return function () { document.title = 'SUNFLOWER' };
        }, [])
    ////////////////////////////////////
    const { t, i18n } = useTranslation();
    return (
        <>
            <Toaster />
            <div className='editeCategory'>
                <div className='title'>
                    {t('perfume.title')}
                </div>
                <div className='editeContener'>
                    <div className='nowPerfume'>
                        {perfumeLength != 0 &&
                            <div className='editPerfum'>
                                <Form noValidate validated={validated2} onSubmit={handleSubmitImage} className='addCategory1'>

                                    <Form.Group className="mb-3" controlId="validationCustom01">
                                        <Form.Label> {t('perfume.editPerfumeImage')}</Form.Label>
                                        <div className='rowEdit'>
                                            <div className='addCategory1'>

                                                <Form.Control
                                                    type="file"
                                                    required
                                                    onChange={imag2OnChange}
                                                    multiple
                                                />
                                            </div>
                                            <button type="submit" className='editInfo'  >
                                                <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 24 24" ><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.946 3.173c.587-.587.88-.88 1.206-1.021c.469-.203 1-.203 1.469 0c.325.14.619.434 1.206 1.021s.88.881 1.021 1.206c.203.469.203 1 0 1.469c-.14.325-.434.619-1.021 1.206l-5.022 5.022c-1.237 1.237-1.855 1.855-2.63 2.222s-1.646.452-3.387.624L9 15l.078-.788c.172-1.741.257-2.612.624-3.387s.985-1.393 2.222-2.63zM6 15H3.75a1.75 1.75 0 1 0 0 3.5h9.5a1.75 1.75 0 1 1 0 3.5H11" color="currentColor"></path></svg>

                                            </button>
                                        </div>
                                    </Form.Group>
                                </Form>
                                {/* //////////// */}
                                <hr className='tapp' />
                                {/* //////////// */}
                                {/* <Form noValidate validated={validated1} onSubmit={handleSubmitName} className='addCategory1'>

                                    <Form.Group className="mb-3" controlId="validationCustom01">
                                        <Form.Label>{t('perfume.editPerfumeName Ar')}</Form.Label>
                                        <div className='rowEdit'>
                                            <div className='addCategory1'>

                                                <Form.Control
                                                    type="text"
                                                    placeholder={perfume[0]?.name}
                                                    required
                                                    onChange={(e) => setName(e.target.value)}
                                                />
                                            </div>
                                            <button type="submit" className='editInfo'  >
                                                <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 24 24" ><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.946 3.173c.587-.587.88-.88 1.206-1.021c.469-.203 1-.203 1.469 0c.325.14.619.434 1.206 1.021s.88.881 1.021 1.206c.203.469.203 1 0 1.469c-.14.325-.434.619-1.021 1.206l-5.022 5.022c-1.237 1.237-1.855 1.855-2.63 2.222s-1.646.452-3.387.624L9 15l.078-.788c.172-1.741.257-2.612.624-3.387s.985-1.393 2.222-2.63zM6 15H3.75a1.75 1.75 0 1 0 0 3.5h9.5a1.75 1.75 0 1 1 0 3.5H11" color="currentColor"></path></svg>
                                            </button>
                                        </div>
                                    </Form.Group>
                                </Form>
                                <hr className='tapp' /> */}
                                {/* //////////// */}
                                <Form noValidate validated={validated1} onSubmit={handleSubmitName} className='addCategory1'>

                                    <Form.Group className="mb-3" controlId="validationCustom01">
                                        <Form.Label>{t('perfume.editPerfumeNameEn')}</Form.Label>
                                        <div className='rowEdit'>
                                            <div className='addCategory1'>

                                                <Form.Control
                                                    type="text"
                                                    placeholder={perfume[0]?.name}
                                                    required
                                                    onChange={(e) => setName(e.target.value)}
                                                />
                                            </div>
                                            <button type="submit" className='editInfo'  >
                                                <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 24 24" ><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.946 3.173c.587-.587.88-.88 1.206-1.021c.469-.203 1-.203 1.469 0c.325.14.619.434 1.206 1.021s.88.881 1.021 1.206c.203.469.203 1 0 1.469c-.14.325-.434.619-1.021 1.206l-5.022 5.022c-1.237 1.237-1.855 1.855-2.63 2.222s-1.646.452-3.387.624L9 15l.078-.788c.172-1.741.257-2.612.624-3.387s.985-1.393 2.222-2.63zM6 15H3.75a1.75 1.75 0 1 0 0 3.5h9.5a1.75 1.75 0 1 1 0 3.5H11" color="currentColor"></path></svg>
                                            </button>
                                        </div>
                                    </Form.Group>
                                </Form>
                                {/* //////////// */}
                                <hr className='tapp' />
                                {/* //////////// */}
                                {/* <Form noValidate validated={validated3} onSubmit={handleSubmitDescription} className='addCategory1'>
                                    <Form.Group className="mb-3" controlId="validationCustom01">
                                        <Form.Label>{t('perfume.editPerfumeDescriptionAr')}</Form.Label>
                                        <div className='rowEdit'>
                                            <div className='addCategory2'>
                                                <Form.Control
                                                    className='textarea1'
                                                    as="textarea"
                                                    type="text"
                                                    placeholder={perfume[0]?.description}
                                                    required
                                                    onChange={(e) => setDescription(e.target.value)}
                                                />
                                            </div>
                                            <button type="submit" className='editInfo'  >
                                                <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 24 24" ><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.946 3.173c.587-.587.88-.88 1.206-1.021c.469-.203 1-.203 1.469 0c.325.14.619.434 1.206 1.021s.88.881 1.021 1.206c.203.469.203 1 0 1.469c-.14.325-.434.619-1.021 1.206l-5.022 5.022c-1.237 1.237-1.855 1.855-2.63 2.222s-1.646.452-3.387.624L9 15l.078-.788c.172-1.741.257-2.612.624-3.387s.985-1.393 2.222-2.63zM6 15H3.75a1.75 1.75 0 1 0 0 3.5h9.5a1.75 1.75 0 1 1 0 3.5H11" color="currentColor"></path></svg>

                                            </button>
                                        </div>
                                    </Form.Group>
                                </Form>
                                <hr className='tapp' /> */}
                                {/* //////////// */}
                                <Form noValidate validated={validated3} onSubmit={handleSubmitDescription} className='addCategory1'>
                                    <Form.Group className="mb-3" controlId="validationCustom01">
                                        <Form.Label>{t('perfume.editPerfumeDescriptionEn')}</Form.Label>
                                        <div className='rowEdit'>
                                            <div className='addCategory2'>
                                                <Form.Control
                                                    className='textarea1'
                                                    as="textarea"
                                                    type="text"
                                                    placeholder={perfume[0]?.description}
                                                    required
                                                    onChange={(e) => setDescription(e.target.value)}
                                                />
                                            </div>
                                            <button type="submit" className='editInfo'  >
                                                <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 24 24" ><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.946 3.173c.587-.587.88-.88 1.206-1.021c.469-.203 1-.203 1.469 0c.325.14.619.434 1.206 1.021s.88.881 1.021 1.206c.203.469.203 1 0 1.469c-.14.325-.434.619-1.021 1.206l-5.022 5.022c-1.237 1.237-1.855 1.855-2.63 2.222s-1.646.452-3.387.624L9 15l.078-.788c.172-1.741.257-2.612.624-3.387s.985-1.393 2.222-2.63zM6 15H3.75a1.75 1.75 0 1 0 0 3.5h9.5a1.75 1.75 0 1 1 0 3.5H11" color="currentColor"></path></svg>

                                            </button>
                                        </div>
                                    </Form.Group>
                                </Form>


                            </div>}
                        {/* //////////////// */}
                        {perfumeLength == 0 &&
                            <div className='editPerfum'>
                                <Form noValidate validated={validated} onSubmit={handleAddPerfume} className='addCategory1'>
                                    <div className='activeTitel'>{t('perfume.title2')}</div>
                                    <hr className='tapp' />
                                    <Form.Group className="mb-3" controlId="validationCustom01">
                                        <Form.Label>{t('perfume.addPerfumeImage')} </Form.Label>
                                        <Form.Control
                                            required
                                            type="file"
                                            onChange={imag2OnChange}
                                            multiple
                                        />
                                    </Form.Group>
                                    {/* <Form.Group className="mb-3" controlId="validationCustom01">
                                        <Form.Label>{t('perfume.addPerfumeNameAr')}</Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </Form.Group> */}
                                    <Form.Group className="mb-3" controlId="validationCustom01">
                                        <Form.Label>{t('perfume.addPerfumeNameEn')}</Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </Form.Group>
                                    {/* <Form.Group className="mb-3" controlId="validationCustom03">
                                        <Form.Label>{t('perfume.addPerfumeDescriptionAr')}</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Category Name"
                                            required
                                            onChange={(e) => setDescription(e.target.value)}
                                        />
                                    </Form.Group> */}
                                    <Form.Group className="mb-3" controlId="validationCustom03">
                                        <Form.Label>{t('perfume.addPerfumeDescriptionEn')}</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Category Name"
                                            required
                                            onChange={(e) => setDescription(e.target.value)}
                                        />
                                    </Form.Group>
                                    <hr className='tapp' />
                                    <button type="submit" className='formButton'>{t('perfume.CreatePerfume')}</button>
                                </Form>
                            </div>
                        }
                        {/* <div className='displayNewCategory'> */}
                        <div className='newImagePerfume'  >
                            {(imagesSquer?.length == 0 && perfume != 0) &&
                                <Carousel data-bs-theme="dark">
                                    {perfume[0]?.images.map((image, index) => (
                                        <Carousel.Item key={index}  >
                                            <img className="imagePerfume" src={`${Api}/users/${image}`} />
                                        </Carousel.Item>
                                    ))}
                                </Carousel>
                            }
                            {imagesSquer.length != 0 &&
                                <Carousel data-bs-theme="dark">
                                    {imagesSquer.map((image, index) => (
                                        <Carousel.Item key={index}  >
                                            <img className="imagePerfume" src={image} />
                                        </Carousel.Item>
                                    ))}
                                </Carousel>
                            }
                        </div>
                        {/* </div> */}

                    </div>
                </div >
                {/* ///////////////////// */}
                <AddperfumeSize
                    handleReload={handleReload}
                    id={perfume[0]?._id}

                />
                {/* ///////////////////// */}
                <div className='supTitle'>
                    {t('perfume.supTitle')}
                </div>
                <div className='currentPerfume'>
                    {(perfume[0]?.variants?.length == 0 || perfumeLength == 0) &&
                        <div style={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center"
                        }}>
                            <div className='noProducts' >
                                <b> {t('perfume.noProducts1')}
                                    <svg xmlns="http://www.w3.org/2000/svg" width={25} height={25} viewBox="0 0 36 36" ><path fill="#ffcb4c" d="M36 18c0 9.941-8.059 18-18 18c-9.94 0-18-8.059-18-18C0 8.06 8.06 0 18 0c9.941 0 18 8.06 18 18"></path><ellipse cx={12.176} cy={14.71} fill="#65471b" rx={2.647} ry={3.706}></ellipse><circle cx={24.882} cy={14.294} r={6.882} fill="#f4f7f9"></circle><path fill="#65471b" d="M14.825 9.946c-.322 0-.64-.146-.848-.423c-.991-1.321-2.028-2.029-3.083-2.104c-1.39-.095-2.523.947-2.734 1.158A1.057 1.057 0 1 1 6.663 7.08c.457-.457 2.129-1.936 4.381-1.773c1.695.12 3.251 1.111 4.627 2.945a1.059 1.059 0 0 1-.846 1.694"></path><path fill="#292f33" d="M32.824 36a1.059 1.059 0 0 1-1.059-1.059V14.824a1.059 1.059 0 1 1 2.118 0v20.118A1.06 1.06 0 0 1 32.824 36"></path><path fill="#67757f" d="M32.824 12.706c-.054 0-.105.012-.158.016c-.732-3.628-3.943-6.369-7.784-6.369c-4.379 0-7.941 3.562-7.941 7.941s3.562 7.941 7.941 7.941c3.468 0 6.416-2.238 7.496-5.343a2.118 2.118 0 1 0 .446-4.186m-7.942 7.412c-3.211 0-5.823-2.612-5.823-5.824s2.613-5.824 5.823-5.824c3.211 0 5.824 2.612 5.824 5.824s-2.613 5.824-5.824 5.824"></path><path fill="#65471b" d="M21.175 28.588c-.159 0-.321-.036-.473-.112c-1.819-.91-3.587-.91-5.406 0a1.059 1.059 0 1 1-.947-1.895c2.421-1.21 4.877-1.21 7.3 0a1.06 1.06 0 0 1-.474 2.007"></path><path fill="#bdddf4" d="M28.049 9.411a5.788 5.788 0 0 0-3.167-.94a5.824 5.824 0 0 0-5.824 5.824c0 1.169.348 2.255.94 3.167zm-5.652 10.144a5.794 5.794 0 0 0 2.485.563a5.824 5.824 0 0 0 5.824-5.824c0-.89-.206-1.731-.563-2.485z"></path></svg>
                                    ! </b>
                                <br />
                                <b>
                                    {t('perfume.noProducts2')}
                                    <svg className='aboveHand' xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 36 36" ><path fill="#ffdc5d" d="M30 20.145s.094-2.362-1.791-3.068c-1.667-.625-2.309.622-2.309.622s.059-1.913-1.941-2.622c-1.885-.667-2.75.959-2.75.959s-.307-1.872-2.292-2.417C17.246 13.159 16 14.785 16 14.785V2.576C16 1.618 15.458.001 13.458 0S11 1.66 11 2.576v20.5c0 1-1 1-1 0V20.41c0-3.792-2.037-6.142-2.75-6.792c-.713-.65-1.667-.98-2.82-.734c-1.956.416-1.529 1.92-.974 3.197c1.336 3.078 2.253 7.464 2.533 9.538c.79 5.858 5.808 10.375 11.883 10.381c6.626.004 12.123-5.298 12.128-11.924z"></path></svg>
                                </b>
                            </div>
                        </div>}
                    {perfume[0]?.variants?.map((variant, index) => (
                        <ProfumeSize
                            key={index}
                            id={variant?._id}
                            price={variant?.price}
                            size={variant?.size}
                            available={variant?.available}
                            handleReload={handleReload}
                        />
                    ))}
                </div>
            </div >
        </>
    )
}

export default MyPerfume;

