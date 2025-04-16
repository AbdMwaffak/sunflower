import { configureStore } from '@reduxjs/toolkit';
import getProductByCategorySlice from './product/getProductByCategorySlice';
import getProductByIdSlice from './product/getProductByIdSlice ';
import getProductSlice from './product/getProductSlice ';
import getCategoriesSlice from './categoris/getCategoriesSlice ';
import postLoginSlice from './Auth/loginSlice';
import postRegisterSlice from './Auth/registerSlice';
import addToFavoriteSlice from './favorite/addToFavoriteSlice';
import removeFromFavoriteSlice from './favorite/removeFromFavoriteSlice';
import getFavoriteSlice from './favorite/getFavoriteSlice';
import getArticlesSlice from './arcticles/getArticlesSlice';
import likeArticleSlice from './arcticles/likeArticleSlice';
import getAllBouquetsSlice from './naturalFlowers/getAllBouquetsSlice';
import getAllChocolateSlice from './naturalFlowers/getAllChocolateSlice';
import getBandSlice from './naturalFlowers/getBandSlice';
import getBouquetByIdSlice from './naturalFlowers/getBouquetByIdSlice';
import getPaperSlice from './naturalFlowers/getPaperSlice';
import getAllPerfumeSlice from './perfume/getAllPerfumeSlice';
import addToCartSlice from './shoppingCart/addToCartSlice';
import getCartSlice from './shoppingCart/getCartSlice';
import addPerfumeToCartSlice from './shoppingCart/addPerfumeToCartSlice';
import addFlowerToCartSlice from './shoppingCart/addFlowerToCartSlice';
import emptyCartSlice from './shoppingCart/emptyCartSlice';
import removeFromCartSlice from './shoppingCart/removeFromCartSlice';
import getMeSlice from './Auth/getMeSlice';
import sendMessageSlice from './message/sendMessageSlice';
import getAllMessageSlice from './message/getAllMessageSlice';
import deleteMessageSlice from './message/deleteMessageSlice';
import removePFromCartSlice from './shoppingCart/removePFromCartSlice';
import removeNFromCartSlice from './shoppingCart/removeNFromCartSlice';
import getAllOffersSlice from './offers/getAllOffersSlice';
import getOffersByIdSlice from './offers/getOffersByIdSlice';
import getAllaboutSlice from './about/getAllaboutSlice';
import getaboutByIdSlice from './about/getaboutByIdSlice';
import addOfferToCartSlice from './shoppingCart/addOfferToCartSlice';
import removeOFromCartSlice from './shoppingCart/removeOFromCartSlice ';
import emptyFavoriteSlice from './favorite/emptyFavoriteSlice';
import getCategorySlice from './categoris/getCategorySlice';
import getSuggestedSlice from './product/getSuggestedSlice';
import getSearchSlice from './product/getSearchSlice';
import getAllSettingsSlice from './settings/getAllSettingsSlice';
import getAllcitiesSlice from './settings/getAllcitiesSlice';
import postOrderSlice from './shoppingCart/postOrderSlice';
import getOrdersSlice from './shoppingCart/getOrdersSlice';
import patchMeSlice from './Auth/patchMeSlice';
import  verifyingSlice  from './Auth/verifyingSlice';




export const store = configureStore({
    reducer: {
        postLogin: postLoginSlice,
        postRegister: postRegisterSlice,
        verifying:verifyingSlice,
        getMe: getMeSlice,
        patch: patchMeSlice,

        getProduct: getProductSlice,
        getProductByCategory: getProductByCategorySlice,
        getProductById: getProductByIdSlice,
        getSuggested: getSuggestedSlice,
        getSearch: getSearchSlice,

        getCategories: getCategoriesSlice,
        getCategory: getCategorySlice,

        addToFavorite: addToFavoriteSlice,
        removeFromFavorite: removeFromFavoriteSlice,
        getFavorite: getFavoriteSlice,
        emptyFavorite: emptyFavoriteSlice,

        getArticles: getArticlesSlice,
        likeArticle: likeArticleSlice,

        getAllBouquets: getAllBouquetsSlice,
        getBouquetById: getBouquetByIdSlice,
        getAllChocolate: getAllChocolateSlice,
        getBand: getBandSlice,
        getPaper: getPaperSlice,
        getAllPerfume: getAllPerfumeSlice,

        addToCart: addToCartSlice,
        postOrder: postOrderSlice,
        removeFromCart: removeFromCartSlice,
        addFlowerToCart: addFlowerToCartSlice,
        addPerfumeToCart: addPerfumeToCartSlice,
        addOfferToCar: addOfferToCartSlice,
        getCart: getCartSlice,
        emptyCart: emptyCartSlice,
        removePFromCart: removePFromCartSlice,
        removeNFromCart: removeNFromCartSlice,
        removeOFromCart: removeOFromCartSlice,

        sendMessage: sendMessageSlice,
        getAllMessage: getAllMessageSlice,
        deleteMessage: deleteMessageSlice,

        getAllOffers: getAllOffersSlice,
        getOffersById: getOffersByIdSlice,

        getAllabout: getAllaboutSlice,
        getaboutById: getaboutByIdSlice,

        getAllSettings: getAllSettingsSlice,
        getAllcities: getAllcitiesSlice,

        getOrders: getOrdersSlice,



    },


})
