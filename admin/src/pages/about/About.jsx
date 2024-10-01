import React, { useEffect, useState } from 'react';
import './about.css'
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { getAllabout } from '../../RTK/about/getAllaboutSlice';
import { addabout } from '../../RTK/about/addaboutSlice';
import AboutElement from '../../allExtensions/aboutElement/AboutElement';
import SuccessfulMessage from '../../allExtensions/successfulMessage/SuccessfulMessage';
import { Toaster } from 'react-hot-toast';
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
                <div className='myAboutTitle'>
                    About My store
                </div>
                <div className='editeCategoryContener'>
                    <div className='newAbout'>

                        <Form noValidate validated={validated} onSubmit={handleSubmit} className='addAbout'>
                            <Form.Group className="mb-3" controlId="validationCustom02">
                                <Form.Label>Add Title </Form.Label>
                                <Form.Control
                                    type="string"
                                    placeholder="write title here"
                                    required
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </Form.Group>
                            {/* ///////// */}
                            <Form.Group className="mb-3 " controlId="validationCustom02">
                                <Form.Label>Add description </Form.Label>
                                <Form.Control
                                    className='textarea2'
                                    as="textarea"
                                    type="text"
                                    placeholder="write description here "
                                    required
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </Form.Group>
                            <hr />
                            <button type="submit" className='formButton'>Submit form</button>
                        </Form>
                    </div>
                </div >
                <div className='currentAbout'>
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
