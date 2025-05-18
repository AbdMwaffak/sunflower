import { useState } from 'react';
import { Form } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { useTranslation } from 'react-i18next';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'universal-cookie';
import { back1, postLogin } from '../../RTK/Auth/loginSlice';
import { back2, postRegister } from '../../RTK/Auth/registerSlice';
import { back3 } from '../../RTK/Auth/verifyingSlice';
import OTPVerificationForm from '../otp/OTPVerificationForm';
import './loginModel.css';

function LoginModel(props) {
  //////////////////////////
  const cookies = new Cookies();
  const lng = cookies.get('i18next') || 'en';
  //////////////////////////
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setWindow(0);
  };
  const handleShow = () => setShow(true);
  const [phone, setPhone] = useState('');
  const [username, setUsername] = useState('');
  const [validatedL, setValidatedL] = useState(false);
  const [validatedR, setValidatedR] = useState(false);
  const [window, setWindow] = useState(0);
  /////////////////////////
  const { data1, loading1, error1 } = useSelector((state) => state.postLogin);
  const { data2, loading2, error2 } = useSelector(
    (state) => state.postRegister
  );
  /////////////////////////
  const goToRegister = () => {
    setWindow(1);
    dispatch(back1());
  };
  /////////////////////////
  const goBack = () => {
    setWindow(0);
    dispatch(back1());
    dispatch(back2());
    setPhone('');
    setUsername('');
  };
  /////////////////////////
  const handleGoBack = () => {
    dispatch(back1());
    dispatch(back2());
    dispatch(back3());
    setPhone('');
    setUsername('');
  };
  /////////////////////////
  const dispatch = useDispatch();
  /////////////////////////
  const handleSubmitRegister = (e) => {
    const form = e.currentTarget;
    e.preventDefault();

    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setValidatedR(true);
    } else {
      setValidatedR(true);
      const formData = new FormData();
      formData.append('username', username);
      formData.append('phone', phone);
      dispatch(postRegister(formData));
    }
  };
  /////////////////////////
  const handleSubmitLogin = (e) => {
    const form = e.currentTarget;
    e.preventDefault();
    e.stopPropagation();
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setValidatedL(true);
    } else {
      setValidatedL(false);
      const value = {
        phone: phone,
      };
      dispatch(postLogin(value));
    }
  };
  /////////////////////////
  var animation11 = document.getElementById('cn1');
  var animation12 = document.getElementById('cn2');
  var animation13 = document.getElementById('cn3');
  var animation14 = document.getElementById('cn4');
  var animation21 = document.getElementById('dn1');
  var animation22 = document.getElementById('dn2');
  function RestartAnimate() {
    animation11?.beginElement();
    animation12?.beginElement();
    animation13?.beginElement();
    animation14?.beginElement();
    animation21?.beginElement();
    animation22?.beginElement();
  }
  ////////////////////////
  const { t } = useTranslation();
  return (
    <>
      <div className='loginBT' onClick={handleShow}>
        {t('public.login')}
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop='static'
        keyboard={false}
        size='md'
        ref={props?.menuRef}
      >
        <Modal.Header closeButton>
          <Modal.Title> LOGIN </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error1 && (
            <p className='err' style={{ color: 'red' }}>
              {error1.message}
            </p>
          )}
          {error2 && (
            <p className='err' style={{ color: 'red' }}>
              {error2.message}
            </p>
          )}
          <div
            style={{
              display:
                window != 1 ||
                data1 == 'Verifying...' ||
                data2 == 'Verifying...'
                  ? 'none'
                  : 'flex',
            }}
            className='boxLogin'
          >
            <Form
              noValidate
              validated={validatedR}
              onSubmit={handleSubmitRegister}
            >
              <div className='formBody'>
                <Form.Group className='mb-3' controlId='form2'>
                  <Form.Label>{t('public.name')}</Form.Label>
                  <Form.Control
                    type='string'
                    placeholder={t('public.write')}
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className='mb-3' controlId='form3'>
                  <Form.Label>{t('public.phone')}</Form.Label>
                  <div className='qq'>
                    <PhoneInput
                      country={'sa'}
                      required
                      // onChange={phone => setPhone({ phone })}
                      onChange={(value, country, event, formattedValue) => {
                        setPhone(formattedValue);
                      }}
                      inputStyle={{
                        width: '100%',
                        direction: 'ltr',
                      }}
                    />
                  </div>
                </Form.Group>
              </div>
              <Modal.Footer>
                <button
                  type='submit'
                  className=' loginBT'
                  style={{ margin: '0 5%' }}
                >
                  {loading2 ? (
                    <div className='loading'>
                      Please wait{' '}
                      <svg width={24} height={24} viewBox='0 0 24 24'>
                        <circle cx={4} cy={12} r={3} fill='#1d1d31'>
                          <animate
                            id='svgSpinners3DotsBounce0'
                            attributeName='cy'
                            begin='0;svgSpinners3DotsBounce1.end+0.25s'
                            calcMode='spline'
                            dur='0.6s'
                            keySplines='.33,.66,.66,1;.33,0,.66,.33'
                            values='12;6;12'
                          ></animate>
                        </circle>
                        <circle cx={12} cy={12} r={3} fill='#1d1d31'>
                          <animate
                            attributeName='cy'
                            begin='svgSpinners3DotsBounce0.begin+0.1s'
                            calcMode='spline'
                            dur='0.6s'
                            keySplines='.33,.66,.66,1;.33,0,.66,.33'
                            values='12;6;12'
                          ></animate>
                        </circle>
                        <circle cx={20} cy={12} r={3} fill='#1d1d31'>
                          <animate
                            id='svgSpinners3DotsBounce1'
                            attributeName='cy'
                            begin='svgSpinners3DotsBounce0.begin+0.2s'
                            calcMode='spline'
                            dur='0.6s'
                            keySplines='.33,.66,.66,1;.33,0,.66,.33'
                            values='12;6;12'
                          ></animate>
                        </circle>
                      </svg>
                    </div>
                  ) : (
                    t('public.register')
                  )}
                </button>
              </Modal.Footer>
            </Form>
            <div className='or'>or</div>
            <button
              className='registerBt'
              style={{ margin: '0 7%' }}
              onClick={goBack}
            >
              {' '}
              {t('public.back')}{' '}
            </button>
          </div>

          <div
            style={{
              display:
                window != 0 ||
                data1 == 'Verifying...' ||
                data2 == 'Verifying...'
                  ? 'none'
                  : 'flex',
            }}
            className='boxLogin'
          >
            {error2 && (
              <p className='err' style={{ color: 'red' }}>
                {error2.message}
              </p>
            )}
            <Form
              noValidate
              validated={validatedL}
              onSubmit={handleSubmitLogin}
            >
              <div className='formBody'>
                <Form.Group className='mb-3' controlId='form3'>
                  <Form.Label>{t('public.phone')}</Form.Label>
                  <div className='qq'>
                    <PhoneInput
                      country={'sa'}
                      required
                      onChange={(value, country, event, formattedValue) => {
                        setPhone(formattedValue);
                      }}
                      inputStyle={{
                        width: '100%',
                        direction: 'ltr',
                      }}
                    />
                  </div>
                </Form.Group>
              </div>
              <Modal.Footer>
                <button
                  type='submit'
                  className='loginBT'
                  style={{ margin: '0 5%' }}
                >
                  {loading1 ? (
                    <div style={{ display: 'flex', gap: '10px' }}>
                      Please wait{' '}
                      <svg width={24} height={24} viewBox='0 0 24 24'>
                        <circle cx={4} cy={12} r={3} fill='#1d1d31'>
                          <animate
                            id='svgSpinners3DotsBounce0'
                            attributeName='cy'
                            begin='0;svgSpinners3DotsBounce1.end+0.25s'
                            calcMode='spline'
                            dur='0.6s'
                            keySplines='.33,.66,.66,1;.33,0,.66,.33'
                            values='12;6;12'
                          ></animate>
                        </circle>
                        <circle cx={12} cy={12} r={3} fill='#1d1d31'>
                          <animate
                            attributeName='cy'
                            begin='svgSpinners3DotsBounce0.begin+0.1s'
                            calcMode='spline'
                            dur='0.6s'
                            keySplines='.33,.66,.66,1;.33,0,.66,.33'
                            values='12;6;12'
                          ></animate>
                        </circle>
                        <circle cx={20} cy={12} r={3} fill='#1d1d31'>
                          <animate
                            id='svgSpinners3DotsBounce1'
                            attributeName='cy'
                            begin='svgSpinners3DotsBounce0.begin+0.2s'
                            calcMode='spline'
                            dur='0.6s'
                            keySplines='.33,.66,.66,1;.33,0,.66,.33'
                            values='12;6;12'
                          ></animate>
                        </circle>
                      </svg>
                    </div>
                  ) : (
                    t('public.login')
                  )}
                </button>
              </Modal.Footer>
            </Form>
            <div className='or'>or</div>
            <button
              className='registerBt'
              style={{ margin: '0 7%' }}
              onClick={goToRegister}
            >
              {' '}
              {t('public.register')}{' '}
            </button>
          </div>

          <div
            style={{
              display:
                data1 != 'Verifying...' && data2 != 'Verifying...'
                  ? 'none'
                  : 'flex',
            }}
            className='boxLogin'
          >
            <OTPVerificationForm phone={phone} />
            <button
              className='registerBt'
              style={{ margin: '0 7%' }}
              onClick={handleGoBack}
            >
              {' '}
              {t('public.back')}{' '}
            </button>
          </div>

          {/* <PhoneVerification /> */}
        </Modal.Body>
      </Modal>
    </>
  );
}
export default LoginModel;
