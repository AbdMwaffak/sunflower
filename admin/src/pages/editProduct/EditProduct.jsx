import React, { useEffect, useState } from 'react';
import './editProduct.css';
import Carousel from 'react-bootstrap/Carousel';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProductById } from '../../RTK/product/getProductByIdSlice ';
import { patchProductById } from '../../RTK/product/patchProductByIdSlice';
import { Form } from 'react-bootstrap';
import Api from '../../allExtensions/API';
import { Toaster } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import Cookies from 'universal-cookie';

const EditProduct = () => {
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
    const id = useParams().productId
    const product = useSelector(state => state.getProductById).data
    /////////////////////////////////////////////
    const dispatch = useDispatch()
    /////////////////////////////////////////////
    const [imagesSquer, setImagesSquer] = useState([]);
    const [images, setImages] = useState([]);
    const [imagesForm, setImagesForm] = useState(false);
    const [name, setName] = useState(" ");
    const [nameAr, setNameAr] = useState(" ");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState(" ");
    const [descriptionAr, setDescriptionAr] = useState(" ");
    const [size, setSize] = useState('');
    const [priceSize, setPriceSize] = useState(0);
    const [prices, setPrices] = useState([]);
    const [priceNew, setPriceNew] = useState([]);
    const [sellInPoints, setSellInPoints] = useState(false);
    const [priceInPoints, setPriceInPoints] = useState(0);
    const [earned, setEarned] = useState(0);
    const [colorsNew, setcolorsNew] = useState([]);
    const [colors, setColors] = useState([]);
    const [color, setColor] = useState('');
    const [reload, setReload] = useState(true);
    const [validatedName, setValidatedName] = useState(false);
    const [validatedPrice, setValidatedPrice] = useState(false);
    const [validatedDescriptio, setValidatedDescriptio] = useState(false);
    const [validatedSize, setValidatedSize] = useState(false);
    const [validatedColor, setValidatedColor] = useState(false);
    const [validatedImages, setValidatedImages] = useState(false);
    ///////////////////////////////////////////////
    const imagOnChange = e => {
        const fileArray = Array.from(e.target.files)
        fileArray.map(f => f["id"] = Math.random() * Math.pow(10, 16))
        setImages(fileArray)
        const fileArraySquer2 = []
        const fileArraySquer = Array.from(e.target.files)
        fileArraySquer.map((f, index) => (
            fileArraySquer2.push(URL.createObjectURL(e.target?.files[index]))))
        setImagesSquer(fileArraySquer2)
        setImagesForm(true)
    }
    //////////////////////////////////////////////////////
    const colorOnChange = e => {
        if (color != '')
            setColors(cur => [...cur, {
                colorName: e,
                colorId: Math.random() * Math.pow(10, 16)
            }])
    }
    /////////////////////////////////////////////////////////////
    const clearAllColors = () => {
        setColors([])
    }
    /////////////////////////////////////////////////////////////
    const deleteColor = key => {
        setColors(cur => cur.filter((item) => item.colorId !== key))
    }
    ///////////////////////////////////////////////////////////
    const sizePriceOnChange = () => {
        if (size != ' ' && priceSize != 0 && ((priceInPoints != 0 && sellInPoints) || (priceInPoints == 0 && !sellInPoints)))
            setPrices(cur => [...cur, {
                size: size,
                price: priceSize,
                pointsEarned: earned,
                priceInPoints: priceInPoints,
                isAvailableToSellInPoints: sellInPoints,
                priceId: Math.random() * Math.pow(10, 16)
            }])
    }
    ///////////////////////////////////////////////////
    const clearAllSize = () => {
        setPrices([])
    }
    ///////////////////////////////////////////////////
    const deleteSize = key => {
        setPrices(cur => cur.filter((item) => item.priceId !== key))
    }
    ///////////////////////////////////////////////////
    const handleSubmitImages = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setValidatedImages(true);
        }
        else {
            const formData = new FormData();
            for (const image of images) {
                formData.append("images", image);
            }

            const value = {
                reqobj: formData,
                id: id
            }
            dispatch(patchProductById(value))
            setReload(!reload)
            setImagesForm(false)
        }
    };
    ///////////////////////////////////////////////////
    useEffect(
        function () {
            document.title = `SUNFLOWER - ${product?.name}`;
            return function () { document.title = 'SUNFLOWER' };
        }, [product?.name])
    ////////////////////////////////////
    const handleSubmitName = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setValidatedName(true);
        }
        else {
            const formData = new FormData();
            formData.append('name', name);
            const value = {
                reqobj: formData,
                id: id
            }
            dispatch(patchProductById(value))
            setReload(!reload)
        }
    };
    ///////////////////////////////////////////////////
    const handleSubmitNameAr = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setValidatedName(true);
        }
        else {
            const formData = new FormData();
            formData.append('nameAr', nameAr);
            const value = {
                reqobj: formData,
                id: id
            }
            dispatch(patchProductById(value))
            setReload(!reload)
        }
    };
    ///////////////////////////////////////////////////
    const handleSubmitPrice = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setValidatedPrice(true);
        }
        else {
            const formData = new FormData();
            formData.append('price', price);
            const value = {
                reqobj: formData,
                id: id
            }
            dispatch(patchProductById(value))
            setReload(!reload)
        }
    };
    ///////////////////////////////////////////////////
    const handleSubmitDescription = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setValidatedDescriptio(true);
        }
        else {
            const formData = new FormData();
            formData.append('description', description);
            const value = {
                reqobj: formData,
                id: id
            }
            dispatch(patchProductById(value))
            setReload(!reload)
        }
    };
    ///////////////////////////////////////////////////
    const handleSubmitDescriptionAr = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setValidatedDescriptio(true);
        }
        else {
            const formData = new FormData();
            formData.append('descriptionAr', descriptionAr);
            const value = {
                reqobj: formData,
                id: id
            }
            dispatch(patchProductById(value))
            setReload(!reload)
        }
    };
    ///////////////////////////////////////////////////
    const handleSubmitSize = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setValidatedSize(true);
        }
        else {
            const formData = new FormData();
            prices.forEach(price => {
                const value =
                {
                    size: price.size,
                    price: price.price,
                    pointsEarned: price.pointsEarned,
                    priceInPoints: price.priceInPoints,
                    isAvailableToSellInPoints: price.isAvailableToSellInPoints
                }
                priceNew.push(value)
            })
            formData.append('sizes', JSON.stringify(priceNew));
            const value = {
                reqobj: formData,
                id: id
            }
            dispatch(patchProductById(value))
            setReload(!reload)
            setcolorsNew([])
        }
    };
    ///////////////////////////////////////////////////
    const handleSubmitColor = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setValidatedColor(true);
        }
        else {
            const formData = new FormData();
            for (const color of colors) {
                colorsNew.push(color.colorName)
            }
            formData.append("colors", JSON.stringify(colorsNew));
            const value = {
                reqobj: formData,
                id: id
            }
            dispatch(patchProductById(value))
            setReload(!reload)
            setcolorsNew([])
        }
    };
    ///////////////////////////////////////////////////////////
    useEffect(() => {
        dispatch(getProductById(id))
    }, [dispatch, id, reload])
    //////////////////////////////////////////////////////////
    const { t, i18n } = useTranslation();
    return (
        <>
            <Toaster />
            <div className='editProduct'>
                <div className='title'>
                    {lng == "ar" ? product.nameAr : product.name}
                </div>
                <div className='editeContener'>
                    <div className='updateProduct'>
                        <div className='editProductContainer'>
                            <Form noValidate validated={validatedName} onSubmit={handleSubmitImages} className='addCategory1'>
                                <Form.Group className="mb-3" controlId="validationCustom01">
                                    <Form.Label>{t('product.editProductImgage')}</Form.Label>
                                    <div className='rowEdit'>
                                        <div className='addCategory1'>
                                            <Form.Control
                                                required
                                                type="file"
                                                onChange={imagOnChange} name='dlimg' accept="image/*" multiple
                                            />
                                        </div>
                                        <button type="submit" className='editInfo'  >
                                            <svg className='svgEdit' xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 24 24" ><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.946 3.173c.587-.587.88-.88 1.206-1.021c.469-.203 1-.203 1.469 0c.325.14.619.434 1.206 1.021s.88.881 1.021 1.206c.203.469.203 1 0 1.469c-.14.325-.434.619-1.021 1.206l-5.022 5.022c-1.237 1.237-1.855 1.855-2.63 2.222s-1.646.452-3.387.624L9 15l.078-.788c.172-1.741.257-2.612.624-3.387s.985-1.393 2.222-2.63zM6 15H3.75a1.75 1.75 0 1 0 0 3.5h9.5a1.75 1.75 0 1 1 0 3.5H11" color="currentColor"></path></svg>
                                        </button>
                                    </div>
                                </Form.Group>
                            </Form>
                            <Form noValidate validated={validatedName} onSubmit={handleSubmitNameAr} className='addCategory1'>
                                <Form.Group className="mb-3" controlId="validationCustom01">
                                    <Form.Label>{t('product.editProductNameAr')}</Form.Label>
                                    <div className='rowEdit'>
                                        <div className='addCategory1'>
                                            <Form.Control
                                                placeholder={product?.nameAr}
                                                required
                                                type="string"
                                                onChange={(e) => setNameAr(e.target.value)}
                                            />
                                        </div>
                                        <button type="submit" className='editInfo'  >
                                            <svg className='svgEdit' xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 24 24" ><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.946 3.173c.587-.587.88-.88 1.206-1.021c.469-.203 1-.203 1.469 0c.325.14.619.434 1.206 1.021s.88.881 1.021 1.206c.203.469.203 1 0 1.469c-.14.325-.434.619-1.021 1.206l-5.022 5.022c-1.237 1.237-1.855 1.855-2.63 2.222s-1.646.452-3.387.624L9 15l.078-.788c.172-1.741.257-2.612.624-3.387s.985-1.393 2.222-2.63zM6 15H3.75a1.75 1.75 0 1 0 0 3.5h9.5a1.75 1.75 0 1 1 0 3.5H11" color="currentColor"></path></svg>
                                        </button>
                                    </div>
                                </Form.Group>
                            </Form>
                            <Form noValidate validated={validatedName} onSubmit={handleSubmitName} className='addCategory1'>
                                <Form.Group className="mb-3" controlId="validationCustom01">
                                    <Form.Label>{t('product.editProductNameEn')}</Form.Label>
                                    <div className='rowEdit'>
                                        <div className='addCategory1'>
                                            <Form.Control
                                                placeholder={product?.name}
                                                required
                                                type="string"
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                        </div>
                                        <button type="submit" className='editInfo'  >
                                            <svg className='svgEdit' xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 24 24" ><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.946 3.173c.587-.587.88-.88 1.206-1.021c.469-.203 1-.203 1.469 0c.325.14.619.434 1.206 1.021s.88.881 1.021 1.206c.203.469.203 1 0 1.469c-.14.325-.434.619-1.021 1.206l-5.022 5.022c-1.237 1.237-1.855 1.855-2.63 2.222s-1.646.452-3.387.624L9 15l.078-.788c.172-1.741.257-2.612.624-3.387s.985-1.393 2.222-2.63zM6 15H3.75a1.75 1.75 0 1 0 0 3.5h9.5a1.75 1.75 0 1 1 0 3.5H11" color="currentColor"></path></svg>
                                        </button>
                                    </div>
                                </Form.Group>
                            </Form>
                            <Form noValidate validated={validatedPrice} onSubmit={handleSubmitPrice} className='addCategory1'>
                                <Form.Group className="mb-3" controlId="validationCustom01">
                                    <Form.Label>{t('product.editproductPrice')}</Form.Label>
                                    <div className='rowEdit'>
                                        <div className='addCategory1'>
                                            <Form.Control
                                                placeholder={`${product?.price}.${t("public.sar")}`}
                                                required
                                                type="text"
                                                onChange={(e) => setPrice(e.target.value)}
                                            />
                                        </div>
                                        <button type="submit" className='editInfo'  >
                                            <svg className='svgEdit' xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 24 24" ><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.946 3.173c.587-.587.88-.88 1.206-1.021c.469-.203 1-.203 1.469 0c.325.14.619.434 1.206 1.021s.88.881 1.021 1.206c.203.469.203 1 0 1.469c-.14.325-.434.619-1.021 1.206l-5.022 5.022c-1.237 1.237-1.855 1.855-2.63 2.222s-1.646.452-3.387.624L9 15l.078-.788c.172-1.741.257-2.612.624-3.387s.985-1.393 2.222-2.63zM6 15H3.75a1.75 1.75 0 1 0 0 3.5h9.5a1.75 1.75 0 1 1 0 3.5H11" color="currentColor"></path></svg>
                                        </button>
                                    </div>
                                </Form.Group>
                            </Form>
                            <Form noValidate validated={validatedDescriptio} onSubmit={handleSubmitDescriptionAr} className='addCategory1'>
                                <Form.Group className="mb-3" controlId="validationCustom01">
                                    <Form.Label>{t('product.editProductDisAr')}</Form.Label>
                                    <div className='rowEdit'>
                                        <div className='addCategory1'>
                                            <Form.Control
                                                placeholder={product?.descriptionAr}
                                                className='textarea2'
                                                as="textarea"
                                                required
                                                type="string"
                                                onChange={(e) => setDescriptionAr(e.target.value)}
                                            />
                                        </div>
                                        <button type="submit" className='editInfo'  >
                                            <svg className='svgEdit' xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 24 24" ><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.946 3.173c.587-.587.88-.88 1.206-1.021c.469-.203 1-.203 1.469 0c.325.14.619.434 1.206 1.021s.88.881 1.021 1.206c.203.469.203 1 0 1.469c-.14.325-.434.619-1.021 1.206l-5.022 5.022c-1.237 1.237-1.855 1.855-2.63 2.222s-1.646.452-3.387.624L9 15l.078-.788c.172-1.741.257-2.612.624-3.387s.985-1.393 2.222-2.63zM6 15H3.75a1.75 1.75 0 1 0 0 3.5h9.5a1.75 1.75 0 1 1 0 3.5H11" color="currentColor"></path></svg>
                                        </button>
                                    </div>
                                </Form.Group>
                            </Form>
                            <Form noValidate validated={validatedDescriptio} onSubmit={handleSubmitDescription} className='addCategory1'>
                                <Form.Group className="mb-3" controlId="validationCustom01">
                                    <Form.Label>{t('product.editProductDisEn')}</Form.Label>
                                    <div className='rowEdit'>
                                        <div className='addCategory1'>
                                            <Form.Control
                                                placeholder={product?.description}
                                                className='textarea2'
                                                as="textarea"
                                                required
                                                type="string"
                                                onChange={(e) => setDescription(e.target.value)}
                                            />
                                        </div>
                                        <button type="submit" className='editInfo'  >
                                            <svg className='svgEdit' xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 24 24" ><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.946 3.173c.587-.587.88-.88 1.206-1.021c.469-.203 1-.203 1.469 0c.325.14.619.434 1.206 1.021s.88.881 1.021 1.206c.203.469.203 1 0 1.469c-.14.325-.434.619-1.021 1.206l-5.022 5.022c-1.237 1.237-1.855 1.855-2.63 2.222s-1.646.452-3.387.624L9 15l.078-.788c.172-1.741.257-2.612.624-3.387s.985-1.393 2.222-2.63zM6 15H3.75a1.75 1.75 0 1 0 0 3.5h9.5a1.75 1.75 0 1 1 0 3.5H11" color="currentColor"></path></svg>
                                        </button>
                                    </div>
                                </Form.Group>
                            </Form>
                            <hr className='tapp' />
                            <Form noValidate validated={validatedSize} onSubmit={handleSubmitSize} className='addCategory1'>
                                <Form.Group className="mb-3" controlId="validationCustom01">
                                    {/* .................. */}
                                    <div className='rowEdit'>
                                        <div className='addCategory1'>
                                            <div className='addCategory2'>
                                                <div className='addCategory3'>
                                                    <Form.Label> {t('product.availableSizes')}</Form.Label>
                                                    <Form.Control
                                                        required
                                                        type="text"
                                                        onChange={(e) => setSize(e.target.value)}
                                                    />
                                                </div>
                                                <h5>{t('product.by')} </h5>
                                                <div className='addCategory3'>
                                                    <Form.Label>{t('product.priceByMoney')}</Form.Label>
                                                    <Form.Control
                                                        required
                                                        type="text"
                                                        onChange={(e) => setPriceSize(e.target.value)}
                                                    />
                                                </div>
                                                <h5> / </h5>
                                                <div className='addCategory3'>
                                                    <div className='byPoints'>
                                                        <Form.Check
                                                            type='checkbox'
                                                            onChange={(e) => (setSellInPoints(!sellInPoints), setPriceInPoints(""))}
                                                        />
                                                        <Form.Label>{t('product.priceByPoints')} </Form.Label>
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
                                                    <Form.Label>{t('product.pointsEarned')}</Form.Label>
                                                    <Form.Control
                                                        required
                                                        type="number"
                                                        onChange={(e) => setEarned(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='editPro' style={{ border: "3px solid var(--primary-yellow)" }}
                                            onClick={sizePriceOnChange}
                                        >  {t('public.addButton')}</div>
                                        <div className='editPro' style={{ border: "3px solid #f1c92f" }}
                                            onClick={() => clearAllSize()}
                                        >  {t('public.clear')} </div>
                                        <button type="submit" className='editInfo'  >
                                            <svg className='svgEdit' xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 24 24" ><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.946 3.173c.587-.587.88-.88 1.206-1.021c.469-.203 1-.203 1.469 0c.325.14.619.434 1.206 1.021s.88.881 1.021 1.206c.203.469.203 1 0 1.469c-.14.325-.434.619-1.021 1.206l-5.022 5.022c-1.237 1.237-1.855 1.855-2.63 2.222s-1.646.452-3.387.624L9 15l.078-.788c.172-1.741.257-2.612.624-3.387s.985-1.393 2.222-2.63zM6 15H3.75a1.75 1.75 0 1 0 0 3.5h9.5a1.75 1.75 0 1 1 0 3.5H11" color="currentColor"></path></svg>
                                        </button>
                                    </div>
                                    <table className='sizeBody'>
                                        <thead className='ttt'>
                                            {prices?.length != 0 &&
                                                <tr className='haderSizeline'>
                                                    <td className='sizeCall1'> {t('product.size')} </td>
                                                    <td className='sizeCall1'> {t('product.priceByMoney')} </td>
                                                    <td className='sizeCall1'> {t('product.priceByPoints')} </td>
                                                    <td className='sizeCall1'>  {t('product.pointsEarned')} </td>

                                                </tr>}
                                        </thead>
                                        <tbody className='ttt'>
                                            {prices?.map((size, index) => (
                                                <tr className='sizeLine' key={index}   >
                                                    <td className='sizeCall1' >  {size?.size}

                                                        <div className='colorItemDelete'
                                                            onClick={() => { deleteSize(size?.priceId) }}
                                                        >
                                                            <svg className='increaseICon' xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 32 32" fill="#00000" transform="rotate(45)" >
                                                                <path id="Path_2299" data-name="Path 2299" d="M4,0H28a4,4,0,0,1,0,8H4A4,4,0,0,1,4,0Z" transform="translate(0 12)" />
                                                                <path id="Path_2298" data-name="Path 2298" d="M4,0H28a4,4,0,0,1,0,8H4A4,4,0,0,1,4,0Z" transform="translate(12 32) rotate(-90)" />
                                                            </svg>
                                                        </div>
                                                    </td>
                                                    <td className='sizeCall1'>  {size?.price} .{t("public.sar")} </td>
                                                    <td className='sizeCall1'> {size?.priceInPoints == 0 ? "No" : size?.priceInPoints}  .P</td>
                                                    <td className='sizeCall1'> {size?.priceInPoints == 0 ? "No" : size?.pointsEarned}  </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </Form.Group>
                            </Form>
                            <hr className='tapp' />
                            <Form noValidate validated={validatedColor} onSubmit={handleSubmitColor} className='addCategory1'>
                                <Form.Group className="mb-3" controlId="validationCustom01">
                                    <Form.Label>{t('product.color')} </Form.Label>
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
                                        >  {t('public.addButton')}</div>

                                        <div className='editPro' style={{ border: "3px solid #f1c92f" }}
                                            onClick={() => clearAllColors()}
                                        >  {t('public.clear')}  </div>

                                        <button type="submit" className='editInfo'  >
                                            <svg className='svgEdit' xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 24 24" ><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.946 3.173c.587-.587.88-.88 1.206-1.021c.469-.203 1-.203 1.469 0c.325.14.619.434 1.206 1.021s.88.881 1.021 1.206c.203.469.203 1 0 1.469c-.14.325-.434.619-1.021 1.206l-5.022 5.022c-1.237 1.237-1.855 1.855-2.63 2.222s-1.646.452-3.387.624L9 15l.078-.788c.172-1.741.257-2.612.624-3.387s.985-1.393 2.222-2.63zM6 15H3.75a1.75 1.75 0 1 0 0 3.5h9.5a1.75 1.75 0 1 1 0 3.5H11" color="currentColor"></path></svg>

                                        </button>
                                    </div>
                                    <div className='colorMap' >
                                        {colors?.map((color, index) => (
                                            <div className='colorItem'
                                                key={index}
                                                style={{ backgroundColor: `${color?.colorName}` }} >
                                                <div className='colorItemDelete'
                                                    onClick={() => { deleteColor(color?.colorId) }}
                                                >
                                                    <svg className='increaseICon' xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 32 32" fill="#ffffff" transform="rotate(45)" >
                                                        <path id="Path_2299" data-name="Path 2299" d="M4,0H28a4,4,0,0,1,0,8H4A4,4,0,0,1,4,0Z" transform="translate(0 12)" />
                                                        <path id="Path_2298" data-name="Path 2298" d="M4,0H28a4,4,0,0,1,0,8H4A4,4,0,0,1,4,0Z" transform="translate(12 32) rotate(-90)" />
                                                    </svg>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </Form.Group>
                            </Form>
                        </div>
                        <div className='editProductDisplay'>
                            <div className='newImageFlower'>
                                {imagesSquer.length == 0 &&
                                    <Carousel data-bs-theme="dark" >
                                        {product?.images?.map((image, index) => (
                                            <Carousel.Item key={index}  >
                                                <img className="w-100 imageCat" src={`${Api}/users/${image}`} />
                                            </Carousel.Item>
                                        ))}
                                    </Carousel>
                                }
                                {imagesSquer.length != 0 &&
                                    <Carousel data-bs-theme="dark" >
                                        {imagesSquer.map((image, index) => (
                                            <Carousel.Item key={index}  >
                                                <img className="imageCat" src={image} />
                                            </Carousel.Item>
                                        ))}
                                    </Carousel>
                                }
                            </div>
                            <div className='newTitleFlower'>
                                <div className='divInfo'> {t('product.name')}  : {name == " " ? lng == "ar" ? product?.nameAr : product?.name : name}   </div>
                                <hr className='tapp' />
                                <div className='divInfo'>{t('product.editproductPrice')}  : {price == 0 ? product?.price : price}.{t("public.sar")}  </div>
                                <hr className='tapp' />
                                <table className='sizeBody'>
                                    <thead className='ttt'>
                                        <tr className='haderSizeline'>
                                            <td className='sizeCall2'> {t('product.size')}  </td>
                                            <td className='sizeCall2'> {t('product.priceByMoney')} </td>
                                            <td className='sizeCall2'>  {t('product.priceByPoints')} </td>
                                            <td className='sizeCall2'> {t('product.pointsEarned')} </td>
                                        </tr>
                                    </thead>
                                    <tbody className='ttt'>
                                        {prices?.length == 0 &&
                                            <>
                                                {product?.sizes?.map((size, index) => (
                                                    <tr
                                                        className='sizeLine'
                                                        key={index}
                                                    >
                                                        <td className='sizeCall2' > ss {size?.size}  </td>
                                                        <td className='sizeCall2'>  {size?.price}.{t("public.sar")} </td>
                                                        <td className='sizeCall2'> {size?.priceInPoints == 0 ? "No" : size?.priceInPoints}.{t("public.point")}</td>
                                                        <td className='sizeCall2'> {size?.priceInPoints == 0 ? "No" : size?.pointsEarned}.{t("public.point")} </td>

                                                    </tr>
                                                ))}
                                            </>
                                        }
                                        {prices?.length != 0 &&
                                            <>
                                                {prices?.map((size, index) => (
                                                    <tr
                                                        className='sizeLine'
                                                        key={index}
                                                    >
                                                        <td className='sizeCall2' >  {size?.size}
                                                        </td>
                                                        <td className='sizeCall2'>  {size?.price}.{t("public.sar")} </td>
                                                        <td className='sizeCall2'> {size?.priceInPoints == 0 ? "No" : size?.priceInPoints} .{t("public.point")}</td>
                                                        <td className='sizeCall2'> {size?.priceInPoints == 0 ? "No" : size?.pointsEarned} .{t("public.point")}  </td>
                                                    </tr>
                                                ))}
                                            </>
                                        }
                                    </tbody>
                                </table>
                                <hr className='tapp' />
                                <div className='divInfo'>
                                    <div className='colorMap' >
                                        {colors?.length == 0 &&
                                            <>
                                                {product?.colors?.map((color, index) => (
                                                    <div className='colorItem'
                                                        key={index}
                                                        style={{ backgroundColor: `${color}` }} >
                                                    </div>
                                                ))}
                                            </>
                                        }
                                        {colors?.length != 0 &&
                                            <>
                                                {colors?.map((color, index) => (
                                                    <div className='colorItem'
                                                        key={index}
                                                        style={{ backgroundColor: `${color?.colorName}` }} >
                                                    </div>
                                                ))}
                                            </>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='supTitle' dir='rtl'>
                    <div > {t("product.information")}
                    </div>
                    <div> {lng == "ar" ? product.nameAr : product.name}
                    </div>
                </div>
                <div className='produtsInfoo'>
                    <div className='productPrice'>
                        [ {product.price} ].{t("public.sar")}
                    </div>
                    <div className='productDescription'>
                        <h3> {t('product.ProductDescriptionAr')}  </h3>
                        <hr className='tapp' />
                        <p> {product.descriptionAr} </p>
                    </div>
                    <div className='productDescription'>
                        <h3> {t('product.ProductDescriptionEn')}  </h3>
                        <hr className='tapp' />
                        <p> {product.description} </p>
                    </div>
                    <div className='productSize'>
                        <h3> {t('product.ProductSize')}  </h3>
                        <hr className='tapp' />
                        <table className='sizeBody'>
                            <thead className='ttt'>
                                <tr className='haderSizeline'>
                                    <td className='sizeCall2'> {t('product.size')}  </td>
                                    <td className='sizeCall2'> {t('product.priceByMoney')} </td>
                                    <td className='sizeCall2'>  {t('product.priceByPoints')} </td>
                                    <td className='sizeCall2'> {t('product.pointsEarned')} </td>
                                </tr>
                            </thead>
                            <tbody className='ttt'>
                                {product?.sizes?.map((size, index) => (
                                    <tr
                                        className='sizeLine'
                                        key={index}
                                    >
                                        <td className='sizeCall1' >  {size?.size}
                                        </td>
                                        <td className='sizeCall1'>  {size?.price}.{t("public.sar")} </td>
                                        <td className='sizeCall1'> {size?.priceInPoints == 0 ? "No" : size?.priceInPoints}.{t("public.point")}</td>
                                        <td className='sizeCall1'> {size?.priceInPoints == 0 ? "No" : size?.pointsEarned} .{t("public.point")} </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className='productColors'>
                        <h3> {t('product.ProductColors')}  </h3>
                        <hr className='tapp' />
                        <div className='colorMap' >
                            {product?.colors?.map((color, index) => (
                                <div className='colorItem'
                                    key={index}
                                    style={{ backgroundColor: `${color}` }} >
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
}

export default EditProduct;
