import React, { useState } from 'react';
import './addProduct.css'
import { Col, Form, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { postProduct } from '../../RTK/product/postProductSlice';
import { Toaster } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import Cookies from 'universal-cookie';

const AddProduct = (props) => {
    //////////////////////////////
    const cookies = new Cookies();
    let lng = ''
    let token = '' 
    if (cookies.get('token') !== undefined || null) {
        token = true
    } else token = false
    if (cookies.get('i18next') === "ar") {
        lng = "ar"
    } else lng = "en"
    //////////////////////////////
    const [open, setOpen] = useState(false)
    const [reload, setReload] = useState(true);
    const [validated, setValidated] = useState(false);
    const [imagesSquer, setImagesSquer] = useState([]);
    const [images, setImages] = useState([]);
    const [name, setName] = useState('');
    const [nameAr, setNameAr] = useState('');
    const [description, setDescription] = useState('');
    const [descriptionAr, setDescriptionAr] = useState('');
    const [price, setPrice] = useState('');
    const [sellInPoints, setSellInPoints] = useState(false);
    const [priceInPoints, setPriceInPoints] = useState('');
    const [pointsEarned, setPointsEarned] = useState(0);
    ///////////////////////////////////////////////////
    const dispatch = useDispatch()
    ///////////////////////////////////////////////////
    const imagOnChange = e => {
        const fileArray = Array.from(e.target.files)
        fileArray.map(f => f["id"] = Math.random() * Math.pow(10, 16))
        setImages(fileArray)

        const fileArraySquer = Array.from(e.target.files[0])
        fileArraySquer.map((f, index) => (f["id"] = Math.random() * Math.pow(10, 16),
            f["URL"] = URL.createObjectURL(e.target?.files[index])))
        setImagesSquer(fileArraySquer)
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
            images.forEach(image => { formData.append("images", image); });
            formData.append('name', name);
            formData.append('nameAr', nameAr);
            formData.append('description', description);
            formData.append('descriptionAr', descriptionAr);
            formData.append('category', props.categoryId)
            formData.append('isAvailableToSellInPoints', sellInPoints)
            formData.append('price', price);
            formData.append('priceInPoints', priceInPoints);
            formData.append('pointsEarned', pointsEarned);
            dispatch(postProduct(formData))
            props.handelReload()
            console.log([...formData])
        }
    };
    //////////////////////////
    const { t } = useTranslation();
    return (
        <>
            <Toaster />
            <div className='addProductContener'>
                <div className="newProduct" >
                    <div className={open ? 'addProductOpen' : "addProductColse"}>
                        <div className='productHader'>
                            <div >  {t('category.addProductHeader')} </div>
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
                                    <Form.Label>{t('category.productImage')}</Form.Label>
                                    <Form.Control
                                        required
                                        type="file"
                                        onChange={imagOnChange} name='dlimg' accept="image/*" multiple
                                    />
                                </Form.Group>
                                <Row >
                                    <Form.Group as={Col} md="6" className="mb-3" controlId="validationCustom01">
                                        <Form.Label>{t('category.productNameAr')}</Form.Label>
                                        <Form.Control
                                            placeholder={t("public.write")}
                                            required
                                            type="text"
                                            onChange={(e) => setNameAr(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Form.Group as={Col} md="6" className="mb-3" controlId="validationCustom01">
                                        <Form.Label>{t('category.productNameEn')}</Form.Label>
                                        <Form.Control
                                            placeholder={t("public.write")}
                                            required
                                            type="text"
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </Form.Group>
                                </Row>
                                <Row >
                                    <Form.Group as={Col} md="4" className="mb-3" controlId="validationCustom01">
                                        <Form.Label> {t('category.productPrice')}</Form.Label>
                                        <Form.Control
                                            placeholder={t("public.write")}
                                            required
                                            type="text"
                                            onChange={(e) => setPrice(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Form.Group as={Col} md="4" className="mb-3" controlId="validationCustom01">
                                        <div className='byPoints'>
                                            <Form.Check // prettier-ignore
                                                type='checkbox'
                                                onChange={(e) => (setSellInPoints(!sellInPoints), setPriceInPoints(""))}
                                            />
                                            <Form.Label>{t('category.priceByPoints')}</Form.Label>
                                        </div>
                                        <Form.Control
                                            value={priceInPoints}
                                            required
                                            disabled={!sellInPoints}
                                            type="number"
                                            onChange={(e) => setPriceInPoints(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Form.Group as={Col} md="4" className="mb-3" controlId="validationCustom01">
                                        <Form.Label>{t('category.pointsEarned')} </Form.Label>
                                        <Form.Control
                                            required
                                            type="number"
                                            onChange={(e) => setPointsEarned(e.target.value)}
                                        />
                                    </Form.Group>
                                </Row>
                                <Form.Group className="mb-3" controlId="validationCustom01">
                                    <Form.Label> {t('category.productDisAr')}</Form.Label>
                                    <Form.Control
                                        placeholder={t("public.write")}
                                        required
                                        type="text"
                                        onChange={(e) => setDescriptionAr(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="validationCustom01">
                                    <Form.Label> {t('category.productDisEn')}</Form.Label>
                                    <Form.Control
                                        placeholder={t("public.write")}
                                        required
                                        type="text"
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </Form.Group>
                                {/* <Form.Group className="mb-3" controlId="validationCustom01">
                                    <div className='rowEdit'>
                                        <div className='addCategory1'>
                                            <div className='addCategory2'>
                                                <div className='addCategory3'>
                                                    <Form.Label> {t('category.availableSizes')}</Form.Label>
                                                    <Form.Control
                                                        required
                                                        type="text"
                                                        onChange={(e) => setSize(e.target.value)}
                                                    />
                                                </div>
                                                <h5>{t('category.by')} </h5>
                                                <div className='addCategory3'>
                                                    <Form.Label>{t('category.priceByMoney')}</Form.Label>
                                                    <Form.Control
                                                        required
                                                        type="number"
                                                        onChange={(e) => setPriceSize(e.target.value)}
                                                    />
                                                </div>
                                                <h5> / </h5>
                                                <div className='addCategory3'>
                                                    <div className='byPoints'>
                                                        <Form.Check // prettier-ignore
                                                            type='checkbox'
                                                            onChange={(e) => (setSellInPoints(!sellInPoints), setPriceInPoints(""))}
                                                        />
                                                        <Form.Label>{t('category.priceByPoints')}</Form.Label>
                                                    </div>
                                                    <Form.Control
                                                        value={priceInPoints}
                                                        required
                                                        disabled={!sellInPoints}
                                                        type="number"
                                                        onChange={(e) => setPriceInPoints(e.target.value)}
                                                    />
                                                </div>
                                                <h5> / </h5>
                                                <div className='addCategory3'>
                                                    <Form.Label>{t('category.pointsEarned')} </Form.Label>
                                                    <Form.Control
                                                        required
                                                        type="number"
                                                        onChange={(e) => setEarned(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='editPro' style={{ border: "3px solid #f1c92f" }}
                                            onClick={sizePriceOnChange}
                                        > {t('public.addButton')}</div>
                                        <div className='editPro' style={{ border: "3px solid #f1c92f" }}
                                            onClick={() => clearAllSize()}
                                        > {t('public.clear')} </div>
                                    </div>
                                    <div className='sizeBody'>
                                        {prices?.length != 0 &&
                                            <tr className='haderSizeline'>
                                                <span className='sizeCall1'>  {t('category.size')}</span>
                                                <span className='sizeCall1'>  {t('category.priceByMoney')}</span>
                                                <span className='sizeCall1'>  {t('category.priceByPoints')}</span>
                                                <span className='sizeCall1'> {t('category.pointsEarned')}</span>
                                            </tr>}
                                        {prices?.map((size, index) => (
                                            <tr
                                                className='sizeLine'
                                                key={index}
                                            >
                                                <span className='sizeCall1' >  {size?.size}
                                                    <div className='colorItemDelete'
                                                        onClick={() => { deleteSize(size?.priceId) }}
                                                    >
                                                        <svg className='increaseICon' xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 32 32" fill="#00000" transform="rotate(45)" >
                                                            <path id="Path_2299" data-name="Path 2299" d="M4,0H28a4,4,0,0,1,0,8H4A4,4,0,0,1,4,0Z" transform="translate(0 12)" />
                                                            <path id="Path_2298" data-name="Path 2298" d="M4,0H28a4,4,0,0,1,0,8H4A4,4,0,0,1,4,0Z" transform="translate(12 32) rotate(-90)" />
                                                        </svg>
                                                    </div>
                                                </span>
                                                <span className='sizeCall1'>  {size?.price}.{t("public.sar")} </span>
                                                <span className='sizeCall1'> {size?.priceInPoints == 0 ? "No" : size?.priceInPoints}.{t("public.point")}</span>
                                                <span className='sizeCall1'> {size?.priceInPoints == 0 ? "No" : size?.pointsEarned}.{t("public.point")}  </span>
                                            </tr>
                                        ))}
                                    </div>
                                </Form.Group> */}
                                {/* <Form.Group className="mb-3" controlId="validationCustom01">
                                    <Form.Label>{t('category.color')}</Form.Label>
                                    <div className='rowEdit'>
                                        <div className='addCategory1'>
                                            <Form.Control
                                                required
                                                type="color"
                                                onChange={(e) => setColor(e.target.value)}
                                            />
                                        </div>
                                        <div className='editPro' style={{ border: "3px solid #f1c92f" }}
                                            onClick={() => colorOnChange(color)}
                                        >  {t('public.addButton')} </div>
                                        <div className='editPro' style={{ border: "3px solid #f1c92f" }}
                                            onClick={() => clearAllColors()}
                                        >  {t('public.clear')} </div>
                                    </div>
                                    <div className='colorMap' >
                                        {colors.map((color, index) => (
                                            <div className='colorItem'
                                                key={index}
                                                style={{ backgroundColor: `${color.colorName}` }} >
                                                <div className='colorItemDelete'
                                                    onClick={() => { deleteColor(color.colorId) }}
                                                >
                                                    <svg className='increaseICon' xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 32 32" fill="#ffffff" transform="rotate(45)" >
                                                        <path id="Path_2299" data-name="Path 2299" d="M4,0H28a4,4,0,0,1,0,8H4A4,4,0,0,1,4,0Z" transform="translate(0 12)" />
                                                        <path id="Path_2298" data-name="Path 2298" d="M4,0H28a4,4,0,0,1,0,8H4A4,4,0,0,1,4,0Z" transform="translate(12 32) rotate(-90)" />
                                                    </svg>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </Form.Group> */}
                                {/* //////////// */}
                                <hr className='tapp' />
                                <button type="submit" className='formButton'  >
                                    {t('public.addButton')}
                                </button>
                            </Form>
                        </div>
                    </div>

                </div>
            </div >
        </>
    );
}

export default AddProduct;
