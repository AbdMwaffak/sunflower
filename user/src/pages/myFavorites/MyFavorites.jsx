import React, { useEffect, useState } from 'react';
import './myFavorites.css'
import { useDispatch, useSelector } from 'react-redux';
import { getFavorite } from '../../RTK/favorite/getFavoriteSlice';
import Api from '../../allExtensions/API';
import ProductCardFavorite from '../../allExtensions/productCard/ProductCardFavorite';
import { emptyFavorite } from '../../RTK/favorite/emptyFavoriteSlice';
import { Toaster } from 'react-hot-toast';


const MyFavorites = () => {
    //////////////////////////////
    const allproducts = useSelector(state => state.getFavorite)?.data
    //////////////////////////////
    const dispatch = useDispatch()
    //////////////////////////////
    const [reload, setReload] = useState(true);
    //////////////////////////////
    const handleReload = () => {
        setReload(!reload)
    }
    //////////////////////////////
    const handleEmptyFavorite = () => {
        dispatch(emptyFavorite())
        setTimeout(() => {
            setReload(!reload)
        }, 1000);
    }
    //////////////////////
    useEffect(() => {
        dispatch(getFavorite())
    }, [dispatch, reload])
    //////////////////////////
    useEffect(
        function () {
            document.title = `SUNFLOWER - My Favorites `;
            return function () { document.title = 'SUNFLOWER' };
        }, [])
    ///////////////////
    return (
        <>
            <Toaster />
            <div className='myFavorites'>
                <div className='myFavoritesTitle'>
                    My Favorites
                </div>
                <div className='myFavoritesContener'>
                    <div className='recently'>
                        <div className='recentlyTitle'>
                            Recently added to favorites
                            {allproducts?.length != 0 &&
                                <button className='deletAll' onClick={handleEmptyFavorite}>
                                    Delete All
                                </button>}
                        </div>
                        <hr className='hrMyFavorites' />
                        <div className='contenerManth' >
                            {allproducts?.length == 0 &&
                                <div className='noArticles' >
                                    <b> Oops!, You haven't added any product to your favorites yet.
                                        <svg xmlns="http://www.w3.org/2000/svg" width={25} height={25} viewBox="0 0 36 36" ><path fill="#ffcb4c" d="M36 18c0 9.941-8.059 18-18 18c-9.94 0-18-8.059-18-18C0 8.06 8.06 0 18 0c9.941 0 18 8.06 18 18"></path><ellipse cx={12.176} cy={14.71} fill="#65471b" rx={2.647} ry={3.706}></ellipse><circle cx={24.882} cy={14.294} r={6.882} fill="#f4f7f9"></circle><path fill="#65471b" d="M14.825 9.946c-.322 0-.64-.146-.848-.423c-.991-1.321-2.028-2.029-3.083-2.104c-1.39-.095-2.523.947-2.734 1.158A1.057 1.057 0 1 1 6.663 7.08c.457-.457 2.129-1.936 4.381-1.773c1.695.12 3.251 1.111 4.627 2.945a1.059 1.059 0 0 1-.846 1.694"></path><path fill="#292f33" d="M32.824 36a1.059 1.059 0 0 1-1.059-1.059V14.824a1.059 1.059 0 1 1 2.118 0v20.118A1.06 1.06 0 0 1 32.824 36"></path><path fill="#67757f" d="M32.824 12.706c-.054 0-.105.012-.158.016c-.732-3.628-3.943-6.369-7.784-6.369c-4.379 0-7.941 3.562-7.941 7.941s3.562 7.941 7.941 7.941c3.468 0 6.416-2.238 7.496-5.343a2.118 2.118 0 1 0 .446-4.186m-7.942 7.412c-3.211 0-5.823-2.612-5.823-5.824s2.613-5.824 5.823-5.824c3.211 0 5.824 2.612 5.824 5.824s-2.613 5.824-5.824 5.824"></path><path fill="#65471b" d="M21.175 28.588c-.159 0-.321-.036-.473-.112c-1.819-.91-3.587-.91-5.406 0a1.059 1.059 0 1 1-.947-1.895c2.421-1.21 4.877-1.21 7.3 0a1.06 1.06 0 0 1-.474 2.007"></path><path fill="#bdddf4" d="M28.049 9.411a5.788 5.788 0 0 0-3.167-.94a5.824 5.824 0 0 0-5.824 5.824c0 1.169.348 2.255.94 3.167zm-5.652 10.144a5.794 5.794 0 0 0 2.485.563a5.824 5.824 0 0 0 5.824-5.824c0-.89-.206-1.731-.563-2.485z"></path></svg>
                                        ! </b>
                                    <br />
                                    <b>
                                        Start choosing your favorite products to remember them later. {" "}
                                        <svg className='heart' xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 36 36"><path fill="#dd2e44" d="M35.885 11.833c0-5.45-4.418-9.868-9.867-9.868c-3.308 0-6.227 1.633-8.018 4.129c-1.791-2.496-4.71-4.129-8.017-4.129c-5.45 0-9.868 4.417-9.868 9.868c0 .772.098 1.52.266 2.241C1.751 22.587 11.216 31.568 18 34.034c6.783-2.466 16.249-11.447 17.617-19.959c.17-.721.268-1.469.268-2.242"></path></svg>
                                    </b>
                                </div>
                            }
                            {allproducts?.filter(prod => {
                                if (prod.isActive == true) { return prod; }
                            }).map((product, index) => (
                                <ProductCardFavorite
                                    key={index}
                                    id={product._id}
                                    image={`${Api}/users/${product.images[0]}`}
                                    images={product.images}
                                    name={product.name}
                                    price={product.price}
                                    sizes={product.sizes}
                                    colors={product.colors}
                                    description={product.description}
                                    categoryName={product.categoryName}
                                    createdAt={product.createdAt}
                                    handleReload={handleReload}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default MyFavorites;
