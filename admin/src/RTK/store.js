import { configureStore } from '@reduxjs/toolkit';
import postLoginReducer from './Auth/loginSlice';
import getMeSlice from './Auth/getMeSlice';
import getCategoriesSlice from './categories/getCategoriesSlice ';
import postNewCategorySlice from './categories/postNewCategorySlice';
import getCategoryByIdSlice from './categories/getCategoryByIdSlice';
import patchCategoryByIdSlice from './categories/patchCategoryByIdSlice';
import stateCategoryByIdSlice from './categories/stateCategoryByIdSlice';
import deleteCategoryByIdSlice from './categories/deleteCategoryByIdSlice';
import getArticlesSlice from './arcticles/getArticlesSlice ';
import postArticleSlice from './arcticles/postArticleSlice';
import deleteArticelByIdSlice from './arcticles/deleteArticelByIdSlice';
import likeArticleSlice from './arcticles/likeArticleSlice';
import shareArticleSlice from './arcticles/shareArticleSlice';
import postProductSlice from './product/postProductSlice';
import deleteProductByIdSlice from './product/deleteProductByIdSlice';
import getProductSlice from './product/getProductSlice ';
import getProductByIdSlice from './product/getProductByIdSlice ';
import patchProductByIdSlice from './product/patchProductByIdSlice';
import postBandSlice from './band/postBandSlice';
import getProductByCategorySlice from './product/getProductByCategorySlice';
import getBandSlice from './band/getBandSlice';
import postBouquetSlice from './naturalFlowers/postBouquetSlice';
import deleteBandSlice from './band/deleteBandSlice';
import deletePaperSlice from './paper/deletePaperSlice';
import getPaperSlice from './paper/getPaperSlice';
import postPaperSlice from './paper/postPaperSlice';
import patchArticlesSlice from './arcticles/patchArticlesSlice';
import getArticleByIdSlice from './arcticles/getArticleByIdSlice';
import deleteBouquetSlice from './naturalFlowers/deleteBouquetSlice';
import getAllBouquetsSlice from './naturalFlowers/getAllBouquetsSlice';
import getBouquetByIdSlice from './naturalFlowers/getBouquetByIdSlice';
import patchBouquetSlice from './naturalFlowers/patchBouquetSlice';
import getAllChocolateSlice from './chocolate/getAllChocolateSlice';
import postChocolateSlice from './chocolate/postChocolateSlice';
import deleteChocolateSlice from './chocolate/deleteChocolateSlice';
import patchChocolateSlice from './chocolate/patchChocolateSlice';
import patchPerfumeSlice from './perfume/patchPerfumeSlice';
import getAllPerfumeSlice from './perfume/getAllPerfumeSlice';
import postPerfumeSlice from './perfume/postPerfumeSlice';
import postNewSizeSlice from './perfume/postNewSizeSlice';
import deleteMessageSlice from './message/deleteMessageSlice';
import getAllMessageSlice from './message/getAllMessageSlice';
import replyMessageSlice from './message/replyMessageSlice';
import getaboutByIdSlice from './about/getaboutByIdSlice';
import getAllaboutSlice from './about/getAllaboutSlice';
import addaboutSlice from './about/addaboutSlice';
import addOfferSlice from './offers/addOfferSlice';
import getAllOffersSlice from './offers/getAllOffersSlice';
import getOffersByIdSlice from './offers/getOffersByIdSlice';
import patchOffersBuIdSlice from './offers/patchOffersBuIdSlice';
import addProductToOfferSlice from './offers/addProductToOfferSlice';
import deleteOfferByIdSlice from './offers/deleteOfferByIdSlice';
import deleteProductfromOfferByIdSlice from './offers/deleteProductfromOfferByIdSlice';
import deleteaboutByIdSlice from './about/deleteaboutByIdSlice';
import deletePerfumeSlice from './perfume/deletePerfumeSlice';
import stateOfferByIdSlice from './offers/stateOfferByIdSlice';
import getAllSettingsSlice from './settings/getAllSettingsSlice';
import updateContactSlice from './settings/updateContactSlice';
import deleteImageFromSliderSlice from './settings/deleteImageFromSliderSlice';
import postImageToSliderSlice from './settings/postImageToSliderSlice';
import patchVariantsSlice from './perfume/patchVariantsSlice';
import addCitiesSlice from './cities/addCitiesSlice';
import getAllCitiesSlice from './cities/getAllCitiesSlice';
import getCityByIdSlice from './cities/getCityByIdSlice';
import deleteCityByIdSlice from './cities/deleteCityByIdSlice';
import updateCityByIdSlice from './cities/updateCityByIdSlice';
import getOrdersSlice from './orders/getOrdersSlice';
import orderProcessingSlice from './orders/orderProcessingSlice';

export const store = configureStore({
    reducer: {
        login: postLoginReducer,
        getMe: getMeSlice,

        getCategories: getCategoriesSlice,
        postNewCategory: postNewCategorySlice,
        getCategoryById: getCategoryByIdSlice,
        patchCategoryById: patchCategoryByIdSlice,
        stateCategoryById: stateCategoryByIdSlice,
        deleteCategoryById: deleteCategoryByIdSlice,

        getArticles: getArticlesSlice,
        postArticle: postArticleSlice,
        deleteArticelById: deleteArticelByIdSlice,
        likeArticle: likeArticleSlice,
        shareArticle: shareArticleSlice,
        patchArticles: patchArticlesSlice,
        getArticleById: getArticleByIdSlice,

        postProduct: postProductSlice,
        deleteProductById: deleteProductByIdSlice,
        getProduct: getProductSlice,
        getProductById: getProductByIdSlice,
        getProductByCategory: getProductByCategorySlice,
        patchProductById: patchProductByIdSlice,

        getAllBouquets: getAllBouquetsSlice,
        getBouquetById: getBouquetByIdSlice,
        postBouquet: postBouquetSlice,
        deleteBouquet: deleteBouquetSlice,
        patchBouquet: patchBouquetSlice,

        postBand: postBandSlice,
        getBand: getBandSlice,
        deleteBand: deleteBandSlice,

        postPaper: postPaperSlice,
        getPaper: getPaperSlice,
        deletePaper: deletePaperSlice,

        getAllChocolate: getAllChocolateSlice,
        postChocolate: postChocolateSlice,
        deleteChocolate: deleteChocolateSlice,
        patchChocolate: patchChocolateSlice,

        getAllPerfume: getAllPerfumeSlice,
        postPerfume: postPerfumeSlice,
        postNewSize: postNewSizeSlice,
        patchPerfume: patchPerfumeSlice,
        deletePerfume: deletePerfumeSlice,
        patchVariants: patchVariantsSlice,

        getAllMessage: getAllMessageSlice,
        replyMessage: replyMessageSlice,
        deleteMessage: deleteMessageSlice,

        getAllabout: getAllaboutSlice,
        getaboutById: getaboutByIdSlice,
        addAbout: addaboutSlice,
        deleteaboutById: deleteaboutByIdSlice,

        getAllOffers: getAllOffersSlice,
        getOffersById: getOffersByIdSlice,
        addOffer: addOfferSlice,
        patchOffersBuId: patchOffersBuIdSlice,
        addProductToOffer: addProductToOfferSlice,
        deleteOfferById: deleteOfferByIdSlice,
        deleteProductfromOfferById: deleteProductfromOfferByIdSlice,
        stateOfferById: stateOfferByIdSlice,

        getAllSettings: getAllSettingsSlice,
        postImageToSlider: postImageToSliderSlice,
        deleteImageFromSlider: deleteImageFromSliderSlice,
        updateContact: updateContactSlice,

        addCities: addCitiesSlice,
        getAllCities: getAllCitiesSlice,
        getCityById: getCityByIdSlice,
        deleteCityById: deleteCityByIdSlice,
        updateCityById: updateCityByIdSlice,

        getOrders: getOrdersSlice,
        orderProcessing: orderProcessingSlice,


    },


})
