import React from 'react';
import './editBouquet.css'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Api from '../API';
import { deleteBouquet } from '../../RTK/naturalFlowers/deleteBouquetSlice';
import DeleteBouquetModel from '../deleteModel/DeleteBouquetModel';

const BouquetCard = (props) => {

    const dispatch = useDispatch()
    const handelDelete = (e) => {
        const value = {
            id: props.id,
            pass: e
        }
        dispatch(deleteBouquet(value))
        setTimeout(() => {
            props.reloadHandel()
        }, 1000);

    }

    return (
        <div className='EditBouquet'>
            <div className='bouquetHader'>
                <div >
                    {/* Flowers */}
                    Cuantety :   {props.count}
                </div>
                <div>
                    {/* Bouquet */}
                    Price :   {props.price}
                </div>


            </div>
            <hr />
            <div className='bouquetBody'>

                <div className='media'>
                    <Link to={`/EditMyNaturalFlower/${props.id}`} className='editlink'>


                        <img className='imageCat'
                            src={`${Api}/users/${props?.image}`} />
                    </Link>
                </div>
                <div className='bouquetDescription' >
                    {props?.description}
                </div>
            </div>
            <hr />

            <div className='bouquetTail'  >

                <DeleteBouquetModel
                    delete={handelDelete}
                />


            </div>

        </div >

    );
}

export default BouquetCard;
