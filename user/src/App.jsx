import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Cookies from 'universal-cookie';
import AppFooter from './allExtensions/appFooter/AppFooter';
import MyNav from './allExtensions/nav/MyNav';
import ProtectedRoutes from './allExtensions/ProtectedRoutes';
import './App.css';
import About from './pages/about/About';
import Articles from './pages/articles/Articles';
import ArticlesById from './pages/articles/ArticlesById';
import ContactUs from './pages/contactUs/ContactUs';
import Home from './pages/home/Home';
import Messages from './pages/messages/Messages';
import MyAccount from './pages/myAccount/MyAccount';
import MyCart from './pages/myCart/MyCart';
import MyCoupons from './pages/myCoupons/MyCoupons';
import MyFavorites from './pages/myFavorites/MyFavorites';
import MyOrder from './pages/myOrder/MyOrder';
import MyReturnOrder from './pages/myReturnOrder/MyReturnOrder';
import Naturalflowers from './pages/naturalflowers/Naturalflowers';
import NoMatch from './pages/noMatch/NoMatch';
import Perfumes from './pages/perfumes/Perfumes';
import ProductProfile from './pages/productProfile/ProductProfile';
import ProductsByCategory from './pages/productsByCategory/ProductsByCategory';
import Register from './pages/register/Register';
import Search from './pages/search/Search';
import ScrollToTop from './ScrollToTop';

function AppUser() {
  const cookies = new Cookies();
  const [num, setNum] = useState(true);
  const numCounter = () => {
    setNum(!num);
  };
  ////////////////////////////////////
  const { t, i18n } = useTranslation();
  const lng = cookies.get('i18next') || 'en';
  ///////////////////////
  const dispatch = useDispatch();
  ///////////////////////
  useEffect(() => {
    window.document.dir = i18n.dir();
  }, [dispatch, lng]);
  ////////////////////

  return (
    <div className='App'>
      <Router>
        <MyNav num={num} />
        <ScrollToTop />
        <Routes>
          <Route path='/' element={<Home numCounter={numCounter} />} />
          <Route
            path='/NaturalFlowers'
            element={<Naturalflowers numCounter={numCounter} />}
          />
          <Route
            path='/Perfumes'
            element={<Perfumes numCounter={numCounter} />}
          />
          <Route
            path='product/:id'
            element={<ProductProfile numCounter={numCounter} />}
          />
          {/* ///////////// */}
          <Route path='category/:id' element={<ProductsByCategory />} />
          <Route path='/Articles' element={<Articles />} />
          <Route path='/Articles/:id' element={<ArticlesById />} />
          <Route path='/ContactUs' element={<ContactUs />} />
          <Route path='/AboutTheStore' element={<About />} />
          <Route path='/Search/:searchKey' element={<Search />} />
          {/* ///////////// */}
          <Route element={<ProtectedRoutes />}>
            <Route path='/StoreMessages' element={<Messages />} />
            <Route path='/MyAccount/:userName' element={<MyAccount />} />
            <Route path='/MyReturnOrder' element={<MyReturnOrder />} />
            <Route path='/MyOrder' element={<MyOrder />} />
            <Route path='/MyCoupons' element={<MyCoupons />} />
            <Route path='/MyFavorites' element={<MyFavorites />} />
            <Route path='/MyCart' element={<MyCart />} />
          </Route>
          <Route path='/Register' element={<Register />} />
          <Route path='/*' element={<NoMatch />} />
        </Routes>
        <AppFooter />
      </Router>
    </div>
  );
}
export default AppUser;
