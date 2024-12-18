import './App.css';
import ScrollToTop from './ScrollToTop';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import MyCategory from './pages/myCategory/MyCategory';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/login/Login'
import EditeCategory from './pages/editeCategory/EditeCategory';
import MyArticles from './pages/myArticles/MyArticles';
import EditProduct from './pages/editProduct/EditProduct';
import MyNaturalFlower from './pages/myNaturalFlower/MyNaturalFlower';
import EditMyArticles from './pages/editMyArticles/EditMyArticles';
import EditMyNaturalFlower from './pages/editMyNaturalFlower/EditMyNaturalFlower';
import Chocolate from './pages/chocolate/Chocolate';
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



function App() {
  const cookies = new Cookies();
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
    console.log(lng)
  }, [dispatch, lng])
  //////////////////// 


  return (
    <UserContextProvider>
      <div className="App">
        <Router>
          {login &&
            <MyNav sidBarButtom={sidBarButtom} />
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
                  <Route path='/Homee' element={<Home />} />
                  <Route path='/MyCategory' element={<MyCategory />} />
                  <Route path='/EditeCategory/:CategortyId' element={<EditeCategory />} />
                  <Route path='/EditProduct/:productId' element={<EditProduct />} />
                  <Route path='/MyArticles' element={<MyArticles />} />
                  <Route path='/EditMyArticles/:ArticalId' element={<EditMyArticles />} />
                  <Route path='/MyNaturalFlower' element={<MyNaturalFlower />} />
                  <Route path='/EditMyNaturalFlower/:NaturalFlowerId' element={<EditMyNaturalFlower />} />
                  <Route path='/MyPerfume' element={<MyPerfume />} />
                  <Route path='/Chocolate' element={<Chocolate />} />
                  <Route path='/Messages' element={<Messages />} />
                  <Route path='/About' element={<About />} />
                  <Route path='/MyOffers' element={<MyOffers />} />
                  <Route path='/EditeOffer/:MyOffersId' element={<EditeOffer />} />
                  <Route path='/Setting' element={<Settings />} />
                  <Route path='/Orders' element={<Orders />} />
                </Route>
              </Routes>
            </div>
          </div>
        </Router >
      </div>
    </UserContextProvider>

  );
}

export default App;
