import { useState } from 'react';
import { Form } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import { postLogin } from '../../RTK/Auth/loginSlice';
import './loginModel.css';

function RegisterModel(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };
  // <email , password ,confirmPassword, username , phone , image>
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [imageSquer, setImageSquer] = useState([]);
  const [image, setImage] = useState([]);

  const [hiddenB, setHiddenB] = useState(true);
  const [validated, setValidated] = useState(false);
  /////////////////////////
  const handelimag = (event) => {
    setImage(event.target.files[0]);
    setImageSquer(URL.createObjectURL(event.target.files[0]));
  };
  /////////////////////////
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    const form = e.currentTarget;
    e.preventDefault();
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
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
  return (
    <>
      <button
        className='formButton'
        style={{ margin: '0 5%' }}
        onClick={handleShow}
      >
        {' '}
        Go To Register{' '}
      </button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop='static'
        keyboard={false}
        size='md'
      >
        <Modal.Header closeButton>
          <Modal.Title> LOGIN </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <div className='register' > */}

          <Form
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
            className='boxRegister'
          >
            <div className='formBody'>
              {/* ................... */}
              <Form.Group className='mb-3' controlId='form1'>
                <Form.Label>Email</Form.Label>
                <Form.Control required type='file' onChange={handelimag} />
              </Form.Group>
              {/* ................... */}
              <Form.Group className='mb-3' controlId='form2'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='email'
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              {/* ................... */}
              <Form.Group className='mb-3' controlId='form3'>
                <Form.Label>password</Form.Label>
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
                    onClick={() => (setHiddenB(!hiddenB), RestartAnimate())}
                  >
                    <span className={hiddenB ? 'unhdiddenIcon' : 'hdiddenIcon'}>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width={30}
                        height={30}
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
                        width={30}
                        height={30}
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
                  {/* <button type='button' className='hiddenBassWorld'
                                        onClick={() => setHiddenB(!hiddenB)}>
                                        <span className={hiddenB ? 'unhdiddenIcon' : 'hdiddenIcon'} >
                                            <svg stroke="currentColor" fill="#202126" stroke-width="0" viewBox="0 0 576 512" height="25px" width="25px" xmlns="http://www.w3.org/2000/svg"><path d="M288 144a110.94 110.94 0 0 0-31.24 5 55.4 55.4 0 0 1 7.24 27 56 56 0 0 1-56 56 55.4 55.4 0 0 1-27-7.24A111.71 111.71 0 1 0 288 144zm284.52 97.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400c-98.65 0-189.09-55-237.93-144C98.91 167 189.34 112 288 112s189.09 55 237.93 144C477.1 345 386.66 400 288 400z">
                                            </path></svg>
                                        </span>
                                        <span className={hiddenB ? 'hdiddenIcon' : 'unhdiddenIcon'}>

                                            <svg stroke="currentColor" fill="#202126" stroke-width="0" viewBox="0 0 640 512" height="25px" width="25px" xmlns="http://www.w3.org/2000/svg"><path d="M634 471L36 3.51A16 16 0 0 0 13.51 6l-10 12.49A16 16 0 0 0 6 41l598 467.49a16 16 0 0 0 22.49-2.49l10-12.49A16 16 0 0 0 634 471zM296.79 146.47l134.79 105.38C429.36 191.91 380.48 144 320 144a112.26 112.26 0 0 0-23.21 2.47zm46.42 219.07L208.42 260.16C210.65 320.09 259.53 368 320 368a113 113 0 0 0 23.21-2.46zM320 112c98.65 0 189.09 55 237.93 144a285.53 285.53 0 0 1-44 60.2l37.74 29.5a333.7 333.7 0 0 0 52.9-75.11 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64c-36.7 0-71.71 7-104.63 18.81l46.41 36.29c18.94-4.3 38.34-7.1 58.22-7.1zm0 288c-98.65 0-189.08-55-237.93-144a285.47 285.47 0 0 1 44.05-60.19l-37.74-29.5a333.6 333.6 0 0 0-52.89 75.1 32.35 32.35 0 0 0 0 29.19C89.72 376.41 197.08 448 320 448c36.7 0 71.71-7.05 104.63-18.81l-46.41-36.28C359.28 397.2 339.89 400 320 400z">
                                            </path></svg>
                                        </span>
                                    </button> */}
                </div>
                <Form.Control.Feedback type='invalid'>
                  {/* الرجاء إدخال كلمة مرور بطول 8 أحرف على الأقل */}
                </Form.Control.Feedback>
              </Form.Group>
              {/* ................... */}
            </div>

            <Modal.Footer>
              <button
                type='submit'
                className='formButton'
                style={{ margin: '0 5%' }}
              >
                {' '}
                Login{' '}
              </button>
            </Modal.Footer>
          </Form>
          <div className='or'>or</div>

          {/* <button className='formButton' style={{ margin: "0 5%" }} > Go To Register   </button> */}

          {/* </div > */}
        </Modal.Body>
        {/* <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <button className='addToCart' onClick={handleClose}>Save Change</button>
                </Modal.Footer> */}
      </Modal>
    </>
  );
}

export default RegisterModel;

{
  /* <email , password ,confirmPassword, username , phone , image> */
}
