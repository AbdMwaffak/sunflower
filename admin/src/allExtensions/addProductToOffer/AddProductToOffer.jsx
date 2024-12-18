import React, { useState } from 'react';
import './addProductToOffer.css'
import { Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addProductToOffer } from '../../RTK/offers/addProductToOfferSlice';
import { Toaster } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

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
    ////////////////////////////////////
    const { t, i18n } = useTranslation();
    return (
        <>
            <Toaster />

            <div className='addProductContener'>
                <div className='addProduct'>
                    <div className={open ? "newProductOpen" : "newProductClose"}>
                        <div className='productHader'>
                            <div >  {t('editOffer.addProductHeader')}</div>
                            <div onClick={() => setOpen(!open)}>
                                <svg className={open ? "productArrwOpen" : "productArrwClose"}
                                    viewBox="0 0 16 16" fill="#fff" >
                                    <path d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
                                </svg>
                            </div>
                        </div>
                        <div className={!open ? "hiddenBody" : 'unHiddenBody'} >
                            <hr className='hrProduct' />
                            <Form noValidate validated={validated} onSubmit={handleSubmit} className='addCategory1'>
                                <Form.Group className="mb-3" controlId="validationCustom01">
                                    <Form.Label> {t('editOffer.productImage')}</Form.Label>

                                    <Form.Control
                                        required
                                        type="file"
                                        onChange={imagOnChange} name='dlimg' accept="image/*" multiple
                                    />

                                </Form.Group>
                                {/* //////////// */}
                                {/* <Form.Group md="6" className="mb-3" controlId="validationCustom01">
                                    <Form.Label> {t('editOffer.productNameAr')}</Form.Label>
                                    <Form.Control
                                        placeholder="write name here"
                                        required
                                        type="text"
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </Form.Group> */}
                                {/* //////////// */}
                                <Form.Group md="6" className="mb-3" controlId="validationCustom01">
                                    <Form.Label> {t('editOffer.productNameEn')}</Form.Label>
                                    <Form.Control
                                        placeholder="write name here"
                                        required
                                        type="text"
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </Form.Group>
                                {/* //////////// */}
                                {/* <Form.Group className="mb-3" controlId="validationCustom01">
                                    <Form.Label>{t('editOffer.productDisAr')}</Form.Label>
                                    <Form.Control
                                        placeholder="write description here "
                                        required
                                        type="text"
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </Form.Group> */}
                                {/* //////////// */}
                                <Form.Group className="mb-3" controlId="validationCustom01">
                                    <Form.Label>{t('editOffer.productDisEn')}</Form.Label>
                                    <Form.Control
                                        placeholder="write description here "
                                        required
                                        type="text"
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </Form.Group>
                                <hr className='tapp' />
                                <button type="submit" className='formButton'  >
                                    {t('editOffer.addProduct')}
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
