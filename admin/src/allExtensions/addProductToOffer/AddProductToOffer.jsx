import React, { useState } from 'react';
import './addProductToOffer.css'
import { Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addProductToOffer } from '../../RTK/offers/addProductToOfferSlice';
import { Toaster } from 'react-hot-toast';

const AddProductToOffer = (props) => {

    const [image, setImage] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const [open, setOpen] = useState(false)
    const [reload, setReload] = useState(true);
    const [validated, setValidated] = useState(false);
    const [imageSquer, setImageSquer] = useState([]);
    ///////////////////////////////////////////////////
    const dispatch = useDispatch()
    ///////////////////////////////////////////////////
    const imagOnChange = e => {
        setImage(e.target.files[0])
        setImageSquer(URL.createObjectURL(e.target.files[0]))
    }
    ///////////////////////////////////////////////////
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
            formData.append("image", image);
            formData.append('name', name);
            formData.append('description', description);

            const value = {
                reqobj: formData,
                id: props.offerId
            }
            dispatch(addProductToOffer(value))
            props.handelReload()
        }
    };


    return (
        <>
            <Toaster />

            <div className='addProductContener'>
                <div className={open ? "newProductOpen" : "newProductClose"}>

                    <div className='addProduct'>
                        <div className='productHader'>
                            <div >  add produt to this offer </div>
                            <div onClick={() => setOpen(!open)}>
                                <svg className={open ? "productArrwOpen" : "productArrwClose"}
                                    viewBox="0 0 16 16" fill="#fff" >
                                    <path d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
                                </svg>
                            </div>
                        </div>
                        <div className={!open ? "hiddenBody" : ''} >
                            <hr className='hrProduct' />
                            <Form noValidate validated={validated} onSubmit={handleSubmit} className='addCategory1'>
                                <Form.Group className="mb-3" controlId="validationCustom01">
                                    <Form.Label>product image</Form.Label>

                                    <Form.Control
                                        required
                                        type="file"
                                        onChange={imagOnChange} name='dlimg' accept="image/*" multiple
                                    />

                                </Form.Group>
                                {/* //////////// */}

                                <Form.Group md="6" className="mb-3" controlId="validationCustom01">

                                    <Form.Label> product name</Form.Label>

                                    <Form.Control
                                        placeholder="write name here"
                                        required
                                        type="text"
                                        onChange={(e) => setName(e.target.value)}
                                    />


                                </Form.Group>


                                {/* //////////// */}
                                <Form.Group className="mb-3" controlId="validationCustom01">

                                    <Form.Label> product description</Form.Label>

                                    <Form.Control
                                        placeholder="write description here "
                                        required
                                        type="text"
                                        onChange={(e) => setDescription(e.target.value)}
                                    />



                                </Form.Group>





                                <hr />
                                <button type="submit" className='formButton'  >
                                    add product to offer
                                </button>
                            </Form>
                        </div>
                    </div>

                </div>
            </div >
        </>
    );
}

export default AddProductToOffer;
