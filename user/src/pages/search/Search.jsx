import React, { useEffect, useState } from 'react';
import './search.css'
import { useDispatch, useSelector } from 'react-redux';
import { getSearch } from '../../RTK/product/getSearchSlice';
import ProductCard from '../../allExtensions/productCard/ProductCard';
import { useParams } from 'react-router-dom';
import Api from '../../allExtensions/API';
import Cookies from 'universal-cookie';
import { useTranslation } from 'react-i18next';


const Search = () => {
    const cookies = new Cookies();
    let lng = ''
    let token = ''
    if (cookies.get('token') !== undefined || null) {
        token = true
    } else token = false
    if (cookies.get('i18next') === "ar") {
        lng = "ar"
    } else lng = "en"
    /////////////////////////////
    const searchKey = useParams()?.searchKey
    ///////////////////
    const allSearch = useSelector(state => state.getSearch)?.data
    ///////////////////
    const [reload, setReload] = useState(true)
    ///////////////////
    const handelReload = () => {
        setReload(!reload)
    }
    ///////////////////////////
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getSearch(searchKey))
    }, [dispatch, reload, searchKey])
    //////////////////////////
    useEffect(
        function () {
            document.title = `SUNFLOWER - ${searchKey} `;
            return function () { document.title = 'SUNFLOWER' };
        }, [])
    ///////////////////
    const { t } = useTranslation();
    return (
        <div className='bage'>
            <div className='title'>
                {t("search.title")}
            </div>
            <div className='searchPageContener'>
                {allSearch?.length == 0 &&
                    <div className='noProducts' >
                        <b> {t("search.message1")}{' '}
                            <svg xmlns="http://www.w3.org/2000/svg" width={25} height={25} viewBox="0 0 36 36" ><path fill="#ffcb4c" d="M36 18c0 9.941-8.059 18-18 18c-9.94 0-18-8.059-18-18C0 8.06 8.06 0 18 0c9.941 0 18 8.06 18 18"></path><ellipse cx={12.176} cy={14.71} fill="#65471b" rx={2.647} ry={3.706}></ellipse><circle cx={24.882} cy={14.294} r={6.882} fill="#f4f7f9"></circle><path fill="#65471b" d="M14.825 9.946c-.322 0-.64-.146-.848-.423c-.991-1.321-2.028-2.029-3.083-2.104c-1.39-.095-2.523.947-2.734 1.158A1.057 1.057 0 1 1 6.663 7.08c.457-.457 2.129-1.936 4.381-1.773c1.695.12 3.251 1.111 4.627 2.945a1.059 1.059 0 0 1-.846 1.694"></path><path fill="#292f33" d="M32.824 36a1.059 1.059 0 0 1-1.059-1.059V14.824a1.059 1.059 0 1 1 2.118 0v20.118A1.06 1.06 0 0 1 32.824 36"></path><path fill="#67757f" d="M32.824 12.706c-.054 0-.105.012-.158.016c-.732-3.628-3.943-6.369-7.784-6.369c-4.379 0-7.941 3.562-7.941 7.941s3.562 7.941 7.941 7.941c3.468 0 6.416-2.238 7.496-5.343a2.118 2.118 0 1 0 .446-4.186m-7.942 7.412c-3.211 0-5.823-2.612-5.823-5.824s2.613-5.824 5.823-5.824c3.211 0 5.824 2.612 5.824 5.824s-2.613 5.824-5.824 5.824"></path><path fill="#65471b" d="M21.175 28.588c-.159 0-.321-.036-.473-.112c-1.819-.91-3.587-.91-5.406 0a1.059 1.059 0 1 1-.947-1.895c2.421-1.21 4.877-1.21 7.3 0a1.06 1.06 0 0 1-.474 2.007"></path><path fill="#bdddf4" d="M28.049 9.411a5.788 5.788 0 0 0-3.167-.94a5.824 5.824 0 0 0-5.824 5.824c0 1.169.348 2.255.94 3.167zm-5.652 10.144a5.794 5.794 0 0 0 2.485.563a5.824 5.824 0 0 0 5.824-5.824c0-.89-.206-1.731-.563-2.485z"></path></svg>
                            ! {' '} </b>
                        <br />
                        <b>
                            {t("search.message2")}{' '}
                            <svg xmlns="http://www.w3.org/2000/svg" width={25} height={25} viewBox="0 0 64 64"><path fill="#b0bdc6" d="m18.322 41.924l2.898-2.9l3.82 3.818l-2.9 2.9z"></path><path fill="#f1c92f" d="m19.24 42.842l2.9-2.898l1.98 1.98l-2.9 2.899z"></path><path fill="#b0bdc6" d="m19.954 40.226l1.202-1.202l3.818 3.82l-1.202 1.201z"></path><path fill="#f1c92f" d="M22.5 41.5c9 9 23.7 9 32.8 0c9-9 9-23.7 0-32.8s-23.7-9-32.8 0c-9.1 9.1-9.1 23.8 0 32.8m2.1-30.6C32.5 3 45.2 3 53 10.9c7.9 7.9 7.9 20.6 0 28.4c-7.9 7.9-20.6 7.9-28.4 0c-7.8-7.8-7.8-20.5 0-28.4"></path><path fill="#b0bdc6" d="M24.1 39.9c8.1 8.1 21.3 8.1 29.5 0c8.1-8.1 8.1-21.3 0-29.5c-8.1-8.1-21.3-8.1-29.5 0c-8.1 8.2-8.1 21.4 0 29.5m1.1-28.4C32.7 4 45 4 52.5 11.5s7.5 19.8 0 27.3s-19.8 7.5-27.3 0s-7.5-19.8 0-27.3"></path><path fill="#f0ce51" d="M27.9 29.8c6.5 6.5 17.1 6.5 23.6 0c1.7-1.7 3-3.7 3.8-5.9c.4 4.8-1.2 9.7-4.8 13.3c-6.5 6.5-17.1 6.5-23.6 0c-4.8-4.8-6-11.8-3.8-17.7c.4 3.8 2 7.4 4.8 10.3" opacity={0.6}></path><path fill="#333" d="m3.487 53.598l13.788-13.789l6.93 6.93l-13.789 13.788z"></path><path fill="#575b5e" d="m5.042 55.153l13.79-13.787l3.818 3.819L8.86 58.97z"></path><path fill="#b0bdc6" d="M2.1 52.9c-1.1 1.1 7.8 10.1 9 9l.7-.7c1.1-1.1-7.8-10.1-9-9z"></path><path fill="#f1c92f" d="M3.6 54.4c-1.1 1.1 4.8 7.1 6 6l.7-.7c1.1-1.1-4.8-7.1-6-6z"></path></svg>
                        </b>
                    </div>

                }
                {allSearch?.filter(prod => {
                    if (prod.isActive == true) { return prod; }
                }).map((product, index) => (
                    <ProductCard
                        key={index}
                        id={product._id}
                        image={`${Api}/users/${product?.images[0]}`}
                        images={product?.images}
                        name={lng == "ar" ? product?.nameAr : product?.name}
                        price={product?.price}
                        sizes={product?.sizes}
                        colors={product?.colors}
                        description={product?.description}
                        categoryName={product?.categoryName}
                        createdAt={product?.createdAt}
                        isFavorite={product?.isFavorite}
                        handelReload={handelReload}

                    />
                ))}


            </div>

        </div>
    );
}

export default Search;
