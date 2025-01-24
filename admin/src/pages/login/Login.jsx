import React, { useEffect, useState } from 'react';
import './login.css';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { postLogin } from '../../RTK/Auth/loginSlice';
import { Navigate, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { useTranslation } from 'react-i18next';

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
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [hiddenB, setHiddenB] = useState(true)
    const [valid, setValid] = useState(false)
    const [validated, setValidated] = useState(false);
    ////////////////////////
    const dispatch = useDispatch()
    const navigate = useNavigate();
    ////////////////////////
    const handleSubmit = (e) => {
        const form = e.currentTarget;
        e.preventDefault();
        if (form.checkValidity() === false || password.length < 8) {
            e.preventDefault();
            e.stopPropagation();
            setValid(true)
        }
        else {
            setValid(false)
            setValidated(true);
            const value = {
                email,
                password,
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
        <div className='register' >
            <Form noValidate validated={validated} onSubmit={handleSubmit} className='boxRegister' >
                <div className='formHeader'>
                    {t('public.login')}
                </div>
                <hr style={{ color: "#a7abaf" }} />
                <div className='loginFormBody'>
                    <Form.Group className="mb-3" controlId="form1">
                        <Form.Label >  {t('public.email')}   </Form.Label>
                        <Form.Control type="email" placeholder={t('public.email')} required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {(!email.includes("@") && valid) &&
                            < div className='error' >
                                {t('public.invalidEmail')}
                            </div>}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="form2">
                        <Form.Label>   {t('public.password')} </Form.Label>
                        <div className='passsWorlContent '>
                            <Form.Control type={hiddenB ? 'password' : 'text'} placeholder="password" required
                                value={password}
                                onChange={(e) => (setPassword(e.target.value)
                                )}
                            />
                            <button type='button' className='hiddenBassWorld' style={{ right: lng == "ar" ? "calc(100% - 50px)" : "20px" }}
                                onClick={() => setHiddenB(!hiddenB)}>
                                <span className={hiddenB ? 'unhdiddenIcon' : 'hdiddenIcon'} >
                                    <svg xmlns="http://www.w3.org/2000/svg" width={25} height={25} viewBox="0 0 24 24" ><defs><clipPath id="lineMdWatchOffLoop0"><rect width={24} height={12}></rect></clipPath><symbol id="lineMdWatchOffLoop1"><path fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M23 16.5C23 10.4249 18.0751 5.5 12 5.5C5.92487 5.5 1 10.4249 1 16.5z" clipPath="url(#lineMdWatchOffLoop0)"><animate id='cn1' attributeName="d" dur="6s" keyTimes="0;0.07;0.93;1" repeatCount="indefinite" values="M23 16.5C23 11.5 18.0751 12 12 12C5.92487 12 1 11.5 1 16.5z;M23 16.5C23 10.4249 18.0751 5.5 12 5.5C5.92487 5.5 1 10.4249 1 16.5z;M23 16.5C23 10.4249 18.0751 5.5 12 5.5C5.92487 5.5 1 10.4249 1 16.5z;M23 16.5C23 11.5 18.0751 12 12 12C5.92487 12 1 11.5 1 16.5z"></animate></path></symbol><mask id="lineMdWatchOffLoop2"><use href="#lineMdWatchOffLoop1"></use><use href="#lineMdWatchOffLoop1" transform="rotate(180 12 12)"></use><circle cx={12} cy={12} r={0} fill="#fff"><animate id='cn2' attributeName="r" dur="6s" keyTimes="0;0.03;0.97;1" repeatCount="indefinite" values="0;3;3;0"></animate></circle><g fill="none" strokeDasharray={26} strokeDashoffset={26} strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} transform="rotate(45 13 12)"><path stroke="#000" d="M0 11h24"></path><path stroke="#fff" d="M0 13h22"><animate id='cn3' attributeName="d" dur="6s" repeatCount="indefinite" values="M0 13h22;M2 13h22;M0 13h22"></animate></path><animate id='cn4' fill="freeze" attributeName="stroke-dashoffset" begin="0.6s" dur="0.2s" values="26;0"></animate></g></mask></defs><rect width={24} height={24} fill="currentColor" mask="url(#lineMdWatchOffLoop2)"></rect></svg>
                                </span>
                                <span className={hiddenB ? 'hdiddenIcon' : 'unhdiddenIcon'}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width={25} height={25} viewBox="0 0 24 24" ><defs><clipPath id="lineMdWatchLoop0"><rect width={24} height={12}></rect></clipPath><symbol id="lineMdWatchLoop1"><path fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M23 16.5C23 10.4249 18.0751 5.5 12 5.5C5.92487 5.5 1 10.4249 1 16.5z" clipPath="url(#lineMdWatchLoop0)"><animate id='dn1' attributeName="d" dur="6s" keyTimes="0;0.07;0.93;1" repeatCount="indefinite" values="M23 16.5C23 11.5 18.0751 12 12 12C5.92487 12 1 11.5 1 16.5z;M23 16.5C23 10.4249 18.0751 5.5 12 5.5C5.92487 5.5 1 10.4249 1 16.5z;M23 16.5C23 10.4249 18.0751 5.5 12 5.5C5.92487 5.5 1 10.4249 1 16.5z;M23 16.5C23 11.5 18.0751 12 12 12C5.92487 12 1 11.5 1 16.5z"></animate></path></symbol><mask id="lineMdWatchLoop2"><use href="#lineMdWatchLoop1"></use><use href="#lineMdWatchLoop1" transform="rotate(180 12 12)"></use><circle cx={12} cy={12} r={0} fill="#fff"><animate id='dn2' attributeName="r" dur="6s" keyTimes="0;0.03;0.97;1" repeatCount="indefinite" values="0;3;3;0"></animate></circle></mask></defs><rect width={24} height={24} fill="currentColor" mask="url(#lineMdWatchLoop2)"></rect></svg>
                                </span>
                            </button>
                        </div>
                        {(password.length < 8 && valid) &&
                            <div className='error' >   {t('public.passwordShort')}</div>
                        }
                    </Form.Group>
                </div>
                <hr />
                <div className='formFooter'>
                    <button type="submit" className='formButtonLogin' >  {t('public.login')}   </button>
                </div>
            </Form>
        </div >
    );
}

export default Login;

