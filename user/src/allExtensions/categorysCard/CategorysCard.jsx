import React from 'react';
import './categorysCard.css'
import { useNavigate } from 'react-router-dom';

const CategorysCard = (props) => {
    const navigate = useNavigate();
    const handelgo = () => {
        if (props.name == "Perfumes") navigate(`/Perfumes`)
        else if (props.name == "NaturalFlowers") navigate(`/NaturalFlowers`)
        else navigate(`/Category/${props.id}`, { state: { id: props.id, name: props.name } })
    }
    return (
        <div className='CategorysCard'>
            <div onClick={handelgo}
                className='link' >
                <div className='imageCategory'>
                    <img className='imageCat' src={props.image} />
                </div>
                <div className='titleCategory'>
                    {props.name}
                </div>
            </div>
        </div>
    );
}
export default CategorysCard;
