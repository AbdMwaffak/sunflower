import React, { useEffect, useRef, useState } from 'react';
import { motion } from "framer-motion"
import './sliderX.css'
import './check.css'
import { useDispatch } from 'react-redux';
import { updateCityById } from '../../RTK/cities/updateCityByIdSlice';
import Cookies from 'universal-cookie';


const SliderXCities = (props) => {
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
    const carouselRef = useRef();
    const [width, setwidth] = useState(0)
    const [state, setState] = useState('')
    useEffect(() => {
        setwidth(carouselRef.current.scrollHeight - carouselRef.current.offsetWidth)
    }, [props])


    ////////////////////////////////////
    const dispatch = useDispatch()
    const handleActiveCity = (e) => {
        const value = {
            id: e._id,
            reqobj: { isActive: !e.isActive }
        }
        dispatch(updateCityById(value))
        props.handleReload()
    }
    ////////////////////////////////////
    const handleId = (e) => {
        props.handleCityId(e)
    }
    ////////////////////////////////////
    return (
        <div className='sliderCities'>
            <motion.div ref={carouselRef} className='carouselImage'>
                <motion.div
                    drag='y'
                    dragConstraints={{ bottom: 0, top: - width }}
                    className='innerCarouselCities'
                >


                    {props.allCities?.map((item, index) => (
                        <div className='cityItame' key={index}>
                            <div className='cityTogel'>
                                <label className="container">
                                    <input type="checkbox"
                                        defaultChecked={item?.isActive}
                                        onChange={() => handleActiveCity(item)} >

                                    </input>
                                    <span className="checkmark"></span>
                                </label>
                            </div>
                            <h6 className='cityName' onClick={() => handleId(item?._id)}>  {lng == "ar" ? item?.nameAr : item?.name} </h6>
                        </div>
                    ))}

                </motion.div>
            </motion.div>
        </div >
    );
}
export default SliderXCities;
