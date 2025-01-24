import React, { useEffect, useRef, useState } from 'react';
import { motion } from "framer-motion"
import './sliderX.css'
import { useDispatch } from 'react-redux';
import { deleteImageFromSlider } from '../../RTK/settings/deleteImageFromSliderSlice';


const SliderX = (props) => {
    const carouselRef = useRef();
    const [width, setwidth] = useState(0)
    useEffect(() => {
        setwidth(carouselRef.current.scrollHeight - carouselRef.current.offsetWidth)
    }, [props])


    ////////////////////////////////////
    const dispatch = useDispatch()

    const deleteimage = (id) => {
        dispatch(deleteImageFromSlider(id))
        setTimeout(() => {
            props.handleReload()
        }, 1000);
    }
    ////////////////////////////////////
    return (
        <div className='sliderX'>
            <motion.div ref={carouselRef} className='carouselImage'>
                <motion.div
                    drag='y'
                    dragConstraints={{ bottom: 0, top: - width }}
                    // dragConstraints={{ right: 0, left: - width }}
                    className='innerCarousel'
                >


                    {props.allSlider?.map((item, index) => (
                        <div className='sliderItame' key={index}>
                            <div className='deleteImage' onClick={() => deleteimage(item?._id)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width={"100%"} height={"100%"} viewBox="0 0 24 24" ><path fill="currentColor" fillRule="evenodd" d="M15.646 13.646a.5.5 0 0 1 .708 0l2.146 2.147l2.146-2.147a.5.5 0 0 1 .708.708L19.207 16.5l2.147 2.146a.5.5 0 0 1-.708.708L18.5 17.207l-2.146 2.147a.5.5 0 0 1-.708-.708l2.147-2.146l-2.147-2.146a.5.5 0 0 1 0-.708" clipRule="evenodd"></path><path fill="currentColor" d="M9.377 3.5h3.246c1.1 0 1.958 0 2.645.056c.698.057 1.265.175 1.775.434a4.5 4.5 0 0 1 1.967 1.967c.26.51.377 1.077.434 1.775c.056.687.056 1.544.056 2.645v.023a.5.5 0 0 1-1 0c0-1.128 0-1.945-.053-2.586c-.052-.637-.152-1.057-.328-1.403a3.5 3.5 0 0 0-1.53-1.53c-.346-.176-.766-.276-1.402-.328C14.545 4.5 13.728 4.5 12.6 4.5H9.4c-1.128 0-1.945 0-2.586.053c-.637.052-1.057.152-1.403.328a3.5 3.5 0 0 0-1.53 1.53c-.176.346-.276.766-.328 1.403C3.5 8.455 3.5 9.272 3.5 10.4v3.795c.234-.275.44-.51.628-.7c.297-.298.59-.53.942-.659a2.5 2.5 0 0 1 1.717 0c.352.13.646.36.942.66c.29.291.618.685 1.027 1.176l.015.018a.33.33 0 0 0 .492.018l3.019-3.126a18 18 0 0 1 .976-.968c.283-.248.558-.439.881-.546a2.5 2.5 0 0 1 1.579 0c.411.136.751.411 1.129.775a.5.5 0 1 1-.694.72c-.36-.346-.564-.485-.75-.547a1.5 1.5 0 0 0-.948 0c-.143.048-.301.143-.537.35c-.24.21-.524.504-.932.926l-3.003 3.11a1.33 1.33 0 0 1-1.98-.072c-.428-.513-.729-.873-.984-1.13c-.252-.254-.423-.369-.575-.424a1.5 1.5 0 0 0-1.03 0c-.153.055-.324.17-.576.424c-.255.257-.556.617-.984 1.13l-.062.075c-.159.19-.187.229-.207.27a.6.6 0 0 0-.047.145a.5.5 0 0 0-.002.123l.008.122l.004.06c.05.67.152 1.107.334 1.464a3.5 3.5 0 0 0 1.667 1.594q.135.058.29.103c.264.077.577.129.975.161c.641.053 1.458.053 2.586.053H13a.5.5 0 0 1 .195.04a.5.5 0 0 1-.195.96H9.377c-1.1 0-1.957 0-2.645-.056a7 7 0 0 1-.684-.085a4 4 0 0 1-.897-.259a4.5 4.5 0 0 1-2.16-2.058c-.26-.51-.378-1.076-.435-1.774l-.02-.293C2.5 15.34 2.5 14.572 2.5 13.623v-3.246c0-1.1 0-1.958.056-2.645c.057-.698.175-1.265.434-1.775A4.5 4.5 0 0 1 4.957 3.99c.51-.26 1.077-.377 1.775-.434C7.42 3.5 8.276 3.5 9.377 3.5"></path><path fill="currentColor" d="M9 6.5a2.5 2.5 0 1 0 0 5a2.5 2.5 0 0 0 0-5M7.5 9a1.5 1.5 0 1 1 3 0a1.5 1.5 0 0 1-3 0"></path></svg>
                            </div>
                            <img draggable="false" className='imageCat' src={item.image} alt="" />
                        </div>
                    ))}

                </motion.div>
            </motion.div>
        </div >
    );
}
export default SliderX;
