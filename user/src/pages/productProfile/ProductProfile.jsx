import React, { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Toaster } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import Cookies from 'universal-cookie';
import Aaa3 from '../../allExtensions/aaa3/Aaa3';
import AllowAddition3 from '../../allExtensions/allowAddition3/AllowAddition3';
import AllowPoint from '../../allExtensions/allowPoint/AllowPoint';
import Api from '../../allExtensions/API';
import NoSizeOrColor from '../../allExtensions/noSizeOrColor/NoSizeOrColor';
import NoToken from '../../allExtensions/noToken/NoToken';
import ProductCard from '../../allExtensions/productCard/ProductCard';
import { getMe } from '../../RTK/Auth/getMeSlice';
import { getProductById } from '../../RTK/product/getProductByIdSlice ';
import { getSuggested } from '../../RTK/product/getSuggestedSlice';
import { addToCart } from '../../RTK/shoppingCart/addToCartSlice';
import { getCart } from '../../RTK/shoppingCart/getCartSlice';
import './productProfile.css';

const ProductProfile = (props) => {
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
  const id = useParams()?.id;
  const product = useSelector((state) => state.getProductById)?.data;
  const allSuggested = useSelector((state) => state.getSuggested)?.data;
  const cartBroduct = useSelector((state) => state.getCart)?.data?.cart;
  const me = useSelector((state) => state.getMe)?.data;
  //////////////////////////////
  const [nsize, setNSize] = useState(' ');
  const [nPsize, setNPSize] = useState(' ');
  const [ncolor, setNColor] = useState(' ');
  const [reload, setReload] = useState(true);
  const [openModel1, setOpenModel1] = useState(false);
  const [openModel2, setOpenModel2] = useState(false);
  const [openModel3, setOpenModel3] = useState(false);
  const [openModel4, setOpenModel4] = useState(false);
  const [turnOn, setTurnOn] = useState(false);
  //////////////////////////////
  const dispatch = useDispatch();
  //////////////////////////////
  const handeladdToCartMoney = () => {
    if (turnOn == false) {
      if (cookies.get('token') !== undefined || null) {
        if (nsize != ' ' && ncolor != ' ') {
          if (cartBroduct?.naturalFlowers?.length === 0) {
            const value = {
              product: id,
              size: nsize,
              color: ncolor,
              paymentMethod: 'money',
            };
            dispatch(addToCart(value));
            setTurnOn(true);
            setTimeout(() => {
              setTurnOn(false);
            }, 4000);
            setReload(!reload);
            props.numCounter();
          } else {
            setOpenModel1(true);
          }
        } else {
          setOpenModel4(true);
        }
      } else {
        setOpenModel3(true);
      }
    }
  };
  //////////////////////////////
  const handeladdToCartPoints = () => {
    if (turnOn == false) {
      if (cookies.get('token') !== undefined || null) {
        if (nsize != ' ' && ncolor != ' ') {
          if (me?.points != 0 && me?.points >= nPsize) {
            if (cartBroduct?.naturalFlowers?.length === 0) {
              const value = {
                product: id,
                size: nsize,
                color: ncolor,
                paymentMethod: 'points',
              };
              dispatch(addToCart(value));
              setReload(!reload);
              setTurnOn(true);
              setTimeout(() => {
                setTurnOn(false);
              }, 4000);
              props.numCounter();
            } else {
              setOpenModel1(true);
            }
          } else {
            setOpenModel2(true);
          }
        } else {
          setOpenModel4(true);
        }
      } else {
        setOpenModel3(true);
      }
    }
  };
  //////////////////////////////
  const handleClose = () => {
    setTimeout(() => {
      setOpenModel1(false);
      setOpenModel2(false);
      setOpenModel3(false);
      setOpenModel4(false);
    }, 1000);
  };
  //////////////////////////////
  const handelReload = () => {
    setReload(!reload);
  };
  ///////////////////////////
  useEffect(() => {
    dispatch(getProductById(id));
    if (cookies.get('token') !== undefined || null) {
      dispatch(getCart());
      dispatch(getMe());
      dispatch(getSuggested(id));
    }
  }, [dispatch, id, reload]);
  //////////////////////////
  useEffect(function () {
    document.title = `SUNFLOWER - Product Profile `;
    return function () {
      document.title = 'SUNFLOWER';
    };
  }, []);
  ////////////////////////////////////
  const { t } = useTranslation();
  return (
    <>
      <Toaster />
      {openModel1 && (
        <AllowAddition3 handleClose={handleClose} handelReload={handelReload} />
      )}
      {openModel2 && (
        <AllowPoint productPoint={nPsize} handleClose={handleClose} />
      )}
      {openModel3 && <NoToken handleClose={handleClose} />}
      {openModel4 && (
        <NoSizeOrColor
          productSize={nsize}
          productColor={ncolor}
          handleClose={handleClose}
        />
      )}
      <div className='bage'>
        <div className='title'>
          {lng == 'ar' ? product.nameAr : product.name}
        </div>
        <div className='productContener'>
          <div className='sliderBack'>
            <div className='imgSlider'>
              <Carousel data-bs-theme='dark'>
                {product?.images?.map((img, index) => (
                  <Carousel.Item key={index}>
                    <img
                      className='w-100 profileImg'
                      src={`${Api}/users/${img}`}
                      alt={index}
                    />
                    <Carousel.Caption> </Carousel.Caption>
                  </Carousel.Item>
                ))}
              </Carousel>
            </div>
          </div>
          <div className='productPrice'>
            {product.price} {t('public.sar')}
          </div>
          <div className='productDescription'>
            <h3> {t('product.ProductDescription')} </h3>
            <hr className='tapp' />
            <p>
              {' '}
              {lng == 'ar' ? product?.descriptionAr : product?.description}{' '}
            </p>
          </div>
          <div className='productSize'>
            <div className='productSizeT'>
              <h3> {t('product.ProductSize')} </h3>
              {nsize != ' ' && (
                <div className='sizeItem'>
                  <p>
                    {' '}
                    {t('product.size')} : {nsize}{' '}
                  </p>
                </div>
              )}
            </div>
            <hr className='tapp' />
            <div className='sizeBody'>
              <div className='haderSizeline'>
                <div className='sizeCall1'> {t('product.size')} </div>
                <div className='sizeCall1'> {t('product.priceByMoney')} </div>
                <div className='sizeCall1'> {t('product.priceByPoints')} </div>
              </div>
              {product?.sizes?.map((size, index) => (
                <div
                  className='sizeLine'
                  key={index}
                  onClick={() => (
                    setNSize(size?.size), setNPSize(size?.priceInPoints)
                  )}
                >
                  <div className='sizeCall1'> {size?.size} </div>
                  <div className='sizeCall1'>
                    {' '}
                    {size?.price} .{t('public.sar')}{' '}
                  </div>
                  <div className='sizeCall1'>
                    {' '}
                    {size?.priceInPoints == 0 ? 'No' : size?.priceInPoints} .
                    {t('public.point')}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className='productColors'>
            <div className='productSizeT'>
              <h3> {t('product.ProductColors')} </h3>
              {ncolor != ' ' && (
                <div
                  className='colorItem'
                  style={{ backgroundColor: `${ncolor}` }}
                ></div>
              )}
            </div>
            <hr className='tapp' />
            <div className='colorMap'>
              {product?.colors?.map((color, index) => (
                <div
                  className='colorItem'
                  key={index}
                  onClick={() => setNColor(color)}
                  style={{ backgroundColor: `${color}` }}
                ></div>
              ))}
            </div>
          </div>
          <div className='res'>
            <button className='formButton5' onClick={handeladdToCartMoney}>
              <Aaa3 turnOn={turnOn} />
              {t('product.addtoCart(by money)')}{' '}
            </button>
            <button className='formButton5' onClick={handeladdToCartPoints}>
              <Aaa3 turnOn={turnOn} />
              {t('product.addtoCart(by points)')}{' '}
            </button>
          </div>
        </div>
        <div className='supTitle'>{t('product.suggestions')}</div>
        <div className='suggestions'>
          {allSuggested
            ?.filter((prod) => {
              if (prod.isActive == true) {
                return prod;
              }
            })
            .map((product, index) => (
              <ProductCard
                key={index}
                id={product._id}
                image={`${Api}/users/${product.images[0]}`}
                images={product.images}
                name={lng == 'ar' ? product?.nameAr : product?.name}
                price={product.price}
                sizes={product.sizes}
                colors={product.colors}
                description={product.description}
                categoryName={product.categoryName}
                createdAt={product.createdAt}
                isFavorite={product.isFavorite}
                handelReload={handelReload}
              />
            ))}
        </div>
      </div>
    </>
  );
};
export default ProductProfile;
