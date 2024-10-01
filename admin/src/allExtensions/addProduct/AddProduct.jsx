import React, { useState } from 'react';
import './addProduct.css'
import { Col, Form, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { postProduct } from '../../RTK/product/postProductSlice';
import { Toaster } from 'react-hot-toast';

const AddProduct = (props) => {

    const [open, setOpen] = useState(false)
    const [reload, setReload] = useState(true);
    const [validated, setValidated] = useState(false);
    const [imagesSquer, setImagesSquer] = useState([]);
    const [images, setImages] = useState([]);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [size, setSize] = useState(' ');
    const [priceSize, setPriceSize] = useState(0);
    const [prices, setPrices] = useState([]);
    const [priceNew, setPriceNew] = useState([]);
    const [colors, setColors] = useState([]);
    const [colorsNew, setcolorsNew] = useState([]);
    const [color, setColor] = useState('');
    const [sellInPoints, setSellInPoints] = useState(false);
    const [priceInPoints, setPriceInPoints] = useState(0);
    const [earned, setEarned] = useState(0);


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
    const colorOnChange = e => {
        if (color != '')
            setColors(cur => [...cur, {
                colorName: e,
                colorId: Math.random() * Math.pow(10, 16)
            }])
    }
    ///////////////////////////////////////////////////
    const clearAllColors = () => {
        setColors([])
    }
    ///////////////////////////////////////////////////
    const deleteColor = key => {
        setColors(cur => cur.filter((item) => item.colorId !== key))
    }
    ///////////////////////////////////////////////////
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
            for (const color of colors) {
                colorsNew.push(color.colorName)
            }
            ///////////
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

            images.forEach(image => {
                formData.append("images", image);
            });
            formData.append('name', name);
            formData.append('price', price);
            formData.append('description', description);
            formData.append('colors', JSON.stringify(colorsNew));
            formData.append('sizes', JSON.stringify(priceNew));
            formData.append('category', props.categoryId)
            dispatch(postProduct(formData))
            props.handelReload()
            setPriceNew([])
            setcolorsNew([])
        }
    };

    return (
        <>
            <Toaster />
            <div className='addProductContener'>
                <div className={open ? "newProductOpen" : "newProductClose"}>

                    <div className='addProduct'>
                        <div className='productHader'>
                            <div >  add produt to this catgory </div>
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
                                    <Form.Label>Categort image</Form.Label>

                                    <Form.Control
                                        required
                                        type="file"
                                        onChange={imagOnChange} name='dlimg' accept="image/*" multiple
                                    />

                                </Form.Group>
                                {/* //////////// */}
                                <Row >
                                    <Form.Group as={Col} md="6" className="mb-3" controlId="validationCustom01">

                                        <Form.Label> product name</Form.Label>

                                        <Form.Control
                                            placeholder='write name here '
                                            required
                                            type="text"
                                            onChange={(e) => setName(e.target.value)}
                                        />


                                    </Form.Group>
                                    {/* //////////// */}
                                    <Form.Group as={Col} md="6" className="mb-3" controlId="validationCustom01">

                                        <Form.Label> product price</Form.Label>

                                        <Form.Control
                                            placeholder='write price here '
                                            required
                                            type="text"
                                            onChange={(e) => setPrice(e.target.value)}
                                        />

                                    </Form.Group>
                                </Row>
                                {/* //////////// */}
                                <Form.Group className="mb-3" controlId="validationCustom01">

                                    <Form.Label> product description</Form.Label>

                                    <Form.Control
                                        placeholder='write description here '
                                        required
                                        type="text"
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </Form.Group>
                                {/* //////////// */}
                                <Form.Group className="mb-3" controlId="validationCustom01">


                                    {/* .................. */}
                                    <div className='rowEdit'>
                                        <div className='addCategory1'>
                                            <div className='addCategory2'>
                                                <div className='addCategory3'>
                                                    <Form.Label> Available sizes</Form.Label>
                                                    <Form.Control
                                                        required
                                                        type="text"
                                                        onChange={(e) => setSize(e.target.value)}
                                                    />
                                                </div>
                                                <h5> by </h5>

                                                <div className='addCategory3'>
                                                    <Form.Label>price by money </Form.Label>

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
                                                            onChange={(e) => (setSellInPoints(!sellInPoints), setPriceInPoints(0))}
                                                        />
                                                        <Form.Label>price by points </Form.Label>


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
                                                    <Form.Label>points Earned </Form.Label>

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
                                        >  add </div>

                                        <div className='editPro' style={{ border: "3px solid #f1c92f" }}
                                            onClick={() => clearAllSize()}
                                        >  Clear  </div>


                                    </div>

                                    <div className='sizeBody'>
                                        {prices?.length != 0 &&
                                            <tr className='haderSizeline'>
                                                <span className='sizeCall1'>  SIZE </span>
                                                <span className='sizeCall1'>  PRICE BY MONY</span>
                                                <span className='sizeCall1'>  PRICE BY POINT</span>
                                                <span className='sizeCall1'>  POINTS EARNED</span>

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
                                                <span className='sizeCall1'>  {size?.price} .sar </span>
                                                <span className='sizeCall1'> {size?.priceInPoints == 0 ? "No" : size?.priceInPoints}  .P</span>
                                                <span className='sizeCall1'> {size?.priceInPoints == 0 ? "No" : size?.pointsEarned}  </span>

                                            </tr>
                                        ))}
                                    </div>

                                    {/* .................. */}


                                </Form.Group>
                                {/* //////////// */}

                                <Form.Group className="mb-3" controlId="validationCustom01">
                                    <Form.Label>Color</Form.Label>
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
                                        >  add </div>

                                        <div className='editPro' style={{ border: "3px solid #f1c92f" }}
                                            onClick={() => clearAllColors()}
                                        >  Clear  </div>


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
                                </Form.Group>

                                {/* //////////// */}
                                <hr />
                                <button type="submit" className='formButton'  >
                                    add new product
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
