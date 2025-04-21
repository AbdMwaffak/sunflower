import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { getCategories } from '../../RTK/categoris/getCategoriesSlice ';
import Api from '../API';
import './categoriesBar.css';

const CategoriesBar = (props) => {
  const scrollContainerRef = useRef(null);
  const allCategories = useSelector((state) => state.getCategories)?.data;
  const [reload, setReload] = useState('');
  ////////////////////////////
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -200,
        behavior: 'smooth',
      });
    }
  };
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 200,
        behavior: 'smooth',
      });
    }
  };
  //////////////////////////////
  const navigate = useNavigate();
  const handelgo = (option) => {
    if (option?.name == 'perfumes') navigate(`/Perfumes`);
    // else if (option?.name == "natural flowers") navigate(`/NaturalFlowers`)
    else navigate(`/Category/${option._id}`, { state: { id: props?.name } });
  };
  //////////////////////////////
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch, reload]);
  //////////////////////////
  return (
    <div className='related-searches-container'>
      <button className='scroll-button left' onClick={scrollLeft}>
        &#10094;
      </button>
      <div className='related-searches-list' ref={scrollContainerRef}>
        {allCategories
          ?.filter((cate) => {
            if (cate.isActive == true) {
              return cate;
            }
          })
          .map((option, index) => (
            <div
              key={index}
              className='related-search-item'
              onClick={() => handelgo(option)}
            >
              <div className='catImagecc'>
                <img
                  className='allImage'
                  src={`${Api}/users/${option.image}`}
                />
              </div>
              {props?.lng == 'ar' ? option.nameAr : option.name}
            </div>
          ))}
      </div>
      <button className='scroll-button right' onClick={scrollRight}>
        &#10095;
      </button>
    </div>
  );
};

export default CategoriesBar;
