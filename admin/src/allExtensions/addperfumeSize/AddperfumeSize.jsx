import React, { useState } from 'react';
import './addperfumeSize.css'
import { Col, Form, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { postProduct } from '../../RTK/product/postProductSlice';
import { postNewSize } from '../../RTK/perfume/postNewSizeSlice';

const AddperfumeSize = (props) => {

    const [open, setOpen] = useState(false)
    const [reload, setReload] = useState(true);
    const [validated, setValidated] = useState(false);

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    ///////////////////////////////////////////////////
    const dispatch = useDispatch()
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
            const value = {
                size: name,
                price: price,
            }
            const reqobj = {
                id: props.id,
                value: value
            }
            dispatch(postNewSize(reqobj))
            props.handleReload
        }
    };
    return (
        <div className='addProductContener'>
            <div className={open ? "newProductOpen" : "newProductClose"}>

                <div className='addProduct'>
                    <div className='productHader'>
                        <div >add a new sizes to perfume category </div>
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

                            {/* //////////// */}
                            <Row >
                                <Form.Group as={Col} md="6" className="mb-3" controlId="validationCustom01">

                                    <Form.Label> size name</Form.Label>

                                    <Form.Control
                                        placeholder='set anew size'
                                        required
                                        type="text"
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </Form.Group>
                                {/* //////////// */}
                                <Form.Group as={Col} md="6" className="mb-3" controlId="validationCustom01">

                                    <Form.Label> perfume size price</Form.Label>

                                    <Form.Control
                                        placeholder='set anew price'
                                        required
                                        type="number"
                                        onChange={(e) => setPrice(parseInt(e.target.value))}
                                    />
                                </Form.Group>
                            </Row>
                            {/* //////////// */}
                            <hr />
                            <button type="submit" className='formButton'  >
                                add new size
                            </button>
                        </Form>
                    </div>
                </div>
            </div>
        </div >

    );
}

export default AddperfumeSize;
