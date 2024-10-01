import React from 'react';
import './editBouquet.css'
import { useDispatch } from 'react-redux';
import Api from '../API';
import { deleteBouquet } from '../../RTK/naturalFlowers/deleteBouquetSlice';

const EditBouquetCard = (props) => {

    const dispatch = useDispatch()
    const handelDelete = (e) => {
        const value = {
            id: props.id,
            pass: e
        }
        dispatch(deleteBouquet(value))
        props.reloadHandel()
        props.reloadHandel()
    }

    return (
        <div className='EditBouquet'>
            <div className='bouquetHader'>
                <div >
                    Cuantety :   {props.count}
                </div>
                <div>
                    Price :   {props.price}
                </div>


            </div>
            <hr />
            <div className='bouquetBody'>

                <div className='media'>
                    <img className='imageCat'
                        src={`${Api}/users/${props?.image}`} />
                </div>
                <div className='bouquetDescription' >
                    {props?.description}
                </div>
            </div>
            <hr />

            {/* <div className='bouquetTail'  >
                <Link to={`/EditMyNaturalFlower/${props.id}`} className='editlink'>
                    <button className='deleteButten' >
                        Edit
                    </button>
                </Link>
                <DeleteBouquetModel
                    delete={handelDelete}
                />


            </div> */}

        </div >

    );
}

export default EditBouquetCard;
