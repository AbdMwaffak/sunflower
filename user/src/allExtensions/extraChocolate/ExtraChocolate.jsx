import React, { useState } from 'react';
import './extraChocolate.css'
import Api from '../API';

const ExtraChocolate = (props) => {
    const [state, setState] = useState(true);
    const [chocolateNum, setChocolateNum] = useState(0);
    ///////////////////////////
    const handelIncreaseChocolate = (e) => {
        setChocolateNum(e)
        const value = {
            id: props?.id,
            count: e
        }
        props.handelIncreaseSum(props?.price, value)
    }
    ///////////////////////////
    const handelDecreaseChocolate = (e) => {
        if (e >= 0) {
            setChocolateNum(e)
            const value = {
                id: props?.id,
                count: e
            }
            props.handelDecreaseSum(props?.price, value)
        }
    }
    ///////////////////////////
    const handelStopChocolate = (e) => {
        setChocolateNum(e)
        const value = {
            id: props?.id,
            count: e
        }
        props.handelDecreaseSum(props?.price * chocolateNum, value)
    }
    return (
        <div className='extraChocolate'>
            <div className='vvcheck'>
                <label className="container">
                    <input type="checkbox" onChange={() => {
                        handelStopChocolate(0)
                        setState(!state)
                    }} />
                    <span className="checkmark"></span>
                </label>
            </div>
            <span className='vv4'>  {props.name} </span>
            <span className='vv5'>  {chocolateNum} </span>
            <span className='vvBut'>
                <button className='decrease'
                    type='button'
                    disabled={state}
                    onClick={() => handelDecreaseChocolate(chocolateNum - 1)}
                >
                    <svg className='decreaseICon' xmlns="http://www.w3.org/2000/svg" width="32" height="8" viewBox="0 0 32 8">
                        <path id="Path_2299" data-name="Path 2299" d="M4,0H28a4,4,0,0,1,0,8H4A4,4,0,0,1,4,0Z" fill="#f1c92f" />
                    </svg>

                </button>
                <button className='Increase'
                    type='button'
                    disabled={state}
                    onClick={() => handelIncreaseChocolate(chocolateNum + 1)}
                >
                    <svg className='increaseICon' xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                        <path id="Path_2299" data-name="Path 2299" d="M4,0H28a4,4,0,0,1,0,8H4A4,4,0,0,1,4,0Z" transform="translate(0 12)" fill="#f1c92f" />
                        <path id="Path_2298" data-name="Path 2298" d="M4,0H28a4,4,0,0,1,0,8H4A4,4,0,0,1,4,0Z" transform="translate(12 32) rotate(-90)" fill="#f1c92f" />
                    </svg>
                </button>
            </span>
            <>
                <div className='chocolateImage '>
                    <img className='chocolateImg' src={`${Api}/users/${props?.image}`} alt="no image" />
                </div>
                <svg className='tringelTail'
                    xmlns="http://www.w3.org/2000/svg" width={50} height={50} viewBox="0 0 24 24" ><path fill="currentColor" d="M11.646 15.146L5.854 9.354a.5.5 0 0 1 .353-.854h11.586a.5.5 0 0 1 .353.854l-5.793 5.792a.5.5 0 0 1-.707 0"></path></svg>
            </>
        </div>

    );
}
export default ExtraChocolate;
