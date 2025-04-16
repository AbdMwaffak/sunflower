import React, { useState, useRef, useEffect } from 'react';
import './otpVerificationForm.css'; // استيراد ملف CSS
import { useDispatch, useSelector } from 'react-redux';
import { verifying } from '../../RTK/Auth/verifyingSlice';
import { postLogin } from '../../RTK/Auth/loginSlice';
import { useTranslation } from 'react-i18next';

const OTPVerificationForm = (props) => {
    const [otp, setOtp] = useState(['', '', '', '', '']);
    const [errorr, setErrorr] = useState('');
    const [timer, setTimer] = useState(60);
    const [isResendDisabled, setIsResendDisabled] = useState(true);
    const inputRefs = useRef([]);
    const { data, loading, error } = useSelector((state) => state.verifying);
    // ----------------- تابع التايمر -----------------
    useEffect(() => {
        let interval;
        if (timer > 0 && isResendDisabled) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        } else if (timer === 0) {
            setIsResendDisabled(false);
        }
        return () => clearInterval(interval);
    }, [timer, isResendDisabled]);

    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, []);

    const handleChange = (index, value) => {
        if (/^\d*$/.test(value)) {
            setErrorr('');
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            if (value && index < 4) {
                inputRefs.current[index + 1].focus();
            }
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData('text/plain').trim();
        if (/^\d{5}$/.test(pasteData)) {
            setErrorr('');
            const pasteArray = pasteData.split('');
            const newOtp = [...otp];
            for (let i = 0; i < 5; i++) {
                newOtp[i] = pasteArray[i] || '';
            }
            setOtp(newOtp);
        } else {

            setErrorr(t('otp.fiveNum'));
        }
    };
    const dispatch = useDispatch()
    /////////////////////////
    const handleSubmit = (e) => {
        e.preventDefault();
        const otpCode = otp.join('');

        if (otpCode.length !== 5) {
            setErrorr(t('otp.plzSit'));
            return;
        } else {
            const combinedString = otp.join('');
            const resultNumber = parseInt(combinedString, 10);
            const value = {
                phone: props?.phone,
                otp: resultNumber
            }
            dispatch(verifying(value))
            setOtp(['', '', '', '', '']);
        }


    };

    const handleResendOTP = () => {
        if (isResendDisabled) return;

        setTimer(60);
        setIsResendDisabled(true);
        setErrorr('');
        setOtp(['', '', '', '', '']);

        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
        const value = {
            phone: props?.phone,
        }
        dispatch(postLogin(value))
    };
    ////////////////////////////////////
    const { t, i18n } = useTranslation();
    return (
        <div className="otp-container">
            {error && <p className='err' style={{ color: 'red' }}>{error}</p>}
            <h2 className="otp-title formHeader"> {t('otp.verifye')} </h2>
            <hr style={{ color: "#a7abaf" }} />
            <p className="otp-subtitle ">
                {t('otp.fiveNum')}
            </p>

            <form onSubmit={handleSubmit} className="otp-form">
                <div className="otp-inputs-container">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength="1"
                            value={digit}
                            onChange={(e) => handleChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            onPaste={handlePaste}
                            ref={(el) => (inputRefs.current[index] = el)}
                            className={`otp-input ${errorr ? 'error' : ''}`}
                            inputMode="numeric"
                            autoComplete="one-time-code"
                        />
                    ))}
                </div>

                {errorr && <p className="otp-error-text">{errorr}</p>}
                <button type="submit" className='loginBT' style={{ margin: "0 5%" }} >
                    {t('otp.vv')}
                </button>
            </form>

            <p className="otp-resend-text">
                {t('otp.didnotReceive')}{' '}
                {isResendDisabled ? (
                    <span className="otp-timer-text">  {t('otp.resendWithin')}   {timer}   {t('otp.seconds')}</span>
                ) : (
                    <a href="#" onClick={handleResendOTP} className="otp-resend-link">
                        {t('otp.resend')}
                    </a>
                )}
            </p>
        </div>
    );
};

export default OTPVerificationForm;