import 'bootstrap/dist/css/bootstrap.min.css';
import { lazy, Suspense, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Route, BrowserRouter as Router, Routes } from 'react-router';
import Cookies from 'universal-cookie';
import ProtectedRoutes from './allExtensions/ProtectedRoutes';
import ScrollToTop from './ScrollToTop';

import AppFooter from './allExtensions/appFooter/AppFooter';
import MyNav from './allExtensions/nav/MyNav';
import './App.css';
import Home from './pages/home/Home';
// import Naturalflowers from './pages/naturalflowers/Naturalflowers';
// import ProductsByCategory from './pages/productsByCategory/ProductsByCategory';
// import Perfumes from './pages/perfumes/Perfumes';
// import ProductProfile from './pages/productProfile/ProductProfile';
// import Articles from './pages/articles/Articles';
// import About from './pages/about/About';
// import ContactUs from './pages/contactUs/ContactUs';
// import Messages from './pages/messages/Messages';
// import MyAccount from './pages/myAccount/MyAccount';
// import MyOrder from './pages/myOrder/MyOrder';
// import MyCoupons from './pages/myCoupons/MyCoupons';
// import MyReturnOrder from './pages/myReturnOrder/MyReturnOrder';
// import MyFavorites from './pages/myFavorites/MyFavorites';
// import MyCart from './pages/myCart/MyCart';
// import NoMatch from './pages/noMatch/NoMatch';
// import Search from './pages/search/Search';
// import ArticlesById from './pages/articles/ArticlesById';
const Naturalflowers = lazy(() =>
  import('./pages/naturalflowers/Naturalflowers')
);
const ProductsByCategory = lazy(() =>
  import('./pages/productsByCategory/ProductsByCategory')
);
const Perfumes = lazy(() => import('./pages/perfumes/Perfumes'));
const ProductProfile = lazy(() =>
  import('./pages/productProfile/ProductProfile')
);
const Articles = lazy(() => import('./pages/articles/Articles'));
const About = lazy(() => import('./pages/about/About'));
const ContactUs = lazy(() => import('./pages/contactUs/ContactUs'));
const Messages = lazy(() => import('./pages/messages/Messages'));
const MyOrder = lazy(() => import('./pages/myOrder/MyOrder'));
const MyFavorites = lazy(() => import('./pages/myFavorites/MyFavorites'));
const MyCart = lazy(() => import('./pages/myCart/MyCart'));
const NoMatch = lazy(() => import('./pages/noMatch/NoMatch'));
const Search = lazy(() => import('./pages/search/Search'));
const ArticlesById = lazy(() => import('./pages/articles/ArticlesById'));
const MyAccount = lazy(() => import('./pages/myAccount/MyAccount'));

import { Component } from 'react';

class ErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Component Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div
            className='noProducts'
            style={{ maxWidth: '1480px', padding: '10px' }}
          >
            <h3>Something went wrong</h3>
            <p>{this.state.error.message}</p>
            <p>UI problem </p>
            <div style={{ width: '50%' }}>
              <button
                className='formButton5'
                onClick={() => this.setState({ hasError: false })}
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

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
          <Route path='/' element={<Home numCounter={numCounter} />} />
          <Route path='*' element={<NoMatch />} />

          {/* //////////// */}
          <Route
            path='/perfumes'
            element={
              <ErrorBoundary>
                <Suspense fallback={<div>Loading...</div>}>
                  <Perfumes />
                </Suspense>
              </ErrorBoundary>
            }
          />
          {/* //////////// */}
          <Route
            path='/NaturalFlowers'
            element={
              <ErrorBoundary>
                <Suspense fallback={<div>Loading...</div>}>
                  <Naturalflowers numCounter={numCounter} />
                </Suspense>
              </ErrorBoundary>
            }
          />
          {/* //////////// */}
          <Route
            path='product/:id'
            element={
              <ErrorBoundary>
                <Suspense fallback={<div>Loading...</div>}>
                  <ProductProfile numCounter={numCounter} />
                </Suspense>
              </ErrorBoundary>
            }
          />
          {/* //////////// */}
          <Route
            path='Search/:searchKey'
            element={
              <ErrorBoundary>
                <Suspense fallback={<div>Loading...</div>}>
                  <Search />
                </Suspense>
              </ErrorBoundary>
            }
          />
          {/* //////////// */}
          <Route
            path='category/:id'
            element={
              <ErrorBoundary>
                <Suspense fallback={<div>Loading...</div>}>
                  <ProductsByCategory numCounter={numCounter} />
                </Suspense>
              </ErrorBoundary>
            }
          />
          {/* //////////// */}
          <Route
            path='/articles'
            element={
              <ErrorBoundary>
                <Suspense fallback={<div>Loading...</div>}>
                  <Articles />
                </Suspense>
              </ErrorBoundary>
            }
          />
          {/* //////////// */}
          <Route
            path='Article/:id'
            element={
              <ErrorBoundary>
                <Suspense fallback={<div>Loading...</div>}>
                  <ArticlesById />
                </Suspense>
              </ErrorBoundary>
            }
          />
          {/* //////////// */}
          <Route
            path='/ContactUs'
            element={
              <ErrorBoundary>
                <Suspense fallback={<div>Loading...</div>}>
                  <ContactUs />
                </Suspense>
              </ErrorBoundary>
            }
          />
          {/* //////////// */}
          <Route
            path='/AboutTheStore'
            element={
              <ErrorBoundary>
                <Suspense fallback={<div>Loading...</div>}>
                  <About />
                </Suspense>
              </ErrorBoundary>
            }
          />
          {/* //////////// */}
          <Route
            path='/StoreMessages'
            element={
              <ErrorBoundary>
                <Suspense fallback={<div>Loading...</div>}>
                  <Messages />
                </Suspense>
              </ErrorBoundary>
            }
          />
          {/* //////////// */}
          <Route element={<ProtectedRoutes />}>
            <Route
              path='/MyAccount/:userName'
              element={
                <ErrorBoundary>
                  <Suspense fallback={<div>Loading...</div>}>
                    <MyAccount />
                  </Suspense>
                </ErrorBoundary>
              }
            />
            {/* //////////// */}
            <Route
              path='/MyFavorites'
              element={
                <ErrorBoundary>
                  <Suspense fallback={<div>Loading...</div>}>
                    <MyFavorites />
                  </Suspense>
                </ErrorBoundary>
              }
            />
            {/* //////////// */}
            <Route
              path='/MyCart'
              element={
                <ErrorBoundary>
                  <Suspense fallback={<div>Loading...</div>}>
                    <MyCart />
                  </Suspense>
                </ErrorBoundary>
              }
            />
            {/* //////////// */}
            <Route
              path='/MyOrder '
              element={
                <ErrorBoundary>
                  <Suspense fallback={<div>Loading...</div>}>
                    <MyOrder />
                  </Suspense>
                </ErrorBoundary>
              }
            />
            {/* //////////// */}
          </Route>
        </Routes>

        <AppFooter />
      </Router>
    </div>
  );
}
export default AppUser;
