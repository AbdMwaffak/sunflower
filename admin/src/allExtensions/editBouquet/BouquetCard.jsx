import React from 'react';
import './editBouquet.css'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Api from '../API';
import { deleteBouquet } from '../../RTK/naturalFlowers/deleteBouquetSlice';
import DeleteBouquetModel from '../deleteModel/DeleteBouquetModel';
import { useTranslation } from 'react-i18next';

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
    ///////////////////////////////
    const { t, } = useTranslation();
    return (
        <div className='editBouquet'>
            <div className='bouquetHader'>
                <div >
                    {t('flower.cuantety')}  :   {props.count}
                </div>
                <div>
                    {t('flower.price')}  :   {props.price}.{t('public.sar')}
                </div>
            </div>
            <hr className='phr' />
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
            <hr className='phr' />
            <div className='bouquetTail'  >
                <DeleteBouquetModel
                    delete={handelDelete}
                />
            </div>

        </div >

    );
}

export default BouquetCard;
