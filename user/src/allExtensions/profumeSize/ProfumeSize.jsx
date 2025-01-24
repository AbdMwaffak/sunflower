import React, { useState } from 'react';
import './profumeSize.css'
import { Form } from 'react-bootstrap';


const ProfumeSize = (props) => {
    const [perfumeNum, setPerfumeNum] = useState(0)
    const [perfumePrice, setPerfumePrice] = useState(0)
    const [ml, setMl] = useState(true)
    const [validated, setValidated] = useState(false)
    /////////////////////
    const handelNum = (e) => {
        if (e >= 0) {
            setPerfumeNum(e)
            setPerfumePrice(e * props.price)
            props.handelReload()
            const value1 = {
                size: props.size,
                count: e
            }
            props.handelCunter(value1)
            ////////////////////
            const value2 = {
                id: props.id,
                count: e,
                price: props.price * e
            }
            props.handelprice(value2)
        }
    }
    return (
        <div className='ml'>
            <div className='sizeName'>
                <div className='cckkk'>
                    <label className="container">
                        <input type="checkbox" onChange={() => {
                            handelNum(0)
                            setMl(!ml)
                        }} />
                        <span className="checkmark"></span>
                    </label>
                </div>
                <span className='vv3'>  {props?.size} </span>
            </div>
            <Form noValidate validated={validated} >
                <Form.Control className='text11'
                    style={{ paddingRight: "25px" }}
                    onChange={(e) => handelNum(e.target.value)}
                    required
                    type="number"
                    value={perfumeNum}
                    disabled={ml}
                />
            </Form>
            <div className='priceBySize'>
                <span className='vv3'> {perfumePrice} </span>
            </div>
        </div>
    );
}

export default ProfumeSize;
