import React, { useEffect, useRef, useState } from 'react';
import { motion } from "framer-motion"
import './slider.css'
import CouponCard from '../couponCard/CouponCard';
import Cookies from 'universal-cookie';

const SliderX = (props) => {
    const carouselRef = useRef();
    const [width, setwidth] = useState(0)
    //////////////////////////////
       const cookies = new Cookies();
        let lng = ''
        if (cookies.get('i18next') === "ar") {
            lng = "ar"
        } else lng = "en"
        //////////////////////////////
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
                    {props.vv?.filter(vv => {
                        if (vv.products.length !== 0) { return vv; }
                    }).map((item, index) => (
                        <CouponCard
                            key={index}
                            description={lng == "ar" ? item.descriptionAr : item.description}
                            discount={item?.discount}
                            mainImage={item?.mainImage}
                            name={lng == "ar" ? item.nameAr : item.name}
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
