import './App.css';
import ScrollToTop from './ScrollToTop';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
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
import { useState } from 'react';
import ProtectedRoutes from './allExtensions/ProtectedRoutes';
import NoMatch from './pages/noMatch/NoMatch';
import Search from './pages/search/Search';


function AppUser() {
  const [num, setNum] = useState(true);
  const numCounter = () => {
    setNum(!num)
  }
  return (
    <div className="App">
      <Router>
        <MyNav num={num} />
        <ScrollToTop />
        <Routes>
          <Route path="/*" element={<NoMatch />} />
          <Route path='/' element={<Home numCounter={numCounter} />} />
          <Route path='/NaturalFlowers' element={<Naturalflowers numCounter={numCounter} />} />
          <Route path='/Perfumes' element={<Perfumes numCounter={numCounter} />} />
          <Route path='product/:id' element={<ProductProfile numCounter={numCounter} />} />
          {/* ///////////// */}
          <Route path='category/:id' element={<ProductsByCategory />} />
          <Route path='/Articles' element={<Articles />} />
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
        </Routes>
      </Router >
    </div >
  );
}
export default AppUser;
