import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllSettings } from '../../RTK/settings/getAllSettingsSlice';
import './appFooter.css';

const AppFooter = () => {
  const allSettings = useSelector((state) => state.getAllSettings).data;
  ///////////////////
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllSettings());
  }, [dispatch]);
  ////////////////////////////////////
  const { t } = useTranslation();
  return (
    <div className='appFooter'>
      <div className='appFooterContent1'>
        <div className='appFooterContent2'>
          <div className='footerTitle'>Sunflower world</div>
          {t('footer.message1')}
          <div className='divs'>
            <Link to={'/Articles'} className='divsItem1'>
              <div className='divsItem2'>{t('sidBar.articles')}</div>
            </Link>
            <Link to={'/AboutTheStore'} className='divsItem1'>
              <div className='divsItem2'>{t('sidBar.aboutStore')}</div>
            </Link>
            <Link to={'/ContactUs'} className='divsItem1'>
              <div className='divsItem2'>{t('sidBar.contactUs')}</div>
            </Link>
            <Link to={'/StoreMessages'} className='divsItem1'>
              <div className='divsItem2'>{t('sidBar.messages')}</div>
            </Link>
          </div>
          <hr className='tapp' />
          <div className='footerTitle'>{t('footer.title2')}</div>
          <div className='allContact'>
            {(allSettings?.whatsapp !== '' || null) && (
              <a
                href={`https://wa.me/${allSettings?.whatsapp}`}
                target='_blank'
                rel='noopener noreferrer'
                className='contSocial'
              >
                <div className='contIcon '>
                  <div className='contCer'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width={'80%'}
                      height={'80%'}
                      viewBox='0 0 24 24'
                    >
                      <g fill='currentColor'>
                        <path
                          fillRule='evenodd'
                          d='M12 4a8 8 0 0 0-6.895 12.06l.569.718l-.697 2.359l2.32-.648l.379.243A8 8 0 1 0 12 4M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10a9.96 9.96 0 0 1-5.016-1.347l-4.948 1.382l1.426-4.829l-.006-.007l-.033-.055A9.96 9.96 0 0 1 2 12'
                          clipRule='evenodd'
                        ></path>
                        <path d='M16.735 13.492c-.038-.018-1.497-.736-1.756-.83a1 1 0 0 0-.34-.075c-.196 0-.362.098-.49.291c-.146.217-.587.732-.723.886c-.018.02-.042.045-.057.045c-.013 0-.239-.093-.307-.123c-1.564-.68-2.751-2.313-2.914-2.589c-.023-.04-.024-.057-.024-.057c.005-.021.058-.074.085-.101c.08-.079.166-.182.249-.283l.117-.14c.121-.14.175-.25.237-.375l.033-.066a.68.68 0 0 0-.02-.64c-.034-.069-.65-1.555-.715-1.711c-.158-.377-.366-.552-.655-.552c-.027 0 0 0-.112.005c-.137.005-.883.104-1.213.311c-.35.22-.94.924-.94 2.16c0 1.112.705 2.162 1.008 2.561l.041.06c1.161 1.695 2.608 2.951 4.074 3.537c1.412.564 2.081.63 2.461.63c.16 0 .288-.013.4-.024l.072-.007c.488-.043 1.56-.599 1.804-1.276c.192-.534.243-1.117.115-1.329c-.088-.144-.239-.216-.43-.308'></path>
                      </g>
                    </svg>
                  </div>
                </div>
                <div className='cont'> {allSettings?.whatsapp} </div>
              </a>
            )}
            {(allSettings?.email !== '' || null) && (
              <a
                href={`mailto:${allSettings?.email}`}
                target='_blank'
                rel='noopener noreferrer'
                className='contSocial'
              >
                <div className='contIcon '>
                  <div className='contCer'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width={'80%'}
                      height={'80%'}
                      viewBox='0 0 24 24'
                    >
                      <path
                        fill='currentColor'
                        d='M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zm3.519 0L12 11.671L18.481 6zM20 7.329l-7.341 6.424a1 1 0 0 1-1.318 0L4 7.329V18h16z'
                      ></path>
                    </svg>{' '}
                  </div>
                </div>
                <div className='cont'> {allSettings?.email} </div>
              </a>
            )}
            {(allSettings?.instagram !== '' || null) && (
              <a
                href={`https://www.instagram.com/${allSettings?.instagram}`}
                target='_blank'
                rel='noopener noreferrer'
                className='contSocial'
              >
                <div className='contIcon '>
                  <div className='contCer'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width={'80%'}
                      height={'80%'}
                      viewBox='0 0 512 512'
                    >
                      <path
                        fill='currentColor'
                        d='M349.33 69.33a93.62 93.62 0 0 1 93.34 93.34v186.66a93.62 93.62 0 0 1-93.34 93.34H162.67a93.62 93.62 0 0 1-93.34-93.34V162.67a93.62 93.62 0 0 1 93.34-93.34zm0-37.33H162.67C90.8 32 32 90.8 32 162.67v186.66C32 421.2 90.8 480 162.67 480h186.66C421.2 480 480 421.2 480 349.33V162.67C480 90.8 421.2 32 349.33 32'
                      ></path>
                      <path
                        fill='currentColor'
                        d='M377.33 162.67a28 28 0 1 1 28-28a27.94 27.94 0 0 1-28 28M256 181.33A74.67 74.67 0 1 1 181.33 256A74.75 74.75 0 0 1 256 181.33m0-37.33a112 112 0 1 0 112 112a112 112 0 0 0-112-112'
                      ></path>
                    </svg>
                  </div>
                </div>
                <div className='cont'> {allSettings?.instagram} </div>
              </a>
            )}
            {(allSettings?.phone !== '' || null) && (
              <a
                href={`tel:${allSettings?.phone}`}
                target='_blank'
                rel='noopener noreferrer'
                className='contSocial'
              >
                <div className='contIcon '>
                  <div className='contCer'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width={'80%'}
                      height={'80%'}
                      viewBox='0 0 24 24'
                    >
                      <path
                        fill='currentColor'
                        d='M15.5 1h-8A2.5 2.5 0 0 0 5 3.5v17A2.5 2.5 0 0 0 7.5 23h8a2.5 2.5 0 0 0 2.5-2.5v-17A2.5 2.5 0 0 0 15.5 1m-4 21c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5s1.5.67 1.5 1.5s-.67 1.5-1.5 1.5m4.5-4H7V4h9z'
                      ></path>
                    </svg>
                  </div>
                </div>
                <div className='cont'> {allSettings?.phone} </div>
              </a>
            )}
            {(allSettings?.facebook !== '' || null) && (
              <a
                href={`https://www.facebook.com/${allSettings?.facebook}`}
                target='_blank'
                rel='noopener noreferrer'
                className='contSocial'
              >
                <div className='contIcon '>
                  <div className='contCer'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width={'80%'}
                      height={'80%'}
                      viewBox='0 0 24 24'
                    >
                      <path
                        fill='currentColor'
                        d='M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4z'
                      ></path>
                    </svg>{' '}
                  </div>
                </div>
                <div className='cont'> {allSettings?.facebook} </div>
              </a>
            )}
            {(allSettings?.tiktok !== '' || null) && (
              <a
                href={`https://www.tiktok.com/${allSettings?.tiktok}`}
                target='_blank'
                rel='noopener noreferrer'
                className='contSocial'
              >
                <div className='contIcon '>
                  <div className='contCer'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width={'80%'}
                      height={'80%'}
                      viewBox='0 0 512 512'
                    >
                      <path
                        fill='currentColor'
                        d='M412.19 118.66a109 109 0 0 1-9.45-5.5a133 133 0 0 1-24.27-20.62c-18.1-20.71-24.86-41.72-27.35-56.43h.1C349.14 23.9 350 16 350.13 16h-82.44v318.78c0 4.28 0 8.51-.18 12.69c0 .52-.05 1-.08 1.56c0 .23 0 .47-.05.71v.18a70 70 0 0 1-35.22 55.56a68.8 68.8 0 0 1-34.11 9c-38.41 0-69.54-31.32-69.54-70s31.13-70 69.54-70a68.9 68.9 0 0 1 21.41 3.39l.1-83.94a153.14 153.14 0 0 0-118 34.52a161.8 161.8 0 0 0-35.3 43.53c-3.48 6-16.61 30.11-18.2 69.24c-1 22.21 5.67 45.22 8.85 54.73v.2c2 5.6 9.75 24.71 22.38 40.82A167.5 167.5 0 0 0 115 470.66v-.2l.2.2c39.91 27.12 84.16 25.34 84.16 25.34c7.66-.31 33.32 0 62.46-13.81c32.32-15.31 50.72-38.12 50.72-38.12a158.5 158.5 0 0 0 27.64-45.93c7.46-19.61 9.95-43.13 9.95-52.53V176.49c1 .6 14.32 9.41 14.32 9.41s19.19 12.3 49.13 20.31c21.48 5.7 50.42 6.9 50.42 6.9v-81.84c-10.14 1.1-30.73-2.1-51.81-12.61'
                      ></path>
                    </svg>
                  </div>
                </div>
                <div className='cont'> {allSettings?.tiktok}</div>
              </a>
            )}
          </div>
          <div className='contSocialBank'>
            <div className='contIcon '>
              <div className='contCer'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width={'80%'}
                  height={'80%'}
                  viewBox='0 0 48 48'
                >
                  <path
                    fill='currentColor'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M5.5 42.5h37m0-27.935h-37L24 5.5zM7 39.447h34M7 17.618h34M26.075 34.953a1.44 1.44 0 0 0 1.44 1.441h0h-7.03h0a1.44 1.44 0 0 0 1.44-1.44V22.11a1.44 1.44 0 0 0-1.44-1.44h7.03a1.44 1.44 0 0 0-1.44 1.44zm-12.485 0a1.44 1.44 0 0 0 1.441 1.441h0H8h0a1.44 1.44 0 0 0 1.441-1.44V22.11A1.44 1.44 0 0 0 8 20.67h7.031a1.44 1.44 0 0 0-1.44 1.44z'
                  ></path>
                  <path
                    fill='currentColor'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M13.59 34.953a1.44 1.44 0 0 0 1.441 1.441h0H8h0a1.44 1.44 0 0 0 1.441-1.44V22.11A1.44 1.44 0 0 0 8 20.67h7.031a1.44 1.44 0 0 0-1.44 1.44zm24.969 0A1.44 1.44 0 0 0 40 36.394h0h-7.031h0a1.44 1.44 0 0 0 1.44-1.44V22.11a1.44 1.44 0 0 0-1.44-1.44H40a1.44 1.44 0 0 0-1.441 1.44z'
                  ></path>
                </svg>
              </div>
            </div>
            <div className='cont'> {t('footer.message2')} </div>
          </div>
          <hr className='tapp' />
          <div className='copyright'>
            <div> {t('footer.message3')}| sunflower world-2025</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppFooter;
