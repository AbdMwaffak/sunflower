import { useState } from 'react';
import { Form } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import Cookies from 'universal-cookie';
import { postLogin } from '../../RTK/Auth/loginSlice';
import './loginModel.css';

function LoginModel(props) {
  //////////////////////////
  const cookies = new Cookies();
  const lng = cookies.get('i18next') || 'en';
  //////////////////////////
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [valid, setValid] = useState(false);
  const [hiddenB, setHiddenB] = useState(true);
  const [validated, setValidated] = useState(false);
  /////////////////////////
  const navigate = useNavigate();
  const goToRegister = () => {
    handleClose();
    navigate(`/Register`);
  };
  /////////////////////////
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    const form = e.currentTarget;
    e.preventDefault();
    e.stopPropagation();
    if (form.checkValidity() === false || password.length < 8) {
      e.preventDefault();
      e.stopPropagation();
      setValid(true);
    } else {
      setValid(false);
      setValidated(true);
      const value = {
        email,
        password,
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
          <Form
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
            className='boxLogin'
          >
            <div className='formBody'>
              <Form.Group className='mb-3' controlId='form1'>
                <Form.Label> {t('public.email')} </Form.Label>
                <Form.Control
                  type='email'
                  placeholder={t('public.email')}
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {!email.includes('@') && valid && (
                  <div className='error'>{t('public.invalidEmail')}</div>
                )}
              </Form.Group>
              <Form.Group className='mb-3' controlId='form2'>
                <Form.Label> {t('public.password')} </Form.Label>
                <div className='passsWorlContent '>
                  <Form.Control
                    type={hiddenB ? 'password' : 'text'}
                    placeholder='password'
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type='button'
                    className='hiddenBassWorld'
                    style={{
                      right: lng == 'ar' ? 'calc(100% - 50px)' : '20px',
                    }}
                    onClick={() => (setHiddenB(!hiddenB), RestartAnimate())}
                  >
                    <span className={hiddenB ? 'unhdiddenIcon' : 'hdiddenIcon'}>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width={25}
                        height={25}
                        viewBox='0 0 24 24'
                      >
                        <defs>
                          <clipPath id='lineMdWatchOffLoop0'>
                            <rect width={24} height={12}></rect>
                          </clipPath>
                          <symbol id='lineMdWatchOffLoop1'>
                            <path
                              fill='none'
                              stroke='#fff'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M23 16.5C23 10.4249 18.0751 5.5 12 5.5C5.92487 5.5 1 10.4249 1 16.5z'
                              clipPath='url(#lineMdWatchOffLoop0)'
                            >
                              <animate
                                id='cn1'
                                attributeName='d'
                                dur='6s'
                                keyTimes='0;0.07;0.93;1'
                                repeatCount='indefinite'
                                values='M23 16.5C23 11.5 18.0751 12 12 12C5.92487 12 1 11.5 1 16.5z;M23 16.5C23 10.4249 18.0751 5.5 12 5.5C5.92487 5.5 1 10.4249 1 16.5z;M23 16.5C23 10.4249 18.0751 5.5 12 5.5C5.92487 5.5 1 10.4249 1 16.5z;M23 16.5C23 11.5 18.0751 12 12 12C5.92487 12 1 11.5 1 16.5z'
                              ></animate>
                            </path>
                          </symbol>
                          <mask id='lineMdWatchOffLoop2'>
                            <use href='#lineMdWatchOffLoop1'></use>
                            <use
                              href='#lineMdWatchOffLoop1'
                              transform='rotate(180 12 12)'
                            ></use>
                            <circle cx={12} cy={12} r={0} fill='#fff'>
                              <animate
                                id='cn2'
                                attributeName='r'
                                dur='6s'
                                keyTimes='0;0.03;0.97;1'
                                repeatCount='indefinite'
                                values='0;3;3;0'
                              ></animate>
                            </circle>
                            <g
                              fill='none'
                              strokeDasharray={26}
                              strokeDashoffset={26}
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              transform='rotate(45 13 12)'
                            >
                              <path stroke='#000' d='M0 11h24'></path>
                              <path stroke='#fff' d='M0 13h22'>
                                <animate
                                  id='cn3'
                                  attributeName='d'
                                  dur='6s'
                                  repeatCount='indefinite'
                                  values='M0 13h22;M2 13h22;M0 13h22'
                                ></animate>
                              </path>
                              <animate
                                id='cn4'
                                fill='freeze'
                                attributeName='stroke-dashoffset'
                                begin='0.6s'
                                dur='0.2s'
                                values='26;0'
                              ></animate>
                            </g>
                          </mask>
                        </defs>
                        <rect
                          width={24}
                          height={24}
                          fill='currentColor'
                          mask='url(#lineMdWatchOffLoop2)'
                        ></rect>
                      </svg>
                    </span>
                    <span className={hiddenB ? 'hdiddenIcon' : 'unhdiddenIcon'}>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width={25}
                        height={25}
                        viewBox='0 0 24 24'
                      >
                        <defs>
                          <clipPath id='lineMdWatchLoop0'>
                            <rect width={24} height={12}></rect>
                          </clipPath>
                          <symbol id='lineMdWatchLoop1'>
                            <path
                              fill='none'
                              stroke='#fff'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M23 16.5C23 10.4249 18.0751 5.5 12 5.5C5.92487 5.5 1 10.4249 1 16.5z'
                              clipPath='url(#lineMdWatchLoop0)'
                            >
                              <animate
                                id='dn1'
                                attributeName='d'
                                dur='6s'
                                keyTimes='0;0.07;0.93;1'
                                repeatCount='indefinite'
                                values='M23 16.5C23 11.5 18.0751 12 12 12C5.92487 12 1 11.5 1 16.5z;M23 16.5C23 10.4249 18.0751 5.5 12 5.5C5.92487 5.5 1 10.4249 1 16.5z;M23 16.5C23 10.4249 18.0751 5.5 12 5.5C5.92487 5.5 1 10.4249 1 16.5z;M23 16.5C23 11.5 18.0751 12 12 12C5.92487 12 1 11.5 1 16.5z'
                              ></animate>
                            </path>
                          </symbol>
                          <mask id='lineMdWatchLoop2'>
                            <use href='#lineMdWatchLoop1'></use>
                            <use
                              href='#lineMdWatchLoop1'
                              transform='rotate(180 12 12)'
                            ></use>
                            <circle cx={12} cy={12} r={0} fill='#fff'>
                              <animate
                                id='dn2'
                                attributeName='r'
                                dur='6s'
                                keyTimes='0;0.03;0.97;1'
                                repeatCount='indefinite'
                                values='0;3;3;0'
                              ></animate>
                            </circle>
                          </mask>
                        </defs>
                        <rect
                          width={24}
                          height={24}
                          fill='currentColor'
                          mask='url(#lineMdWatchLoop2)'
                        ></rect>
                      </svg>
                    </span>
                  </button>
                </div>
                {password.length < 8 && valid && (
                  <div className='error'> {t('public.passwordShort')}</div>
                )}
              </Form.Group>
            </div>
            <Modal.Footer>
              <button
                type='submit'
                className='loginBT'
                style={{ margin: '0 5%' }}
              >
                {' '}
                {t('public.login')}{' '}
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
        </Modal.Body>
      </Modal>
    </>
  );
}
export default LoginModel;
