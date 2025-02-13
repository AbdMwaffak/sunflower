import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import Cookies from 'universal-cookie';
import { addToFavorite } from '../../RTK/favorite/addToFavoriteSlice';
import FavoriteButton from '../favoriteButton/FavoriteButton';
import NoToken from '../noToken/NoToken';
import ShareButton from '../shareButton/ShareButton';
import './productCard.css';

const ProductCard = (props) => {
  const cookies = new Cookies();
  //////////////////
  const navigate = useNavigate();
  const handelgo = () => {
    navigate(`/product/${props.id}`, { state: { id: props.id } });
  };
  //////////////////
  const [openModel3, setOpenModel3] = useState(false);
  //////////////////
  const dispatch = useDispatch();
  const hanelAddToFavorite = () => {
    if (cookies.get('token') !== undefined || null) {
      dispatch(addToFavorite({ productId: props.id }));
      props?.handelReload();
    } else {
      setOpenModel3(true);
    }
  };
  //////////////////////////////
  const handleClose = () => {
    setTimeout(() => {
      setOpenModel3(false);
    }, 1000);
  };
  ////////////////////////////////////
  const { t } = useTranslation();
  return (
    <>
      {openModel3 && <NoToken handleClose={handleClose} />}
      <div className='productCard'>
        <div className='imageCard'>
          <img className='allImage' src={props.image} onClick={handelgo} />
          <div className='imgNum'>1/{props?.images.length}</div>
          <div className='producButten'>
            <ShareButton id={props?.id} img={props?.image} />
            <div className='favoret' onClick={hanelAddToFavorite}>
              <FavoriteButton isFavorite={props?.isFavorite} />
            </div>
          </div>
        </div>
        <div className='productTitle'>
          <div className='pName'> {props?.name}</div>
          <div className='title2'>
            <div className='pDate'>
              {' '}
              {props.price} .{t('public.sar')}{' '}
            </div>
            <div className='pDate'> {props?.createdAt?.split('T')[0]}</div>
          </div>
        </div>
        <hr className='phr' />
        <div className='sizesCard'>
          {props?.sizes?.map((size, index) => (
            <div className='sizeCard' key={index} id={size._id}>
              <div> {size.size} </div>
            </div>
          ))}
        </div>
        <hr className='phr' />
        <div className='colorsCard'>
          {props?.colors?.map((color, index) => (
            <div
              className='colorCard'
              key={index}
              id={color._id}
              style={{ backgroundColor: color }}
            ></div>
          ))}
        </div>
      </div>
    </>
  );
};
export default ProductCard;
