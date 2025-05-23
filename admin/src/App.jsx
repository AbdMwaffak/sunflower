import './App.css';
import ScrollToTop from './ScrollToTop';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import MyCategory from './pages/myCategory/MyCategory';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/login/Login'
import EditeCategory from './pages/editeCategory/EditeCategory';
import MyArticles from './pages/myArticles/MyArticles';
import EditProduct from './pages/editProduct/EditProduct';
import EditMyArticles from './pages/editMyArticles/EditMyArticles';
import MyPerfume from './pages/myPerfume/MyPerfume';
import MyNav from './allExtensions/nav/MyNav';
import { useEffect, useState } from 'react';
import SidBar from './allExtensions/sidBar/SidBar';
import Messages from './pages/messages/Messages';
import About from './pages/about/About';
import MyOffers from './pages/myOffers/MyOffers';
import EditeOffer from './pages/editeOffer/EditeOffer';
import NoMatch from './pages/noMatch/NoMatch';
import ProtectedRoutes from './allExtensions/ProtectedRoutes';
import Cookies from 'universal-cookie';
import { useDispatch } from 'react-redux';
import Settings from './pages/settings/Settings';
import { UserContextProvider } from './allExtensions/UserContext';
import Orders from './pages/orders/Orders';
import { useTranslation } from 'react-i18next';
import MyAccount from './pages/myAccount/MyAccount';
import AppFooter from './allExtensions/appFooter/AppFooter';
// import InvoicePage from './pages/invoicePage/InvoicePage';



function App() {
  const cookies = new Cookies();
  const [num, setNum] = useState(true);
  const numCounter = (e) => {
    setNum(e)
  }
  //////////////////////////
  const [login, setLogin] = useState(false)
  const [sid, setSid] = useState(false)
  const sidBarButtom = () => {
    setSid(!sid)
  }

  ////////////////////////////////////
  const { t, i18n } = useTranslation();
  const lng = cookies.get("i18next") || "en";
  ///////////////////////
  const dispatch = useDispatch()
  ///////////////////////
  useEffect(() => {
    if (cookies.get('adminToken') !== undefined || null) {
      setLogin(true)
    }
    else { setLogin(false) }
    window.document.dir = i18n.dir();
  }, [dispatch, lng])
  ////////////////////////
  return (
    <UserContextProvider>
      <div className="App">
        <Router>
          {login &&
            <MyNav
              sidBarButtom={sidBarButtom}
              numCounter={numCounter}
            />
          }
          <div className='appContainer'>
            {login &&
              <SidBar sid={sid} />
            }
            <ScrollToTop />
            <div className={sid ? 'pageContainer2' : 'pageContainer1'}>
              <Routes>
                <Route path="/*" element={<NoMatch />} />
                <Route path='/' element={<Login />} />
                <Route element={<ProtectedRoutes />}>
                  <Route path='/MyCategory' element={<MyCategory />} />
                  <Route path='/EditeCategory/:CategortyId' element={<EditeCategory />} />
                  <Route path='/EditProduct/:productId' element={<EditProduct />} />
                  <Route path='/MyArticles' element={<MyArticles />} />
                  <Route path='/EditMyArticles/:ArticalId' element={<EditMyArticles />} />
                  <Route path='/MyPerfume/:MyPerfumeId' element={<MyPerfume />} />
                  <Route path='/Messages' element={<Messages />} />
                  <Route path='/About' element={<About />} />
                  <Route path='/MyOffers' element={<MyOffers />} />
                  <Route path='/EditeOffer/:MyOffersId' element={<EditeOffer />} />
                  <Route path='/Setting' element={<Settings />} />
                  <Route path='/Orders' element={<Orders num={num} />} />
                  <Route path='/MyAccount' element={<MyAccount />} />
                  {/* <Route path='/InvoicePage' element={<InvoicePage />} /> */}
                </Route>
              </Routes>
              {login && <AppFooter />}
            </div>
          </div>
        </Router >
      </div>
    </UserContextProvider>

  );
}

export default App;
