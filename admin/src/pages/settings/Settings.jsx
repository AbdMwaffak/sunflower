import React, { useEffect, useState } from 'react';
import './settings.css'
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import img1 from '../../images/img1.jpg'
import Carousel from 'react-bootstrap/Carousel';
import { getAllSettings } from '../../RTK/settings/getAllSettingsSlice';
import SliderX from '../../allExtensions/sliderXY/SliderX';
import { postImageToSlider } from '../../RTK/settings/postImageToSliderSlice';
import { deleteImageFromSlider } from '../../RTK/settings/deleteImageFromSliderSlice';
const Settings = () => {
    // const allSettings = useSelector(state => state.getAllSettings).data
    const allSlider = useSelector(state => state.getAllSettings)?.data?.slider
    console.log(allSlider)
    ////////////////////////////////////
    const [validated, setValidated] = useState(false);
    const [reload, setReload] = useState(true);

    const [imagesSquer, setImagesSquer] = useState([]);
    const [images, setImages] = useState([]);
    ////////////////////////////////////
    const dispatch = useDispatch()
    ////////////////////////////////////
    const handelReload = () => {
        setTimeout(() => {
            setReload(!reload)
        }, 1000);
    }
    ////////////////////////////////////
    const imagOnChange = e => {
        const fileArray = Array.from(e.target.files)
        fileArray.map(f => f["id"] = Math.random() * Math.pow(10, 16))
        setImages(fileArray)

        const fileArraySquer2 = []
        const fileArraySquer = Array.from(e.target.files)
        fileArraySquer.map((f, index) => (
            fileArraySquer2.push(URL.createObjectURL(e.target?.files[index]))))
        setImagesSquer(fileArraySquer2)
    }
    ////////////////////////////////////
    useEffect(
        function () {
            document.title = `SUNFLOWER - Settings `;
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
            const formData = new FormData();
            images.forEach(image => {
                formData.append("images", image);
            });
            dispatch(postImageToSlider(formData))
            setTimeout(() => {
                setReload(!reload)
            }, 1000);
            console.log(images)
        }
    };
    ////////////////////////////////////
    const handleClose = () => {
        setTimeout(() => {
            setStateMessage(false)
        }, 1000);
    }
    ////////////////////////////////////
    const deleteimage = (id) => {
        console.log(id)
        dispatch(deleteImageFromSlider(id))
        setTimeout(() => {
            setReload(!reload)
        }, 1000);
    }
    ////////////////////////////////////
    useEffect(() => {
        dispatch(getAllSettings())
    }, [dispatch, reload])
    ////////////////////////////////////

    return (
        <>
            <Toaster />
            <div className='mySettings'>
                <div className='mySettingsTitle'>
                    My Settings
                </div>
                <div className='mySettingsContener'>

                    <div className='newimgSlider'>

                        <Form noValidate validated={validated} onSubmit={handleSubmit} className='addAbout'>
                            <Form.Group className="mb-3" controlId="validationCustom02">
                                <Form.Label>Add image to slider with aspect-ratio 21/9 </Form.Label>
                                <Form.Control
                                    required
                                    type="file"
                                    onChange={imagOnChange} name='dlimg' accept="image/*" multiple
                                />
                            </Form.Group>
                            {/* ///////// */}

                            <hr />
                            <button type="submit" className='formButton'>add images</button>
                        </Form>
                    </div>

                </div >
                <div className='sliderxhom'>
                </div>
                <div className='productsTitle'>
                    current slider
                </div>
                <div className='currentSlider'>
                    <div className='slider'>
                        <Carousel data-bs-theme="dark" style={{ overflow: "heddin" }}>
                            {allSlider?.map((itame, index) => (
                                <Carousel.Item style={{ overflow: "heddin" }} key={index}>
                                    <img
                                        className="w-100 homeImg"
                                        src={itame?.image}
                                        alt="First slide"
                                    />
                                    <Carousel.Caption>
                                    </Carousel.Caption>
                                </Carousel.Item>

                            ))}
                        </Carousel>
                    </div>
                    {/* ///////// */}
                    <hr />
                    <div className='currentImgs'>
                        {allSlider?.map((item, index) => (
                            <div className='sliderItame' key={index}>

                                <img style={{ width: "100%" }} src={item?.image} alt="" />
                                <div className='deleteImageSlider' onClick={() => deleteimage(item?._id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width={40} height={40} viewBox="0 0 14 14" ><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M12.5.5h-11a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-11a1 1 0 0 0-1-1m-12 3h13m-4.5 7l-4-4m4 0l-4 4"></path></svg>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>

            </div >
        </>
    )
}

export default Settings;
