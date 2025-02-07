import React, { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import Cookies from 'universal-cookie';
import Api from '../../allExtensions/API';
import ProductCard from '../../allExtensions/productCard/ProductCard';
import { getCategory } from '../../RTK/categoris/getCategorySlice';
import { getProductByCategory } from '../../RTK/product/getProductByCategorySlice';
import './productsByCategory.css';
const ProductsByCategory = () => {
  const id = useParams().id;
  //////////////////////////////
  const allproducts = useSelector((state) => state.getProductByCategory)?.data;
  const category = useSelector((state) => state.getCategory)?.data;
  //////////////////////////////
  const [reload, setReload] = useState('');
  //////////////////////////////
  const handelReload = () => {
    setReload(!reload);
  };
  /////////////////////////////
  const dispatch = useDispatch();
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
  //////////////////////////////
  useEffect(() => {
    dispatch(getProductByCategory(id));
    dispatch(getCategory(id));
  }, [dispatch, reload]);
  //////////////////////////
  useEffect(function () {
    document.title = `SUNFLOWER - Products `;
    return function () {
      document.title = 'SUNFLOWER';
    };
  }, []);

  ////////////////////////////////////
  const { t, i18n } = useTranslation();
  return (
    <>
      <Toaster />
      <div className='bage'>
        <div className='title'>
          {lng == 'ar' ? category.nameAr : category.name}
        </div>
        <div className='categorysName'>
          {allproducts?.length == 0 && (
            <div className='noProducts'>
              <b>
                {' '}
                {t('category.noProducts1')}
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width={25}
                  height={25}
                  viewBox='0 0 36 36'
                >
                  <path
                    fill='#ffcb4c'
                    d='M36 18c0 9.941-8.059 18-18 18c-9.94 0-18-8.059-18-18C0 8.06 8.06 0 18 0c9.941 0 18 8.06 18 18'
                  ></path>
                  <ellipse
                    cx={12.176}
                    cy={14.71}
                    fill='#65471b'
                    rx={2.647}
                    ry={3.706}
                  ></ellipse>
                  <circle
                    cx={24.882}
                    cy={14.294}
                    r={6.882}
                    fill='#f4f7f9'
                  ></circle>
                  <path
                    fill='#65471b'
                    d='M14.825 9.946c-.322 0-.64-.146-.848-.423c-.991-1.321-2.028-2.029-3.083-2.104c-1.39-.095-2.523.947-2.734 1.158A1.057 1.057 0 1 1 6.663 7.08c.457-.457 2.129-1.936 4.381-1.773c1.695.12 3.251 1.111 4.627 2.945a1.059 1.059 0 0 1-.846 1.694'
                  ></path>
                  <path
                    fill='#292f33'
                    d='M32.824 36a1.059 1.059 0 0 1-1.059-1.059V14.824a1.059 1.059 0 1 1 2.118 0v20.118A1.06 1.06 0 0 1 32.824 36'
                  ></path>
                  <path
                    fill='#67757f'
                    d='M32.824 12.706c-.054 0-.105.012-.158.016c-.732-3.628-3.943-6.369-7.784-6.369c-4.379 0-7.941 3.562-7.941 7.941s3.562 7.941 7.941 7.941c3.468 0 6.416-2.238 7.496-5.343a2.118 2.118 0 1 0 .446-4.186m-7.942 7.412c-3.211 0-5.823-2.612-5.823-5.824s2.613-5.824 5.823-5.824c3.211 0 5.824 2.612 5.824 5.824s-2.613 5.824-5.824 5.824'
                  ></path>
                  <path
                    fill='#65471b'
                    d='M21.175 28.588c-.159 0-.321-.036-.473-.112c-1.819-.91-3.587-.91-5.406 0a1.059 1.059 0 1 1-.947-1.895c2.421-1.21 4.877-1.21 7.3 0a1.06 1.06 0 0 1-.474 2.007'
                  ></path>
                  <path
                    fill='#bdddf4'
                    d='M28.049 9.411a5.788 5.788 0 0 0-3.167-.94a5.824 5.824 0 0 0-5.824 5.824c0 1.169.348 2.255.94 3.167zm-5.652 10.144a5.794 5.794 0 0 0 2.485.563a5.824 5.824 0 0 0 5.824-5.824c0-.89-.206-1.731-.563-2.485z'
                  ></path>
                </svg>{' '}
                !{' '}
              </b>
              <br />
              <b>
                {t('category.noProducts2')}
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width={30}
                  height={30}
                  viewBox='0 0 36 36'
                >
                  <path
                    fill='#662113'
                    d='M4 11v12.375c0 2.042 1.093 2.484 1.093 2.484l11.574 9.099C18.489 36.39 18 33.375 18 33.375V22z'
                  ></path>
                  <path
                    fill='#c1694f'
                    d='M32 11v12.375c0 2.042-1.063 2.484-1.063 2.484s-9.767 7.667-11.588 9.099C17.526 36.39 18 33.375 18 33.375V22z'
                  ></path>
                  <path
                    fill='#d99e82'
                    d='M19.289.5c-.753-.61-1.988-.61-2.742 0L4.565 10.029c-.754.61-.754 1.607 0 2.216l12.023 9.646c.754.609 1.989.609 2.743 0l12.104-9.73c.754-.609.754-1.606 0-2.216z'
                  ></path>
                  <path
                    fill='#d99e82'
                    d='M18 35.75c-.552 0-1-.482-1-1.078V21.745c0-.596.448-1.078 1-1.078c.553 0 1 .482 1 1.078v12.927c0 .596-.447 1.078-1 1.078'
                  ></path>
                  <path
                    fill='#202126'
                    d='M28 18.836c0 1.104.104 1.646-1 2.442l-2.469 1.878c-1.104.797-1.531.113-1.531-.992v-2.961c0-.193-.026-.4-.278-.608C20.144 16.47 10.134 8.519 8.31 7.051l4.625-3.678c1.266.926 10.753 8.252 14.722 11.377c.197.156.343.328.343.516z'
                  ></path>
                  <path
                    fill='#F1C92F'
                    d='M27.656 14.75C23.688 11.625 14.201 4.299 12.935 3.373l-1.721 1.368l-2.904 2.31c1.825 1.468 11.834 9.419 14.412 11.544a.7.7 0 0 1 .248.371L27.903 15a1.2 1.2 0 0 0-.247-.25'
                  ></path>
                  <path
                    fill='#F1C92F'
                    d='M28 18.836v-3.57c0-.188-.146-.359-.344-.516c-3.968-3.125-13.455-10.451-14.721-11.377l-2.073 1.649c3.393 2.669 12.481 9.681 14.86 11.573c.256.204.278.415.278.608v4.836l1-.761c1.104-.797 1-1.338 1-2.442'
                  ></path>
                  <path
                    fill='#F1C92F'
                    d='M27.656 14.75C23.688 11.625 14.201 4.299 12.935 3.373l-2.073 1.649c3.393 2.669 12.481 9.681 14.86 11.573c.037.029.06.059.087.088L27.903 15a1.2 1.2 0 0 0-.247-.25'
                  ></path>
                </svg>
              </b>
            </div>
          )}
          {allproducts
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
                name={lng == 'ar' ? product.nameAr : product.name}
                description={
                  lng == 'ar' ? product.descriptionAr : product.description
                }
                price={product.price}
                sizes={product.sizes}
                colors={product.colors}
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
export default ProductsByCategory;
