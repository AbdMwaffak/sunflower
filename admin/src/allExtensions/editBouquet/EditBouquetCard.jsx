import React from 'react';
import './editBouquet.css'
import Api from '../API';
import { useTranslation } from 'react-i18next';

const EditBouquetCard = (props) => {
    ///////////////////////////
    const { t } = useTranslation();
    return (
        <div className='editBouquet'>
            <div className='bouquetHader'>
                <div >
                    {t('flowerBouquet.cuantety')} :   {props.count}
                </div>
                <div>
                    {t('flowerBouquet.price')} :   {props.price}
                </div>
            </div>
            <hr className='tapp' />
            <div className='bouquetBody'>
                <div className='media'>
                    <img className='imageCat'
                        src={`${Api}/users/${props?.image}`} />
                </div>
                <div className='bouquetDescription' >
                    {props?.description}
                </div>
            </div>
            <hr className='tapp' />
        </div >

    );
}

export default EditBouquetCard;
