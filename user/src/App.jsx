import './App.css';
import ScrollToTop from './ScrollToTop';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from 'react-router';
import Home from './pages/home/Home';
import MyNav from './allExtensions/nav/MyNav';
import Naturalflowers from './pages/naturalflowers/Naturalflowers';
import ProductsByCategory from './pages/productsByCategory/ProductsByCategory';
import Perfumes from './pages/perfumes/Perfumes';
import 'bootstrap/dist/css/bootstrap.min.css';
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
import Register from './pages/register/Register';
import { useEffect, useState } from 'react';
import ProtectedRoutes from './allExtensions/ProtectedRoutes';
import NoMatch from './pages/noMatch/NoMatch';
import Search from './pages/search/Search';
import Cookies from 'universal-cookie';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import AppFooter from './allExtensions/appFooter/AppFooter';
import ArticlesById from './pages/articles/ArticlesById';

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
      <Router
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <MyNav num={num} />
        <ScrollToTop />
        <Routes>
          <Route path='*' element={<StaticFileCheck />} />
          {/* <Route path="/*" element={<NoMatch />} /> */}
          <Route path=''>
            <Route index element={<Home numCounter={numCounter} />} />
            <Route path='*' element={<NoMatch />} />
          </Route>
          <Route path='/' element={<Home numCounter={numCounter} />} />

          {/* <Route path="/">
   <Route index element={<Perfumes numCounter={numCounter} />} />
   <Route path="Perfumes" element={<Perfumes numCounter={numCounter} />} />
  </Route> */}
          <Route
            path='/Perfumes'
            element={<Perfumes numCounter={numCounter} />}
          />
          <Route
            path='/NaturalFlowers'
            element={<Naturalflowers numCounter={numCounter} />}
          />
          <Route
            path='product/:id'
            element={<ProductProfile numCounter={numCounter} />}
          />

          {/* <Route path='category/:id' element={<ProductsByCategory />} /> */}
          <Route path='category'>
            <Route index element={<ProductsByCategory />} />
            <Route path=':id' element={<ProductsByCategory />} />
          </Route>
          <Route path='/Articles' element={<Articles />} />
          {/* <Route path='/Article/:id' element={<ArticlesById />} /> */}
          <Route path='Article'>
            <Route index element={<ArticlesById />} />
            <Route path=':id' element={<ArticlesById />} />
          </Route>
          <Route path='/ContactUs' element={<ContactUs />} />
          <Route path='/AboutTheStore' element={<About />} />

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
        </Routes>
        <AppFooter />
      </Router>
    </div>
  );
}
export default AppUser;

function StaticFileCheck() {
  const location = useLocation();

  // If the requested URL ends with .html, prevent React Router from handling it
  if (location.pathname.endsWith('.html')) {
    window.location.href = location.pathname;
    return null;
  }

  // Otherwise, render the NoMatch page (or any other fallback)
  return <NoMatch />;
}
