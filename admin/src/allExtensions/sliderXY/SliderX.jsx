import React, { useEffect, useRef, useState } from 'react';
import { motion } from "framer-motion"
import './sliderX.css'

const SliderX = (props) => {
    const carouselRef = useRef();
    const [width, setwidth] = useState(0)
    useEffect(() => {
        setwidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth)
    }, [props])

    return (
        <div className='sliderX'>
            <motion.div ref={carouselRef} className='carouselOffer'>
                <motion.div
                    drag='x'
                    dragConstraints={{ right: 0, left: - width }}
                    className='innerCarousel'
                >
                    {props.vv?.map((item, index) => (
                        <div className='sliderItame' key={index}>

                            <img style={{ width: "100%" }} src={item} alt="" />
                        </div>
                    ))}

                </motion.div>
            </motion.div>
        </div >
    );
}
export default SliderX;
