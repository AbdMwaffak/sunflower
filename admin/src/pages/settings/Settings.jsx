import React, { useEffect, useState } from 'react';
import './settings.css'
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import Carousel from 'react-bootstrap/Carousel';
import { getAllSettings } from '../../RTK/settings/getAllSettingsSlice';
import SliderX from '../../allExtensions/sliderXY/SliderX';
import { postImageToSlider } from '../../RTK/settings/postImageToSliderSlice';
import Map from '../../allExtensions/map/Map';
import { addCities } from '../../RTK/cities/addCitiesSlice';
import { getAllCities } from '../../RTK/cities/getAllCitiesSlice';
import SliderXCities from '../../allExtensions/sliderXY/SliderXCities';
import { getCityById } from '../../RTK/cities/getCityByIdSlice';
import CityInfo from '../../allExtensions/cityInfo/CityInfo';
import Contact from '../../allExtensions/contact/Contact';
import { useTranslation } from 'react-i18next';
import BarChart from '../../allExtensions/charts/BarChart ';
import LineChart from '../../allExtensions/charts/LineChart';

const Settings = () => {
    const allSettings = useSelector(state => state.getAllSettings).data
    const allSlider = useSelector(state => state.getAllSettings)?.data?.slider
    const allCities = useSelector(state => state.getAllCities)?.data
    const cityById = useSelector(state => state.getCityById)?.data
    // console.log(allCities)
    ////////////////////////////////////
    const [validated, setValidated] = useState(false);
    const [reload, setReload] = useState(true);

    const [imagesSquer, setImagesSquer] = useState([]);
    const [images, setImages] = useState([]);
    const [cityName, setCityName] = useState('');
    const [neighborhoods, setNeighborhoods] = useState([]);
    const [neighborhoodsNew, setNeighborhoodsNew] = useState([]);
    const [neighborhood, setNeighborhood] = useState('');
    const [cityId, setCityId] = useState('');
    ////////////////////////////////////
    const dispatch = useDispatch()
    ////////////////////////////////////
    const handleReload = () => {
        setTimeout(() => {
            setReload(!reload)
        }, 1000);
    }
    ////////////////////////////////////
    const hanleCityId = (e) => {
        setCityId(e)
        setReload(!reload)
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
        }
    };
    ////////////////////////////////////
    const handleAddCity = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setValidated(true);
        }
        else {
            for (const neighborhood of neighborhoods) {
                neighborhoodsNew.push(neighborhood.neighborhoodName)
            }
            const value = {
                name: cityName,
                neighborhoods: JSON.stringify(neighborhoodsNew)
            }
            dispatch(addCities(value))
            setTimeout(() => {
                setReload(!reload)
                setNeighborhoodsNew([])
                setNeighborhoods([])
            }, 1000);
        }
    };
    ////////////////////////////////////
    const neighborhoodOnChange = e => {
        if (neighborhood != '')
            setNeighborhoods(cur => [...cur, {
                neighborhoodName: e,
                neighborhoodId: Math.random() * Math.pow(10, 16)
            }])
    }
    ///////////////////////////////////////////////////
    const clearAllNeighborhoods = () => {
        setNeighborhoods([])
    }
    ///////////////////////////////////////////////////
    const deleteNeighborhood = key => {
        setNeighborhoods(cur => cur.filter((item) => item.neighborhoodId !== key))
    }

    ////////////////////////////////////
    useEffect(() => {
        dispatch(getAllSettings())
        dispatch(getAllCities())
        if (cityId != "") dispatch(getCityById(cityId))
    }, [dispatch, reload, cityId])
    ////////////////////////////////////
    useEffect(
        function () {
            document.title = `SUNFLOWER - Settings `;
            return function () { document.title = 'SUNFLOWER' };
        }, [])
    ////////////////////////////////////
    const { t, i18n } = useTranslation();
    return (
        <>
            <Toaster />
            <div className='mySettings'>
                <div className='title'>
                    {t('settings.title')}
                </div>
                <div className='mySettingsContener'>
                    <div className='myCunterContener'>
                        <div className='cunter'>
                            cunter1
                        </div>
                        <div className='cunter'>
                            cunter2
                        </div>
                        <div className='cunter'>
                            cunter3
                        </div>
                    </div>
                    {/* <hr className='tapp' /> */}
                    <div className='charts'>
                        <div className='yearsName'>
                            <div className='oneYear'>
                                2025
                                <div className='point'> </div>
                            </div>
                            <div className='oneYear'>
                                2026
                                <div className='point'> </div>
                            </div>
                            <div className='oneYear'>
                                2027
                                <div className='point'> </div>
                            </div>
                            <div className='oneYear'>
                                2028
                                <div className='point'> </div>
                            </div>
                            <div className='oneYear'>
                                2029
                                <div className='point'> </div>
                            </div>
                            <div className='oneYear'>
                                2030
                                <div className='point'> </div>
                            </div>

                        </div>
                        <div className='map1'>
                            <Map />
                        </div>
                        <div className='barChart'>
                            <BarChart />
                        </div>

                        <div className='lineChart'>
                            <LineChart />
                        </div>
                    </div>
                </div>

                {/* <div className='mySettingsContener'>
         <div className=''> 
                    <Map />
                    </div>
                </div > */}

                <div className='supTitle'>
                    {t('settings.supTitle1')}
                </div>
                <div className='editeContener'>
                    <div className='sliderContener'>
                        <div className='newimgSlider'>

                            <Form noValidate validated={validated} onSubmit={handleSubmit} className='addAbout'>
                                <Form.Group className="mb-3" controlId="validationCustom02">
                                    <Form.Label>      {t('settings.addImageSlider')} </Form.Label>
                                    <Form.Control
                                        required
                                        type="file"
                                        onChange={imagOnChange} name='dlimg' accept="image/*" multiple
                                    />
                                </Form.Group>
                                {/* ///////// */}

                                <hr />
                                <button type="submit" className='formButton'> {t('settings.addImages')}</button>
                            </Form>


                            <div className='slider'>
                                <Carousel data-bs-theme="dark" style={{ overflow: "heddin", height: "100%" }}>
                                    {allSlider?.map((itame, index) => (
                                        <Carousel.Item style={{ overflow: "heddin" }} key={index}>
                                            <img
                                                className="imageCat"
                                                src={itame?.image}
                                                alt="First slide"
                                            />
                                            <Carousel.Caption>
                                            </Carousel.Caption>
                                        </Carousel.Item>

                                    ))}
                                </Carousel>
                            </div>

                        </div>

                        <div className='currentImgs'>
                            <SliderX allSlider={allSlider}
                                handleReload={handleReload} />
                        </div>
                    </div>
                </div>

                <div className='supTitle'>
                    {t('settings.supTitle2')}
                </div>
                <div className='citiesContenar'>
                    <div className='newAbout'>
                        <Form noValidate validated={validated} onSubmit={handleAddCity} className='addAbout'>
                            <Form.Group className="mb-3" controlId="validationCustom02">
                                <Form.Label> {t('settings.addCity')}</Form.Label>
                                <Form.Control
                                    required
                                    type="string"
                                    onChange={(e) => setCityName(e.target.value)}
                                />
                            </Form.Group>
                            {/* ///////// */}

                            <Form.Group className="mb-3" controlId="validationCustom01">
                                <Form.Label> {t('settings.neighborhoods')}</Form.Label>
                                <div className='rowEdit'>
                                    <div className='addCategory1'>
                                        <Form.Control
                                            type="string"
                                            onChange={(e) => setNeighborhood(e.target.value)}
                                        />


                                    </div>

                                    <div className='editPro' style={{ border: "3px solid #f1c92f" }}
                                        onClick={() => neighborhoodOnChange(neighborhood)}
                                    >   {t('public.addButton')} </div>

                                    <div className='editPro' style={{ border: "3px solid #f1c92f" }}
                                        onClick={() => clearAllNeighborhoods()}
                                    > {t('public.clear')}    </div>
                                </div>
                                <div className='colorMap' >
                                    {neighborhoods.map((neighbor, index) => (
                                        <div className='neighborhoodsItem'
                                            key={index} >
                                            {neighbor?.neighborhoodName}
                                            <div className='neighborhoodsItemDelete'
                                                onClick={() => { deleteNeighborhood(neighbor?.neighborhoodId) }}
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

                            <hr />
                            <button type="submit" className='formButton'> {t('settings.addNewCity')} </button>
                        </Form>


                    </div>

                    <div className='currentCities'>

                        <div className='citiesLest'>
                            <SliderXCities allCities={allCities}
                                handleReload={handleReload}
                                handleCityId={hanleCityId}
                            />
                        </div>
                        {cityId != "" &&
                            <CityInfo city={cityById}
                                handleReload={handleReload}
                                handleCityId={hanleCityId}
                            />}

                        {cityId == "" &&
                            <CityInfo city={''}
                                handleReload={handleReload}
                                handleCityId={hanleCityId}
                            />}

                    </div>


                </div>
                <div className='supTitle'>
                    {t('settings.supTitle3')}
                </div>
                <div className='editeContener'>
                    <div className='newAbout'>
                        <Contact
                            handleReload={handleReload}
                            settings={allSettings}
                        />


                    </div>
                </div>

            </div >
        </>
    )
}

export default Settings;
