import React from 'react';
import './categorysCard.css'
import { useNavigate } from 'react-router-dom';

const CategorysCard = (props) => {
    const navigate = useNavigate();
    const handelgo = () => {
        if (props?.name1 == "perfumes") navigate(`/Perfumes`)
        else if (props?.name1 == "natural flowers") navigate(`/NaturalFlowers`)
        else navigate(`/Category/${props.id}`, { state: { id: props?.name } })
    }
    return (
        <div className='CategorysCard'>
            <div onClick={handelgo}
                className='link' >
                <div className='imageCategory'>
                    <img className='allImage' src={props.image} />
                </div>
                <div className='titleCategory'>
                    {props.name}
                </div>
            </div>
        </div>
    );
}
export default CategorysCard; 
