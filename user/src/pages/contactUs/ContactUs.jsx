import React, { useEffect } from 'react';
import './contactUs.css'
import sunflower from '../../image/sunflower2-svg.png'
const ContactUs = () => {
    ///////////////////
    useEffect(
        function () {
            document.title = `SUNFLOWER - Contact Us `;
            return function () { document.title = 'SUNFLOWER' };
        }, [])
    ///////////////////
    return (
        <div className='contactUs'>
            <div className='contactTitle'>
                Contact Us
            </div>
            <div className='contactContainer'>

                <div className='SocialContact'>
                    <div className='blur '>
                        <img className='sunflowerImg' src={sunflower} />
                        <div className='cer'>
                            <svg className='mm5'
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                height="80%"
                                width="80%"
                                color='black'
                            >
                                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 012.41 5.83c0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.39-4.19-1.15l-.3-.17-3.12.82.83-3.04-.2-.32a8.188 8.188 0 01-1.26-4.38c.01-4.54 3.7-8.24 8.25-8.24M8.53 7.33c-.16 0-.43.06-.66.31-.22.25-.87.86-.87 2.07 0 1.22.89 2.39 1 2.56.14.17 1.76 2.67 4.25 3.73.59.27 1.05.42 1.41.53.59.19 1.13.16 1.56.1.48-.07 1.46-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.07-.1-.23-.16-.48-.27-.25-.14-1.47-.74-1.69-.82-.23-.08-.37-.12-.56.12-.16.25-.64.81-.78.97-.15.17-.29.19-.53.07-.26-.13-1.06-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.12-.24-.01-.39.11-.5.11-.11.27-.29.37-.44.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.11-.56-1.35-.77-1.84-.2-.48-.4-.42-.56-.43-.14 0-.3-.01-.47-.01z" />
                            </svg>
                        </div>
                    </div>
                    <div className='contTitle'>  0564223992  </div>
                </div>
                <div className='SocialContact'>
                    <div className='blur '>
                        <img className='sunflowerImg' src={sunflower} />
                        <div className='cer'>
                            <svg
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                height="80%"
                                width="80%"
                                color='black'
                            >
                                <path d="M18.73 5.41l-1.28 1L12 10.46 6.55 6.37l-1.28-1A2 2 0 002 7.05v11.59A1.36 1.36 0 003.36 20h3.19v-7.72L12 16.37l5.45-4.09V20h3.19A1.36 1.36 0 0022 18.64V7.05a2 2 0 00-3.27-1.64z" />
                            </svg>
                        </div>
                    </div>
                    <div className='contTitle'>  0564223992  </div>
                </div>
                <div className='SocialContact'>
                    <div className='blur '>
                        <img className='sunflowerImg' src={sunflower} />
                        <div className='cer'>
                            <svg
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                viewBox="0 0 24 24"
                                height="80%"
                                width="80%"
                                color='black'
                            >
                                <path d="M7 2 H17 A5 5 0 0 1 22 7 V17 A5 5 0 0 1 17 22 H7 A5 5 0 0 1 2 17 V7 A5 5 0 0 1 7 2 z" />
                                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zM17.5 6.5h.01" />
                            </svg>
                        </div>
                    </div>
                    <div className='contTitle'>  0564223992  </div>
                </div>
                <div className='SocialContact'>
                    <div className='blur '>
                        <img className='sunflowerImg' src={sunflower} />
                        <div className='cer'>
                            <svg
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                viewBox="0 0 24 24"
                                height="60%"
                                width="60%"
                                color='black'
                            >
                                <path d="M15.05 5A5 5 0 0119 8.95M15.05 1A9 9 0 0123 8.94m-1 7.98v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                            </svg>
                        </div>
                    </div>
                    <div className='contTitle'>  0564223992  </div>
                </div>
            </div>
        </div>
    );
}
export default ContactUs;
