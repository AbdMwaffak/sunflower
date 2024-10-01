import React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import whatsapp from '../../image/social/whatsapp.png'
import facebook from '../../image/social/facebook.png'
import telegram from '../../image/social/telegram.png'
import twitter from '../../image/social/twitter.png'
import messnger from '../../image/social/messnger.png'
import link from '../../image/social/link.png'

import {
    FacebookShareButton,
    WhatsappShareButton,
    TelegramShareButton,
    TwitterShareButton,
    FacebookMessengerShareButton,
} from 'react-share';
import './shareButton.css'
import { useLocation } from 'react-router-dom';

function ShareButton(props) {
    ////////////////////////
    const [show, setShow] = useState(false);
    const [copyLink, setCopyLink] = useState('');
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    ////////////////////////
    const shareUrl = 'https://www.pakkamarwadi.tk/';
    ////////////////////////
    const location = useLocation();
    const handleCopyLink = () => {
        navigator.clipboard.writeText(location)
    }
    return (
        <>
            <div className='share' onClick={handleShow}>

                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" ><g fill="none" stroke="currentColor" strokeWidth={1.5}><path d="M9 12a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0Z"></path><path strokeLinecap="round" d="M14 6.5L9 10m5 7.5L9 14"></path><path d="M19 18.5a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0Zm0-13a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0Z"></path></g></svg>

            </div>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>DELETE MESSAGE</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='shareContener' >
                        <FacebookShareButton
                            url={shareUrl}
                            quote={'Title or jo bhi aapko likhna ho'}
                            hashtag={'#portfolio...'}
                            imageUrl="http://localhost:5000/users/1722677521674_453743977_522177543495574_1031924484224266177_n.jpeg"
                            imgAlt={facebook}
                        >
                            <img className='shareImg' src={facebook} alt="" />
                        </FacebookShareButton>

                        <WhatsappShareButton
                            url="iam truing shar link on whatsapp , iam dunia sunfluwer wep sit "
                            quote={'murad'}
                            hashtag={'#portfolio...'}
                        >
                            <img className='shareImg' src={whatsapp} alt="" />
                        </WhatsappShareButton>
                        <TelegramShareButton
                            url={shareUrl}
                            quote={'Title or jo bhi aapko likhna ho'}
                            hashtag={'#portfolio...'}
                        >
                            <img className='shareImg' src={telegram} alt="" />
                        </TelegramShareButton>
                        <TwitterShareButton
                            url={shareUrl}
                            quote={'Title or jo bhi aapko likhna ho'}
                            hashtag={'#portfolio...'}
                        >
                            <img className='shareImg' src={twitter} alt="" />
                        </TwitterShareButton>
                        <FacebookMessengerShareButton
                            url={shareUrl}
                            quote={'Title or jo bhi aapko likhna ho'}
                            hashtag={'#portfolio...'}
                        >
                            <img className='shareImg' src={messnger} alt="" />
                        </FacebookMessengerShareButton>
                        <img className='shareImg' src={link} alt="" onClick={handleCopyLink} />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default ShareButton;





