import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBouquets } from '../../RTK/naturalFlowers/getAllBouquetsSlice';
import { useTranslation } from 'react-i18next';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router';
import ProductCard from '../productCard/ProductCard';
import Api from '../API';

const FlowersHome = (props) => {
  const allBouquets = useSelector((state) => state.getAllBouquets)?.data;
  //////////////////////////////
  const navigate = useNavigate();
  const gotofolwers = () => {
    navigate(`/Category/NaturalFlowers`);
  };
  //////////////////////////////
  const [reload, setReload] = useState('');
  //////////////////////////////
  const handelReload = () => {
    setReload(!reload);
  };
  //////////////////////////////
  const cookies = new Cookies();
  let lng = '';
  let token = '';
  if (cookies.get('token') !== undefined || null) {
    token = true;
  } else token = false;
  if (cookies.get('i18next') === 'ar') {
    lng = 'ar';
  } else lng = 'en';
  /////////////////////////////
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllBouquets());
  }, [dispatch, reload]);
  /////////////////////////
  const lastForeBouquets = allBouquets.slice(-4);
  /////////////////////////
  const { t } = useTranslation();
  return (
    <>
      <div className='supTitle'>{t('flower.title')}</div>
      <div className='ourCategorys'>
        {lastForeBouquets?.map((bouquet, index) => (
          <ProductCard
            key={index}
            id={bouquet._id}
            image={`${Api}/users/${bouquet.images[0]}`}
            images={bouquet.images}
            name={lng == 'ar' ? bouquet.nameAr : bouquet.name}
            description={
              lng == 'ar' ? bouquet.descriptionAr : bouquet.description
            }
            price={bouquet.price}
            categoryName={bouquet.categoryName}
            createdAt={bouquet.createdAt}
            isFavorite={bouquet.isFavorite}
            handelReload={handelReload}
            numCounter={props?.numCounter}
          />
        ))}
        <div className='tellFrowersHome'>
          <button className='formButton' onClick={gotofolwers}>
            {' '}
            more buqet{' '}
          </button>
        </div>
      </div>
    </>
  );
};

export default FlowersHome;
