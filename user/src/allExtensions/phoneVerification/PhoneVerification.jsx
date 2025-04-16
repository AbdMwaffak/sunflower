import React, { useState } from 'react';
import axios from 'axios';

const PhoneVerification = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [code, setCode] = useState('');
    const [verificationSid, setVerificationSid] = useState('');
    const [step, setStep] = useState('send'); // 'send' أو 'verify'
    const [error, setError] = useState('');

    const sendVerificationCode = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/send-verification', {
                phoneNumber: `+${phoneNumber}` // تأكد من إضافة رمز الدولة (مثال: +966)
            });
            setVerificationSid(response.data.verificationSid);
            setStep('verify');
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to send code');
        }
    };

    const verifyCode = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/verify-code', {
                phoneNumber: `+${phoneNumber}`,
                code,
                verificationSid
            });
            if (response.data.success) {
                alert('Phone number verified successfully!');
            } else {
                setError('Invalid code');
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Verification failed');
        }
    };

    return (
        <div>
            {step === 'send' ? (
                <div>
                    <h2>Verify Your Phone Number</h2>
                    <input
                        type="text"
                        placeholder="Phone Number (with country code)"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    <button onClick={sendVerificationCode}>Send Code</button>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </div>
            ) : (
                <div>
                    <h2>Enter Verification Code</h2>
                    <input
                        type="text"
                        placeholder="Verification Code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                    />
                    <button onClick={verifyCode}>Verify</button>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </div>
            )}
        </div>
    );
};

export default PhoneVerification;