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


const MyPerfume = () => {
    const perfumeLength = useSelector(state => state.getAllPerfume)?.data?.length
    const perfume = useSelector(state => state.getAllPerfume)?.data[0]
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
    let startImage = `${Api}/users/${perfume?.image}`


    const imag2OnChange = e => {
        const fileArray = Array.from(e.target.files)
        fileArray.map(f => f["id"] = Math.random() * Math.pow(10, 16))
        setImages(fileArray)
        console.log(fileArray)

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
            setReload(!reload)
            setStateMessage(true)
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
    return (
        <>
            <Toaster />
            <div className='editeCategory'>
                <div className='editeCategoryTitle'>
                    My Perfume
                </div>
                <div className='editeCategoryContener'>
                    <div className='nowPerfume'>
                        {perfumeLength != 0 &&
                            <div className='editPerfum'>
                                <Form noValidate validated={validated1} onSubmit={handleSubmitName} className='addCategory1'>

                                    <Form.Group className="mb-3" controlId="validationCustom01">
                                        <Form.Label>Edite perfume Name</Form.Label>
                                        <div className='rowEdit'>
                                            <div className='addCategory1'>

                                                <Form.Control
                                                    type="text"
                                                    placeholder={perfume?.name}
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
                                <hr />
                                {/* //////////// */}
                                <Form noValidate validated={validated2} onSubmit={handleSubmitImage} className='addCategory1'>

                                    <Form.Group className="mb-3" controlId="validationCustom01">
                                        <Form.Label>Add image perfume</Form.Label>
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
                                <hr />
                                {/* //////////// */}
                                <Form noValidate validated={validated3} onSubmit={handleSubmitDescription} className='addCategory1'>

                                    <Form.Group className="mb-3" controlId="validationCustom01">
                                        <Form.Label>Add description</Form.Label>
                                        <div className='rowEdit'>
                                            <div className='addCategory2'>
                                                <Form.Control
                                                    className='textarea1'
                                                    as="textarea"
                                                    type="text"
                                                    placeholder={perfume?.description}
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
                                    <Form.Group className="mb-3" controlId="validationCustom01">
                                        <Form.Label>Perfume name</Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="validationCustom01">
                                        <Form.Label>Perfume image </Form.Label>
                                        <Form.Control
                                            required
                                            type="file"
                                            onChange={imag2OnChange}
                                            multiple
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="validationCustom03">
                                        <Form.Label>Perfume description</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Category Name"
                                            required
                                            onChange={(e) => setDescription(e.target.value)}
                                        />
                                    </Form.Group>
                                    <hr />
                                    <button type="submit" className='formButton'>Submit form</button>
                                </Form>
                            </div>
                        }
                        <div className='newImagePerfume'  >
                            {imagesSquer?.length == 0 &&
                                <img className='imagePerfume' src={`${Api}/users/${perfume?.images}`} />
                            }
                            {imagesSquer.length != 0 &&
                                <Carousel data-bs-theme="dark">
                                    {imagesSquer.map((image, index) => (
                                        <Carousel.Item key={index}  >
                                            <img className="w-100 profileImg" src={image} />
                                        </Carousel.Item>
                                    ))}
                                </Carousel>
                            }
                        </div>


                    </div>
                </div >
                {/* ///////////////////// */}
                <AddperfumeSize
                    handleReload={handleReload}
                    id={perfume?._id}

                />
                {/* ///////////////////// */}
                <div className='productsTitle'>
                    all sizes
                </div>
                <div className='currentPerfume'>

                    {console.log(perfume?.variants)}
                    {perfume?.variants?.map((variant, index) => (
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

