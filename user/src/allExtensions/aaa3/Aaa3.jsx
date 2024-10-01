import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import './aaa3.css'
import Emoji from '../../image/product1.png'

const Aaa3 = (props) => {
    const [state, setstate] = useState(props.turnOn)
    return (
        <>
            {props.turnOn
                && <div className='allshapes'>
                    <div className='aa1 ab'>   <img className='aaImg' src={Emoji} /> </div>
                    <div className='aa2 ab'> <img className='aaImg' src={Emoji} />  </div>
                    <div className='aa3 ab'> <img className='aaImg' src={Emoji} />  </div>
                    <div className='aa4 ab'> <img className='aaImg' src={Emoji} />  </div>
                    <div className='aa5 ab'> <img className='aaImg' src={Emoji} />  </div>
                    <div className='aa6 ab'> <img className='aaImg' src={Emoji} />  </div>
                    <div className='aa7 ab'> <img className='aaImg' src={Emoji} />  </div>
                    <div className='aa8 ab'> <img className='aaImg' src={Emoji} />  </div>
                    <div className='aa9 ab'> <img className='aaImg' src={Emoji} />  </div>
                    <div className='aa10 ab'> <img className='aaImg' src={Emoji} />  </div>
                    <div className='aa11 ab'> <img className='aaImg' src={Emoji} />  </div>
                    <div className='aa12 ab'> <img className='aaImg' src={Emoji} />  </div>
                    <div className='aa13 ab'> <img className='aaImg' src={Emoji} />  </div>
                </div>
            }
        </>
    );
}
export default Aaa3;
