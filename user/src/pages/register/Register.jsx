import './register.css'
import { useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import { postLogin } from '../../RTK/Auth/loginSlice';
import { postRegister } from '../../RTK/Auth/registerSlice';
import { useTranslation } from 'react-i18next';
import Cookies from 'universal-cookie';

const Register = () => {
    //////////////////////////
    const cookies = new Cookies();
    const lng = cookies.get("i18next") || "en";
    //////////////////////////
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [username, setUsername] = useState('')
    const [phone, setPhone] = useState('')
    const [gender, setGender] = useState('')
    const [imageSquer, setImageSquer] = useState([]);
    const [image, setImage] = useState([]);
    const [hiddenB, setHiddenB] = useState(true)
    const [validated, setValidated] = useState(false);
    /////////////////////////
    const handelimag = (event) => {
        setImage(event.target.files[0])
        setImageSquer(URL.createObjectURL(event.target.files[0]))
    }
    /////////////////////////
    const dispatch = useDispatch()
    const handleSubmit = (e) => {
        const form = e.currentTarget;
        e.preventDefault();
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }
        else {
            setValidated(true);
            const formData = new FormData();
            formData.append('image', image);
            formData.append('username', username);
            formData.append('phone', phone);
            formData.append('email', email);
            formData.append('gender', gender);
            formData.append('password', password);
            formData.append('confirmPassword', confirmPassword);
            dispatch(postRegister(formData))
        }
    };
    /////////////////////////
    var animation11 = document.getElementById("cn1")
    var animation12 = document.getElementById("cn2")
    var animation13 = document.getElementById("cn3")
    var animation14 = document.getElementById("cn4")
    var animation21 = document.getElementById("dn1")
    var animation22 = document.getElementById("dn2")
    function RestartAnimate() {
        animation11?.beginElement();
        animation12?.beginElement();
        animation13?.beginElement();
        animation14?.beginElement();
        animation21?.beginElement();
        animation22?.beginElement();
    }
    //////////////////////////
    useEffect(
        function () {
            document.title = `SUNFLOWER - Register `;
            return function () { document.title = 'SUNFLOWER' };
        }, [])
    ////////////////////////
    const { t } = useTranslation();
    return (
        <div className='bage'>
            <div className='title'>
                {t('public.register')}
            </div>
            <div className='register2'>
                <Form noValidate validated={validated} onSubmit={handleSubmit}
                    className='registerForm'
                >
                    <div className='formBody'>
                        <Form.Group className="mb-3" controlId="form1">
                            <Form.Label >
                                {t('public.image')}
                            </Form.Label>
                            <Form.Control
                                type="file"
                                onChange={handelimag}
                            />
                        </Form.Group>
                        <Row>
                            <Form.Group as={Col} className="mb-3" controlId="form2">
                                <Form.Label >
                                    {t('public.name')}
                                </Form.Label>
                                <Form.Control type="string" placeholder={t('public.write')} required
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3" controlId="form3">
                                <Form.Label >
                                    {t('public.phone')}
                                </Form.Label>
                                <Form.Control type="string" placeholder={t('public.write')} required
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </Form.Group>
                        </Row>
                        <Row>

                            <Form.Group as={Col} className="mb-3" controlId="form4">
                                <Form.Label >
                                    {t('public.email')}
                                </Form.Label>
                                <Form.Control type="email" placeholder={t('public.write')} required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {(!email.includes("@") && validated) &&
                                    < div className='error' >
                                        {t('public.invalidEmail')}
                                    </div>}
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3" controlId="form5">
                                <Form.Label >
                                    {t('public.email')}
                                </Form.Label>
                                <Form.Select type="email" placeholder={t('public.write')} required
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                >
                                    <option value={""}> {t('flower.open')}</option>
                                    <option value={"female"} >  Female  </option>
                                    <option value={"male"} >  Male  </option>
                                </Form.Select>
                            </Form.Group>
                        </Row>
                        <Form.Group className="mb-3" controlId="form6">
                            <Form.Label>
                                {t('public.password')}
                            </Form.Label>
                            <div className='passsWorlContent '>
                                <Form.Control type={hiddenB ? 'password' : 'text'} placeholder="**********" required
                                    value={password}
                                    onChange={(e) => (setPassword(e.target.value)
                                    )}
                                />
                                <button type='button' className='hiddenBassWorld' style={{ right: lng == "ar" ? "calc(100% - 50px)" : "20px" }}
                                    onClick={() => (setHiddenB(!hiddenB), RestartAnimate())}>
                                    <span className={hiddenB ? 'unhdiddenIcon' : 'hdiddenIcon'}  >
                                        <svg xmlns="http://www.w3.org/2000/svg" width={25} height={25} viewBox="0 0 24 24" ><defs><clipPath id="lineMdWatchOffLoop0"><rect width={24} height={12}></rect></clipPath><symbol id="lineMdWatchOffLoop1"><path fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M23 16.5C23 10.4249 18.0751 5.5 12 5.5C5.92487 5.5 1 10.4249 1 16.5z" clipPath="url(#lineMdWatchOffLoop0)"><animate id='cn1' attributeName="d" dur="6s" keyTimes="0;0.07;0.93;1" repeatCount="indefinite" values="M23 16.5C23 11.5 18.0751 12 12 12C5.92487 12 1 11.5 1 16.5z;M23 16.5C23 10.4249 18.0751 5.5 12 5.5C5.92487 5.5 1 10.4249 1 16.5z;M23 16.5C23 10.4249 18.0751 5.5 12 5.5C5.92487 5.5 1 10.4249 1 16.5z;M23 16.5C23 11.5 18.0751 12 12 12C5.92487 12 1 11.5 1 16.5z"></animate></path></symbol><mask id="lineMdWatchOffLoop2"><use href="#lineMdWatchOffLoop1"></use><use href="#lineMdWatchOffLoop1" transform="rotate(180 12 12)"></use><circle cx={12} cy={12} r={0} fill="#fff"><animate id='cn2' attributeName="r" dur="6s" keyTimes="0;0.03;0.97;1" repeatCount="indefinite" values="0;3;3;0"></animate></circle><g fill="none" strokeDasharray={26} strokeDashoffset={26} strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} transform="rotate(45 13 12)"><path stroke="#000" d="M0 11h24"></path><path stroke="#fff" d="M0 13h22"><animate id='cn3' attributeName="d" dur="6s" repeatCount="indefinite" values="M0 13h22;M2 13h22;M0 13h22"></animate></path><animate id='cn4' fill="freeze" attributeName="stroke-dashoffset" begin="0.6s" dur="0.2s" values="26;0"></animate></g></mask></defs><rect width={24} height={24} fill="currentColor" mask="url(#lineMdWatchOffLoop2)"></rect></svg>
                                    </span>
                                    <span className={hiddenB ? 'hdiddenIcon' : 'unhdiddenIcon'}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width={25} height={25} viewBox="0 0 24 24" ><defs><clipPath id="lineMdWatchLoop0"><rect width={24} height={12}></rect></clipPath><symbol id="lineMdWatchLoop1"><path fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M23 16.5C23 10.4249 18.0751 5.5 12 5.5C5.92487 5.5 1 10.4249 1 16.5z" clipPath="url(#lineMdWatchLoop0)"><animate id='dn1' attributeName="d" dur="6s" keyTimes="0;0.07;0.93;1" repeatCount="indefinite" values="M23 16.5C23 11.5 18.0751 12 12 12C5.92487 12 1 11.5 1 16.5z;M23 16.5C23 10.4249 18.0751 5.5 12 5.5C5.92487 5.5 1 10.4249 1 16.5z;M23 16.5C23 10.4249 18.0751 5.5 12 5.5C5.92487 5.5 1 10.4249 1 16.5z;M23 16.5C23 11.5 18.0751 12 12 12C5.92487 12 1 11.5 1 16.5z"></animate></path></symbol><mask id="lineMdWatchLoop2"><use href="#lineMdWatchLoop1"></use><use href="#lineMdWatchLoop1" transform="rotate(180 12 12)"></use><circle cx={12} cy={12} r={0} fill="#fff"><animate id='dn2' attributeName="r" dur="6s" keyTimes="0;0.03;0.97;1" repeatCount="indefinite" values="0;3;3;0"></animate></circle></mask></defs><rect width={24} height={24} fill="currentColor" mask="url(#lineMdWatchLoop2)"></rect></svg>
                                    </span>
                                </button>
                            </div>
                            {(password.length < 8 && validated) &&
                                <div className='error' >   {t('public.passwordShort')}</div>
                            }
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="form7">
                            <Form.Label>
                                {t('public.confirmPassword')}
                            </Form.Label>
                            <div className='passsWorlContent '>
                                <Form.Control type={hiddenB ? 'password' : 'text'} placeholder="**********" required
                                    value={confirmPassword}
                                    onChange={(e) => (setConfirmPassword(e.target.value)
                                    )}
                                />
                                <button type='button' className='hiddenBassWorld' style={{ right: lng == "ar" ? "calc(100% - 50px)" : "20px" }}
                                    onClick={() => (setHiddenB(!hiddenB), RestartAnimate())}>
                                    <span className={hiddenB ? 'unhdiddenIcon' : 'hdiddenIcon'} >
                                        <svg xmlns="http://www.w3.org/2000/svg" width={25} height={25} viewBox="0 0 24 24" ><defs><clipPath id="lineMdWatchOffLoop0"><rect width={24} height={12}></rect></clipPath><symbol id="lineMdWatchOffLoop1"><path fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M23 16.5C23 10.4249 18.0751 5.5 12 5.5C5.92487 5.5 1 10.4249 1 16.5z" clipPath="url(#lineMdWatchOffLoop0)"><animate id='cn1' attributeName="d" dur="6s" keyTimes="0;0.07;0.93;1" repeatCount="indefinite" values="M23 16.5C23 11.5 18.0751 12 12 12C5.92487 12 1 11.5 1 16.5z;M23 16.5C23 10.4249 18.0751 5.5 12 5.5C5.92487 5.5 1 10.4249 1 16.5z;M23 16.5C23 10.4249 18.0751 5.5 12 5.5C5.92487 5.5 1 10.4249 1 16.5z;M23 16.5C23 11.5 18.0751 12 12 12C5.92487 12 1 11.5 1 16.5z"></animate></path></symbol><mask id="lineMdWatchOffLoop2"><use href="#lineMdWatchOffLoop1"></use><use href="#lineMdWatchOffLoop1" transform="rotate(180 12 12)"></use><circle cx={12} cy={12} r={0} fill="#fff"><animate id='cn2' attributeName="r" dur="6s" keyTimes="0;0.03;0.97;1" repeatCount="indefinite" values="0;3;3;0"></animate></circle><g fill="none" strokeDasharray={26} strokeDashoffset={26} strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} transform="rotate(45 13 12)"><path stroke="#000" d="M0 11h24"></path><path stroke="#fff" d="M0 13h22"><animate id='cn3' attributeName="d" dur="6s" repeatCount="indefinite" values="M0 13h22;M2 13h22;M0 13h22"></animate></path><animate id='cn4' fill="freeze" attributeName="stroke-dashoffset" begin="0.6s" dur="0.2s" values="26;0"></animate></g></mask></defs><rect width={24} height={24} fill="currentColor" mask="url(#lineMdWatchOffLoop2)"></rect></svg>
                                    </span>
                                    <span className={hiddenB ? 'hdiddenIcon' : 'unhdiddenIcon'}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width={25} height={25} viewBox="0 0 24 24" ><defs><clipPath id="lineMdWatchLoop0"><rect width={24} height={12}></rect></clipPath><symbol id="lineMdWatchLoop1"><path fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M23 16.5C23 10.4249 18.0751 5.5 12 5.5C5.92487 5.5 1 10.4249 1 16.5z" clipPath="url(#lineMdWatchLoop0)"><animate id='dn1' attributeName="d" dur="6s" keyTimes="0;0.07;0.93;1" repeatCount="indefinite" values="M23 16.5C23 11.5 18.0751 12 12 12C5.92487 12 1 11.5 1 16.5z;M23 16.5C23 10.4249 18.0751 5.5 12 5.5C5.92487 5.5 1 10.4249 1 16.5z;M23 16.5C23 10.4249 18.0751 5.5 12 5.5C5.92487 5.5 1 10.4249 1 16.5z;M23 16.5C23 11.5 18.0751 12 12 12C5.92487 12 1 11.5 1 16.5z"></animate></path></symbol><mask id="lineMdWatchLoop2"><use href="#lineMdWatchLoop1"></use><use href="#lineMdWatchLoop1" transform="rotate(180 12 12)"></use><circle cx={12} cy={12} r={0} fill="#fff"><animate id='dn2' attributeName="r" dur="6s" keyTimes="0;0.03;0.97;1" repeatCount="indefinite" values="0;3;3;0"></animate></circle></mask></defs><rect width={24} height={24} fill="currentColor" mask="url(#lineMdWatchLoop2)"></rect></svg>
                                    </span>
                                </button>
                            </div>
                            {(password.length < 8 && validated) &&
                                <div className='error' >   {t('public.passwordShort')}</div>
                            }
                        </Form.Group>
                    </div>
                    <hr className='tapp' />
                    <div className='divButton'>
                        <button type="submit" className='formButton' style={{ margin: "0 5%" }} >  {t('public.register')}  </button>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default Register;
