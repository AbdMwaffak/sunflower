import React, { useState } from 'react';
import './cityInfo.css'

import { useDispatch } from 'react-redux';
import { Form } from 'react-bootstrap';
import { updateCityById } from '../../RTK/cities/updateCityByIdSlice';
import { deleteCityById } from '../../RTK/cities/deleteCityByIdSlice';
import { useTranslation } from 'react-i18next';

const CityInfo = (props) => {

    const [name, setName] = useState('');
    const [neighborhood, setNeighborhood] = useState('');
    const [validated1, setValidated1] = useState(false);
    const [validated2, setValidated2] = useState(false);
    const [newNeighbor, setNewNeighbor] = useState([]);

    /////////////////////////
    const dispatch = useDispatch()
    /////////////////////////
    const handleAddNeighborhoodToCity = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setValidated1(true);
        }
        else {
            if (props?.city?.neighborhoods?.length != 0) {
                props?.city?.neighborhoods.map((neighbor, index) => {
                    newNeighbor.push(neighbor);
                    { return newNeighbor; }
                })
                newNeighbor.push(neighborhood);
            }
            else {
                newNeighbor.push(neighborhood);
            }
            const value = {
                id: props?.city?._id,
                reqobj: { neighborhoods: JSON.stringify(newNeighbor) }
            }

            dispatch(updateCityById(value))
            console.log(newNeighbor)
            props.handleReload()
            // setNeighborhood('')
            setNewNeighbor([])
        }

    }
    /////////////////////////
    const handledeleteNeighborhood = (e) => {
        const value = {
            id: props?.city?._id,
            reqobj: {
                neighborhoods: JSON.stringify(props?.city?.neighborhoods?.filter((neighbor, index) => {
                    if (index != e) { return neighbor; }
                }))
            }
        }
        dispatch(updateCityById(value))
        props.handleReload()

        // dispatch(deleteCategoryById(id))
    }
    /////////////////////////
    const handleEditCityName = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setValidated1(true);
        }
        else {
            const value = {
                id: props?.city?._id,
                reqobj: { name: name }
            }
            dispatch(updateCityById(value))
            props.handleReload()
        }
    };
    /////////////////////////
    const handleDeleteCity = (event) => {
        dispatch(deleteCityById(props?.city?._id,))
        props.handleCityId('')
        props.handleReload()
    }
    ////////////////////////////////////
    const { t, i18n } = useTranslation();
    return (
        <div className='cityInfo'>
            {(props.city == "") && <h5>  {t('settings.chooseOne')}</h5>}
            {(props.city != "") && <div className='cityHeder'>
                <h5>  {props.city?.name} </h5>
                <button type="submit" className='editPro'
                    style={{ border: "3px solid var(--primary-yellow)" }}
                    onClick={() => handleDeleteCity()}
                >
                    {t('public.delete')}</button>
            </div>}
            <hr className='tapp' />
            <Form noValidate validated={validated1} onSubmit={handleEditCityName} className='addCategory1'>

                <Form.Group className="mb-3" controlId="validationCustom01">
                    <Form.Label> {t('settings.editName')}</Form.Label>
                    <div className='rowEdit'>
                        <div className='addCategory1'>
                            <Form.Control
                                placeholder='write new city name'
                                required
                                type="text"
                                onChange={(e) => setName(e.target.value)}
                                disabled={(props.city == "") && true}
                            />
                        </div>
                        <button type="submit" className='editInfo'  >
                            <svg className='svgEdit' xmlns="http://www.w3.org/2000/svg" width={"30px"} height={"30px"} viewBox="0 0 24 24" ><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.946 3.173c.587-.587.88-.88 1.206-1.021c.469-.203 1-.203 1.469 0c.325.14.619.434 1.206 1.021s.88.881 1.021 1.206c.203.469.203 1 0 1.469c-.14.325-.434.619-1.021 1.206l-5.022 5.022c-1.237 1.237-1.855 1.855-2.63 2.222s-1.646.452-3.387.624L9 15l.078-.788c.172-1.741.257-2.612.624-3.387s.985-1.393 2.222-2.63zM6 15H3.75a1.75 1.75 0 1 0 0 3.5h9.5a1.75 1.75 0 1 1 0 3.5H11" color="currentColor"></path></svg>

                        </button>
                    </div>
                </Form.Group>
            </Form>
            {/* //////////// */}
            <Form noValidate validated={validated2} onSubmit={handleAddNeighborhoodToCity} className='addCategory1'>

                <Form.Group className="mb-3" controlId="validationCustom01">
                    <Form.Label> {t('settings.addNeighborhood')}</Form.Label>
                    <div className='rowEdit'>
                        <div className='addCategory1'>
                            <Form.Control
                                placeholder='write new city name'
                                required
                                type="text"
                                onChange={(e) => setNeighborhood(e.target.value)}
                                disabled={(props.city == "") && true}
                            />
                        </div>
                        <button type="submit" className='editInfo'  >
                            <svg className='svgEdit' xmlns="http://www.w3.org/2000/svg" width={"30px"} height={"30px"} viewBox="0 0 24 24" ><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.946 3.173c.587-.587.88-.88 1.206-1.021c.469-.203 1-.203 1.469 0c.325.14.619.434 1.206 1.021s.88.881 1.021 1.206c.203.469.203 1 0 1.469c-.14.325-.434.619-1.021 1.206l-5.022 5.022c-1.237 1.237-1.855 1.855-2.63 2.222s-1.646.452-3.387.624L9 15l.078-.788c.172-1.741.257-2.612.624-3.387s.985-1.393 2.222-2.63zM6 15H3.75a1.75 1.75 0 1 0 0 3.5h9.5a1.75 1.75 0 1 1 0 3.5H11" color="currentColor"></path></svg>

                        </button>
                    </div>
                </Form.Group>
            </Form>
            {/* //////////// */}
            <hr className='tapp' />

            {props?.city?.name} {t('settings.cityNeighborhoods')}
            < div className='citiesMap' >
                {props?.city?.neighborhoods?.map((neighbor, index) => (
                    <div className='neighborhoodsItem'
                        key={index} >
                        {neighbor}
                        <div className='neighborhoodsItemDelete'
                            onClick={() => { handledeleteNeighborhood(index) }}
                        >
                            <svg className='increaseICon' xmlns="http://www.w3.org/2000/svg" width={"15px"} height={"15px"} viewBox="0 0 32 32" fill="#ffffff" transform="rotate(45)" >
                                <path id="Path_2299" data-name="Path 2299" d="M4,0H28a4,4,0,0,1,0,8H4A4,4,0,0,1,4,0Z" transform="translate(0 12)" />
                                <path id="Path_2298" data-name="Path 2298" d="M4,0H28a4,4,0,0,1,0,8H4A4,4,0,0,1,4,0Z" transform="translate(12 32) rotate(-90)" />
                            </svg>
                        </div>
                    </div>
                ))}
            </div >

        </div >
    );
}

export default CityInfo;
