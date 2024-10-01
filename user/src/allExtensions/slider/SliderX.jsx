import React, { useEffect, useRef, useState } from 'react';
import { motion } from "framer-motion"
import './slider.css'
import CouponCard from '../couponCard/CouponCard';

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
                        <CouponCard
                            key={index}
                            description={item?.description}
                            discount={item?.discount}
                            mainImage={item?.mainImage}
                            name={item?.name}
                            priceA={item?.priceA}
                            priceB={item?.priceB}
                            products={item?.products}
                            id={item?._id}
                            numCounter={props?.numCounter}
                        />
                    ))}

                </motion.div>
            </motion.div>
        </div >
    );
}
export default SliderX;
