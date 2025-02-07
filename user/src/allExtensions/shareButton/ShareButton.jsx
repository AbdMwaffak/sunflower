import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router';
import {
  FacebookMessengerShareButton,
  FacebookShareButton,
  TelegramShareButton,
  WhatsappShareButton,
} from 'react-share';
import facebook from '../../image/social/facebook.png';
import link from '../../image/social/link.png';
import messnger from '../../image/social/messnger.png';
import telegram from '../../image/social/telegram.png';
import whatsapp from '../../image/social/whatsapp.png';
import './shareButton.css';

function ShareButton(props) {
  ////////////////////////
  const [show, setShow] = useState(false);
  const [copyLink, setCopyLink] = useState('');
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  ////////////////////////
  const location = useLocation();
  const handleCopyLink = () => {
    navigator.clipboard.writeText(
      `https://sunflowerworld.shop/product/${props?.id}`
    );
    handleClose();
    toast.success('The link has been copied');
  };
  ////////////////////////////////////
  const { t } = useTranslation();
  return (
    <>
      <div className='share' onClick={handleShow}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width={20}
          height={20}
          viewBox='0 0 24 24'
        >
          <g fill='none' stroke='currentColor' strokeWidth={1.5}>
            <path d='M9 12a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0Z'></path>
            <path strokeLinecap='round' d='M14 6.5L9 10m5 7.5L9 14'></path>
            <path d='M19 18.5a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0Zm0-13a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0Z'></path>
          </g>
        </svg>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop='static'
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>SHARE LINKE</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='shareContener'>
            <FacebookShareButton
              url={`https://sunflowerworld.shop/product/${props?.id}`}
              hashtag='SUNFLOWE RWORLD - Endless Happiness'
              imageurl={props?.img}
              imgalt={facebook}
              onClick={handleClose}
            >
              <img className='shareImg' src={facebook} alt='' />
            </FacebookShareButton>
            <WhatsappShareButton
              url={`https://sunflowerworld.shop/product/${props?.id}`}
              hashtag='SUNFLOWE RWORLD - Endless Happiness'
              imageurl={props?.img}
              onClick={handleClose}
            >
              <img className='shareImg' src={whatsapp} alt='' />
            </WhatsappShareButton>
            <TelegramShareButton
              url={`https://sunflowerworld.shop/product/${props?.id}`}
              hashtag='SUNFLOWE RWORLD - Endless Happiness'
              imageurl={props?.img}
              onClick={handleClose}
            >
              <img className='shareImg' src={telegram} alt='' />
            </TelegramShareButton>
            <FacebookMessengerShareButton
              url={`https://sunflowerworld.shop/product/${props?.id}`}
              hashtag='SUNFLOWE RWORLD - Endless Happiness'
              imageurl={props?.img}
              onClick={handleClose}
            >
              <img className='shareImg' src={messnger} alt='' />
            </FacebookMessengerShareButton>
            <img
              className='shareImg'
              src={link}
              alt=''
              onClick={handleCopyLink}
            />
          </div>
        </Modal.Body>
        <Modal.Footer id='modal-footer'>
          <Button variant='secondary' onClick={handleClose}>
            {t('public.close')}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default ShareButton;
