
import ScrollToTop from './ScrollToTop';
import { BrowserRouter as Router, Route, Routes } from 'react-router'
import { lazy, Suspense, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'universal-cookie';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import ProtectedRoutes from './allExtensions/ProtectedRoutes';

import MyNav from './allExtensions/nav/MyNav';
import AppFooter from './allExtensions/appFooter/AppFooter';

import Home from './pages/home/Home'
import Naturalflowers from './pages/naturalflowers/Naturalflowers';
import ProductsByCategory from './pages/productsByCategory/ProductsByCategory';
import Perfumes from './pages/perfumes/Perfumes';
import ProductProfile from './pages/productProfile/ProductProfile';
import Articles from './pages/articles/Articles';
import About from './pages/about/About';
import ContactUs from './pages/contactUs/ContactUs';
import Messages from './pages/messages/Messages';
import MyAccount from './pages/myAccount/MyAccount';
import MyOrder from './pages/myOrder/MyOrder';
import MyCoupons from './pages/myCoupons/MyCoupons';
import MyReturnOrder from './pages/myReturnOrder/MyReturnOrder';
import MyFavorites from './pages/myFavorites/MyFavorites';
import MyCart from './pages/myCart/MyCart';
import NoMatch from './pages/noMatch/NoMatch';
import Search from './pages/search/Search';
import ArticlesById from './pages/articles/ArticlesById';

import './App.css';


// const Home = lazy(() => import('./pages/home/Home'));
// const Naturalflowers = lazy(() => import('./pages/naturalflowers/Naturalflowers'));
// const ProductsByCategory = lazy(() => import('./pages/productsByCategory/ProductsByCategory'));
// const Perfumes = lazy(() => import('./pages/perfumes/Perfumes'));
// const ProductProfile = lazy(() => import('./pages/productProfile/ProductProfile'));
// const Articles = lazy(() => import('./pages/articles/Articles'));
// const About = lazy(() => import('./pages/about/About'));
// const ContactUs = lazy(() => import('./pages/contactUs/ContactUs'));
// const Messages = lazy(() => import('./pages/messages/Messages'));
// const MyOrder = lazy(() => import('./pages/myOrder/MyOrder'));
// const MyCoupons = lazy(() => import('./pages/myCoupons/MyCoupons'));
// const MyReturnOrder = lazy(() => import('./pages/myReturnOrder/MyReturnOrder'));
// const MyFavorites = lazy(() => import('./pages/myFavorites/MyFavorites'));
// const MyCart = lazy(() => import('./pages/myCart/MyCart'));
// const NoMatch = lazy(() => import('./pages/myCart/MyCart'));
// const Search = lazy(() => import('./pages/search/Search'));
// const ArticlesById = lazy(() => import('./pages/articles/ArticlesById'));
// const MyAccount = lazy(() => import('./pages/myAccount/MyAccount'));


function AppUser() {
  const cookies = new Cookies();
  const [num, setNum] = useState(true);
  const numCounter = () => {
    setNum(!num)
  }
  ////////////////////////////////////
  const { t, i18n } = useTranslation();
  const lng = cookies.get("i18next") || "en";
  ///////////////////////
  const dispatch = useDispatch()
  ///////////////////////
  useEffect(() => {
    window.document.dir = i18n.dir();
  }, [dispatch, lng])
  //////////////////// 

  return (
    <div className="App">
       
      <Router
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >

        <MyNav num={num} />
        <ScrollToTop /> 
        <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="">
            <Route index element={<Home numCounter={numCounter} />} />
            <Route path="*" element={<NoMatch />} />
          </Route>
          <Route path='/' element={<Home numCounter={numCounter} />} />
          <Route path='/Perfumes' element={<Perfumes numCounter={numCounter} />} />
          <Route path='/NaturalFlowers' element={<Naturalflowers numCounter={numCounter} />} />
          <Route path='product/:id' element={<ProductProfile numCounter={numCounter} />} />
          <Route path='Search/:searchKey' element={<Search />} />

          <Route path="category">
            <Route index element={<ProductsByCategory numCounter={numCounter} />} />
            <Route path=":id" element={<ProductsByCategory />} />
          </Route>
          <Route path='/Articles' element={<Articles />} />
          <Route path="Article">
            <Route index element={<ArticlesById />} />
            <Route path=":id" element={<ArticlesById />} />
          </Route>
          <Route path='/ContactUs' element={<ContactUs />} />
          <Route path='/AboutTheStore' element={<About />} />

          <Route path='/MyAccount/:userName' element={<MyAccount />} />
          <Route path='/StoreMessages' element={<Messages />} />
          <Route element={<ProtectedRoutes />}>
            <Route path='/MyReturnOrder' element={<MyReturnOrder />} />
            <Route path='/MyOrder' element={<MyOrder />} />
            <Route path='/MyCoupons' element={<MyCoupons />} />
            <Route path='/MyFavorites' element={<MyFavorites />} />
            <Route path='/MyCart' element={<MyCart />} />
          </Route>
          </Routes>
         </Suspense>
        <AppFooter />
      </Router >
   
    </div >
  );
}
export default AppUser;
