import React, { useEffect, useState } from 'react';
import './myReturnOrder.css'
import ReturnOrder from '../../allExtensions/returnOrder/ReturnOrder';

const MyReturnOrder = () => {
    //////////////////////////
    useEffect(
        function () {
            document.title = `SUNFLOWER - My Return Order `;
            return function () { document.title = 'SUNFLOWER' };
        }, [])
    ///////////////////
    return (
        <div className='myOrder'>
            <div className='myOrderTitle'>
                My Return Order
            </div>
            <div className='myOrderContener'>
                <ReturnOrder />
                <ReturnOrder />
                <ReturnOrder />
                <ReturnOrder />
            </div>
        </div >
    );
}
export default MyReturnOrder;
