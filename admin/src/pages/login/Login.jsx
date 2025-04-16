import React, { useEffect, useState } from 'react';
import './login.css';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { back1, postLogin } from '../../RTK/Auth/loginSlice';
import { Navigate, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { useTranslation } from 'react-i18next';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import OTPVerificationForm from '../../allExtensions/otp/OTPVerificationForm';

const Login = () => {
    //////////////////////////
    const cookies = new Cookies();
    let lng = ''
    let token = ''
    if (cookies.get('token') !== undefined || null) {
        token = true
    } else token = false
    if (cookies.get('i18next') === "ar") {
        lng = "ar"
    } else lng = "en"
    //////////////////////////
    // const loginError = useSelector(state => state.postLogin)
    //////////////////////////
    const [phone, setPhone] = useState('')
    const [valid, setValid] = useState(false)
    const [validated, setValidated] = useState(false);
    const [window, setWindow] = useState(0);
    ////////////////////////
    const { data, loading, error } = useSelector((state) => state.login);
    // const { data, loading2, error2 } = useSelector((state) => state.postRegister);

    ////////////////////////
    const dispatch = useDispatch()
    const navigate = useNavigate();
    ////////////////////////
    const handleGoBack = () => {
        dispatch(back1())
        setPhone("")
    };
    /////////////////////////
    const handleSubmit = (e) => {
        const form = e.currentTarget;
        e.preventDefault();
        // if (form.checkValidity() === false || password.length < 8) {
        if (form.checkValidity() === false || phone.length < 12) {
            e.preventDefault();
            e.stopPropagation();
            setValid(true)
        }
        else {
            setValid(false)
            setValidated(true);
            const value = {
                phone: phone
            }
            dispatch(postLogin(value))
        }
    };
    ////////////////////////
    useEffect(() => {
        if (cookies.get('adminToken') !== undefined || null) {
            navigate('/MyCategory');
        }

    }, [dispatch])
    //////////////////////// 
    useEffect(
        function () {
            document.title = `SUNFLOWER - LogIn`;
            return function () { document.title = 'SUNFLOWER' };
        }, [])
    ////////////////////////
    const { t } = useTranslation();
    return (
        <div >
            <div className='register'  >
                <Form noValidate validated={validated} onSubmit={handleSubmit}
                    style={{ display: data == "Verifying..." ? 'none' : "flex" }} className='boxRegister'  >
                    <div className='formHeader'>
                        {t('public.login')}
                    </div>
                    <hr style={{ color: "#a7abaf" }} />
                    {error && <p className='err' style={{ color: 'red' }}>{error.message}</p>}
                    <div className='loginFormBody'
                    >
                        <Form.Group className="mb-3" controlId="form1">
                            <Form.Label >  {t('public.phone')}   </Form.Label>
                            <PhoneInput
                                country={'sa'}
                                required
                                onChange={(value, country, event, formattedValue) => {
                                    setPhone(formattedValue);

                                }}
                                inputStyle={{
                                    width: '100%',
                                }}
                            />
                        </Form.Group>
                    </div>
                    <hr style={{ color: "#a7abaf" }} />
                    <div className='formFooter'>
                        <button type="submit" className='formButtonLogin' >  {t('public.login')}   </button>
                    </div>
                </Form>

                {/* //////////// */}

                <div style={{ display: data != "Verifying..." ? 'none' : "flex" }} className='boxRegister'>
                    <OTPVerificationForm
                        phone={phone}
                    />
                    <hr style={{ color: "#a7abaf" }} />
                    <button className='registerBt' style={{ margin: "0 7%" }} onClick={handleGoBack} >  {t('public.back')}   </button>
                </div>

            </div >



        </div>

    );
}

export default Login;


// <div style={{ height: window != 0 || data == "Verifying..." || data == "Verifying..." ? '0px' : "100%" }} className='boxLogin'>
// {error && <p className='err' style={{ color: 'red' }}>{error.message}</p>}

// <div className='register' >
//     <Form noValidate validated={validated} onSubmit={handleSubmit} className='boxRegister' >
//         <div className='formHeader'>
//             {t('public.login')}
//         </div>
//         <hr style={{ color: "#a7abaf" }} />
//         <div className='loginFormBody'>
//             <Form.Group className="mb-3" controlId="form1">
//                 <Form.Label >   {t('public.phone')} </Form.Label>
//                 <Form.Control type="phoen" placeholder={t('public.email')} required
//                     value={phone}
//                     onChange={(e) => setPhone(e.target.value)}
//                 />
//             </Form.Group>
//         </div>

//         {/* <button type="submit" className='loginBT' style={{ margin: "0 5%" }} >
//                             {loading ?
//                                 <div style={{ display: "flex", gap: "10px" }}>
//                                     Please wait  <svg width={24} height={24} viewBox="0 0 24 24" ><circle cx={4} cy={12} r={3} fill="#1d1d31"><animate id="svgSpinners3DotsBounce0" attributeName="cy" begin="0;svgSpinners3DotsBounce1.end+0.25s" calcMode="spline" dur="0.6s" keySplines=".33,.66,.66,1;.33,0,.66,.33" values="12;6;12"></animate></circle><circle cx={12} cy={12} r={3} fill="#1d1d31"><animate attributeName="cy" begin="svgSpinners3DotsBounce0.begin+0.1s" calcMode="spline" dur="0.6s" keySplines=".33,.66,.66,1;.33,0,.66,.33" values="12;6;12"></animate></circle><circle cx={20} cy={12} r={3} fill="#1d1d31"><animate id="svgSpinners3DotsBounce1" attributeName="cy" begin="svgSpinners3DotsBounce0.begin+0.2s" calcMode="spline" dur="0.6s" keySplines=".33,.66,.66,1;.33,0,.66,.33" values="12;6;12"></animate></circle></svg>
//                                 </div>
//                                 :
//                                 t('public.login')

//                             }
//                         </button> */}

//     </Form>
// </div >