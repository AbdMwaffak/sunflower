import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { Toaster } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'universal-cookie';
import { getAllBouquets } from '../../RTK/naturalFlowers/getAllBouquetsSlice';
import { getAllChocolate } from '../../RTK/naturalFlowers/getAllChocolateSlice';
import { getBand } from '../../RTK/naturalFlowers/getBandSlice';
import { getPaper } from '../../RTK/naturalFlowers/getPaperSlice';
import { addFlowerToCart } from '../../RTK/shoppingCart/addFlowerToCartSlice';
import { getCart } from '../../RTK/shoppingCart/getCartSlice';
import Api from '../../allExtensions/API';
import Aaa from '../../allExtensions/aaa/Aaa';
import AllowAddition from '../../allExtensions/allowAddition/AllowAddition';
import '../../allExtensions/check/check.css';
import ExtraChocolate from '../../allExtensions/extraChocolate/ExtraChocolate';
import NoPaperOrStrip from '../../allExtensions/noPaperOrStrip/NoPaperOrStrip';
import NoToken from '../../allExtensions/noToken/NoToken';
import Back2 from '../../image/Back2.jpeg';
import './naturalFlowers.css';

const Naturalflowers = (props) => {
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
  const allBouquets = useSelector((state) => state.getAllBouquets)?.data;
  const allChocolate = useSelector((state) => state.getAllChocolate)?.data;
  const allBands = useSelector((state) => state.getBand)?.data;
  const allPapers = useSelector((state) => state.getPaper)?.data;
  const cartBroduct = useSelector((state) => state.getCart)?.data?.cart;
  /////////////////////////////
  const [reload, setReload] = useState('');
  /////////////////////////////
  const dispatch = useDispatch();
  /////////////////////////////
  const [sunflowersInfo, setSunflowersInfo] = useState({});
  const [card, setCard] = useState('');
  const [cardch, setCardch] = useState('true');
  const [chocoSum, setChocoSum] = useState(0);
  const [oneNum, setOneNum] = useState([]);
  const [validated, setValidated] = useState(false);
  const [openModel, setOpenModel] = useState(false);
  const [openModel2, setOpenModel2] = useState(false);
  const [openModel3, setOpenModel3] = useState(false);
  const [turnOn, setTurnOn] = useState(false);
  ///////////////////////////
  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    if (turnOn == false) {
      if (cookies.get('token') !== undefined || null) {
        if (sunflowersInfo?._id === undefined) {
          event.preventDefault();
          event.stopPropagation();
          setValidated(true);
          setOpenModel2(true);
        } else {
          setValidated(true);
          if (
            cartBroduct?.perfumes?.length === 0 &&
            cartBroduct?.products?.length === 0
          ) {
            const value = {
              naturalFlower: sunflowersInfo._id,
              chocolate: oneNum,
              totalPrice: chocoSum + sunflowersInfo.price,
              message: card,
            };
            dispatch(addFlowerToCart(value));
            setReload(!reload);
            setTurnOn(true);
            setTimeout(() => {
              setTurnOn(false);
              props.numCounter();
            }, 0);
          } else {
            setOpenModel(true);
          }
        }
      } else {
        setOpenModel3(true);
      }
    }
  };
  /////////////////////////////
  const handelIncreaseSum = (e, num) => {
    setChocoSum(chocoSum + e);
    if (num.count == 1) {
      oneNum.push(num);
    } else {
      oneNum?.map((one) =>
        one.id == num.id ? (one.count = num.count) : (one.count = one.count)
      );
    }
  };
  /////////////////////////////
  const handelDecreaseSum = (e, num) => {
    setChocoSum(chocoSum - e);
    if (num?.count == 0) {
      oneNum?.map((one, index) =>
        one?.id == num?.id ? oneNum?.splice(index, 1) : (one.count = one?.count)
      );
    } else
      oneNum?.map((one) =>
        one?.id == num?.id ? (one.count = num?.count) : (one.count = one?.count)
      );
  };
  /////////////////////////////
  const handelReload = () => {
    setReload(!reload);
  };
  /////////////////////////////
  const handleClose = () => {
    setTimeout(() => {
      setOpenModel(false);
      setOpenModel2(false);
      setOpenModel3(false);
    }, 1000);
  };
  /////////////////////////////
  useEffect(() => {
    dispatch(getAllBouquets());
    dispatch(getAllChocolate());
    dispatch(getBand());
    dispatch(getPaper());
    if (cookies.get('token') !== undefined || null) dispatch(getCart());
  }, [dispatch, reload]);
  //////////////////////////
  useEffect(function () {
    document.title = `SUNFLOWER - Naturalflowers `;
    return function () {
      document.title = 'SUNFLOWER';
    };
  }, []);
  //////////////////////////
  const { t } = useTranslation();
  return (
    <>
      <Toaster />
      {openModel3 && <NoToken handleClose={handleClose} />}
      {openModel2 && (
        <NoPaperOrStrip
          handleClose={handleClose}
          flowersNumber={sunflowersInfo?._id}
          // paper={paper?._id}
          // strip={band?._id}
        />
      )}
      {openModel && (
        <AllowAddition
          handleClose={handleClose}
          handelReload={handelReload}
          handleSubmit={handleSubmit}
        />
      )}
      <div className='bage'>
        <div className='title'>{t('flower.title')}</div>
        <div className='flowersBouquet'>
          <div className='flowersBouquetMain'>
            <div className='input1'>
              <span className='vv1'> {t('flower.create')} </span>
              <hr className='tapp' />
              <Form
                className='input2'
                noValidate
                validated={validated}
                onSubmit={handleSubmit}
              >
                <div className='input3'>
                  <span className='vv2'> {t('flower.number')}</span>
                  <Form.Select
                    className='input4'
                    aria-label='Default select example'
                    style={{ width: '40%' }}
                    required
                    onChange={(e) =>
                      setSunflowersInfo(allBouquets[e.target.value])
                    }
                  >
                    <option value={''}> {t('flower.open')}</option>
                    {typeof allBouquets != 'string' &&
                      allBouquets?.map((bouquet, index) => (
                        <option key={index} value={index}>
                          {' '}
                          {bouquet?.count}{' '}
                        </option>
                      ))}
                  </Form.Select>
                </div>

                <div className='input3'>
                  <span className='vv2'>{t('flower.attachCard')} </span>
                  <div
                    className='yesNo'
                    onChange={(e) => setCardch(e.target.value)}
                  >
                    <div key={`inline-radio`} className=' yesNo1'>
                      <Form.Check
                        inline
                        label={t('flower.yes')}
                        name='group1'
                        type='radio'
                        value='false'
                        id={`inline-radio`}
                      />
                      <Form.Check
                        inline
                        label={t('flower.no')}
                        name='group1'
                        type='radio'
                        value='true'
                        id={`inline-radio`}
                        onClick={() => setCard('')}
                      />
                    </div>
                  </div>
                </div>
                <div className='input5'>
                  <Form.Control
                    className='input6'
                    as='textarea'
                    aria-label='With textarea'
                    onChange={(e) => setCard(e.target.value)}
                    placeholder={t('public.write')}
                    value={card}
                    disabled={cardch === 'false' ? false : true}
                  />
                </div>
              </Form>
            </div>
            <div className='inputImage'>
              <img
                className='imgNaturalFlowers'
                src={
                  sunflowersInfo?.image
                    ? `${Api}/users/${sunflowersInfo?.image}`
                    : Back2
                }
              />
              {sunflowersInfo?.descriptionAr &&
                sunflowersInfo?.description !== '' && (
                  <div className='cbatsha'>
                    {lng == 'ar'
                      ? sunflowersInfo?.descriptionAr
                      : sunflowersInfo?.description}
                  </div>
                )}
            </div>
          </div>
          <div className='flowersBouquetExtra'>
            <span className='vv1'> {t('flower.supTitle')} </span>
            <hr className='tapp' />
            <span className='vv2'>{t('flower.choose')} </span>
            <div className='chocolate'>
              {typeof allChocolate == 'string' && (
                <div className='noProducts'>{allChocolate}</div>
              )}
              {typeof allChocolate != 'string' &&
                allChocolate?.map((Chocolate, index) => (
                  <ExtraChocolate
                    key={index}
                    id={Chocolate?._id}
                    name={lng == 'ar' ? Chocolate?.nameAr : Chocolate?.name}
                    price={Chocolate?.price}
                    image={Chocolate?.image}
                    handelIncreaseSum={handelIncreaseSum}
                    handelDecreaseSum={handelDecreaseSum}
                  />
                ))}
            </div>
          </div>
          <div className='res'>
            <div className='totalCost'>
              {chocoSum + (sunflowersInfo?.price ? sunflowersInfo?.price : 0)}.
              {t('public.sar')}
            </div>
            <button
              className='formButton5'
              type='submit'
              onClick={handleSubmit}
            >
              {t('flower.add')}
              <Aaa turnOn={turnOn} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Naturalflowers;
