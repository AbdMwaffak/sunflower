import React, { useEffect, useState } from 'react';
import './editMyNaturalFlower.css'
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import Api from '../../allExtensions/API';
import { getBouquetById } from '../../RTK/naturalFlowers/getBouquetByIdSlice';
import { useParams } from 'react-router-dom';
import EditBouquetCard from '../../allExtensions/editBouquet/EditBouquetCard';
import { patchBouquet } from '../../RTK/naturalFlowers/patchBouquetSlice';
import { Toaster } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';


const EditMyNaturalFlower = () => {

    const id = useParams().NaturalFlowerId
    const bouquet = useSelector(state => state.getBouquetById)?.data
    //////////////////////////////////////
    const [imageSquer, setImageSquer] = useState([]);
    const [image, setImage] = useState([]);
    const [num, setNum] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState("");
    //////////////////////////////////////
    const [validated, setValidated] = useState(false);
    const [reload, setReload] = useState(true);
    //////////////////////////////////////
    const dispatch = useDispatch()
    //////////////////////////////////////
    const imag2OnChange = (event) => {
        setImage(event.target.files[0])
        setImageSquer(URL.createObjectURL(event.target.files[0]))
    }
    //////////////////////////////////////

    const reloadHandel = () => {
        setReload(!reload)
    }
    //////////////////////////////////////
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        else {
            setValidated(true);
            setReload(!reload)
            const formData = new FormData();
            formData.append('image', image);
            formData.append('count', num);
            formData.append('price', price);
            formData.append('description', description);
            const value = {
                reqobj: formData,
                id: id
            }
            dispatch(patchBouquet(value))
        }
    };
    //////////////////////////////////////
    useEffect(() => {
        dispatch(getBouquetById(id))
    }, [dispatch, id, reload])
    /////////////////////////////
    useEffect(
        function () {
            document.title = `SUNFLOWER - Bouquet(${bouquet?.count})`;
            return function () { document.title = 'SUNFLOWER' };
        }, [bouquet?.count])
    ////////////////////////////////////
    const { t, i18n } = useTranslation();
    return (
        <>
            <Toaster />

            <div className='myNaturalFlower'>
                <div className='title'>
                    {t('flowerBouquet.title')}
                </div>
                <div className='editeContener'>
                    <div className='newNaturalFlower'>

                        <Form noValidate validated={validated} onSubmit={handleSubmit} className='addNaturalFlower'>

                            <Form.Group className="mb-3" controlId="validationCustom01">
                                <Form.Label>    {t('flowerBouquet.editBouquetImage')} </Form.Label>
                                <Form.Control
                                    required
                                    type="file"
                                    onChange={imag2OnChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="validationCustom03">
                                <Form.Label>     {t('flowerBouquet.editNumberOfFlowers')}</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder={bouquet?.count}
                                    min={1}
                                    required
                                    onChange={(e) => setNum(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="validationCustom03">
                                <Form.Label>     {t('flowerBouquet.editPriceOfBouquet')}</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder={bouquet?.price}
                                    min={1}
                                    required
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </Form.Group>
                            {/* <Form.Group className="mb-3" controlId="validationCustom03">
                                <Form.Label>     {t('flowerBouquet.editBouquetDescriptionAr')}</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    type="text "
                                    placeholder={bouquet?.description}
                                    required
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </Form.Group> */}
                            <Form.Group className="mb-3" controlId="validationCustom03">
                                <Form.Label>     {t('flowerBouquet.editBouquetDescriptionEn')}</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    type="text "
                                    placeholder={bouquet?.description}
                                    required
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </Form.Group>

                            <hr />

                            <button type="submit" className='formButton'>     {t('public.edit')}</button>
                        </Form>

                        <div className='displayNowFlower'>

                            {imageSquer?.length == 0 &&
                                <div className='newImageFlower'>
                                    <img className='imageFlower' src={`${Api}/users/${bouquet?.image}`} />

                                </div>
                            }
                            {imageSquer?.length != 0 &&
                                <div className='newImageFlower'>
                                    <img className='imageFlower' src={imageSquer} />

                                </div>
                            }
                            <div className='newTitleFlower'>
                                <div className='info' >
                                    <div className='' >
                                        {t('flowerBouquet.cuantety')} :   {num == 0 ? bouquet?.count : num}
                                    </div>

                                    <div className='' >
                                        {t('flowerBouquet.price')} :   {price == 0 ? bouquet?.price : price}
                                    </div>
                                </div>
                                <hr />
                                <div className=''>
                                    {description == "" ? bouquet?.description : description}
                                </div>
                            </div>


                        </div>

                    </div>
                </div>
                {/* ////////////// */}
                <div className='supTitle'>
                    {t('flowerBouquet.result')}
                </div>
                <div className='currentBouquets'>


                    <EditBouquetCard id={bouquet._id}
                        price={bouquet.price}
                        count={bouquet.count}
                        image={bouquet.image}
                        description={bouquet.description}
                        reloadHandel={reloadHandel}
                    />


                </div>


            </div>
        </>
    );
}

export default EditMyNaturalFlower;
