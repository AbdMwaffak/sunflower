import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './sidBar.css'
import { useTranslation } from 'react-i18next';

const SidBar = ({ sid }) => {
    ////////////////////////////////////
    const { t, i18n } = useTranslation();
    return (
        <div className='sidBar' style={{ width: sid ? "250px" : "45px" }}>

            <Link to={'/MyCategory'} className={sid ? "sidActive" : "sidUnActive"}  >
                <div className="linkName" style={{ width: sid ? "100%" : "0" }}>    {t('sidBar.myCategory')}  </div>
                <div className='linkIcon'>
                    <svg className='iconSvg' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" ><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4h6v6H4zm10 0h6v6h-6zM4 14h6v6H4zm10 3a3 3 0 1 0 6 0a3 3 0 1 0-6 0"></path></svg>
                </div>
            </Link>
            {/* <Link to={'/MyNaturalFlower/:NaturalFlowerId'} className={sid ? "sidActive" : "sidUnActive"}  >
                <div className='linkName' style={{ width: sid ? "100%" : "0" }}>   {t('sidBar.myNaturalFlower')}   </div>
                <div className='linkIcon'>
                    <svg className='iconSvg' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" ><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit={1.5} strokeWidth={1.5}><path d="M12 15a3 3 0 1 0 0-6a3 3 0 0 0 0 6m1-6s1-2 1-4s-2-4-2-4s-2 2-2 4s1 4 1 4"></path><path d="M9 11s-2-1-4-1s-4 2-4 2s2 2 4 2s4-1 4-1m4 2s1 2 1 4s-2 4-2 4s-2-2-2-4s1-4 1-4m4-4s2-1 4-1s4 2 4 2s-2 2-4 2s-4-1-4-1m-4.414-3.828S9.879 7.05 8.464 5.636C7.05 4.222 4.222 4.222 4.222 4.222s0 2.828 1.414 4.243c1.414 1.414 3.536 2.121 3.536 2.121m0 2.828s-2.122.707-3.536 2.122c-1.414 1.414-1.414 4.242-1.414 4.242s2.828 0 4.242-1.414s2.122-3.536 2.122-3.536m4.243-1.414s2.12.707 3.535 2.122c1.414 1.414 1.414 4.242 1.414 4.242s-2.828 0-4.242-1.414s-2.122-3.536-2.122-3.536m0-5.656s.707-2.122 2.122-3.536c1.414-1.414 4.242-1.414 4.242-1.414s0 2.828-1.414 4.243c-1.414 1.414-3.536 2.121-3.536 2.121"></path></g></svg>                </div>
            </Link> */}
            {/* <Link to={'/Chocolate'} className={sid ? "sidActive" : "sidUnActive"}  >
                <div className='linkName' style={{ width: sid ? "100%" : "0" }}>   {t('sidBar.chocolate')}   </div>
                <div className='linkIcon'>
                    <svg className='iconSvg' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" ><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 6.5c-3 0-4.5-.5-4.5-3.5H5v18h14zm0 8.5H5m0-6h14m-7 12V3"></path></svg>                </div>
            </Link > */}
            <Link to={'/MyPerfume/:MyPerfumeId'} className={sid ? "sidActive" : "sidUnActive"}  >
                <div className='linkName' style={{ width: sid ? "100%" : "0" }}>  {t('sidBar.myPerfume')}   </div>
                <div className='linkIcon'>
                    <svg className='iconSvg' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" ><path fill="currentColor" fillRule="evenodd" d="M9.95 1.25h.1c.664 0 1.237 0 1.696.062c.492.066.963.215 1.345.597s.531.854.597 1.345c.04.289.054.623.059.996h.573a5.75 5.75 0 0 1 2.571.607l.118.06c.944-1.02 2.614-1.04 3.866-.317c1.412.815 2.273 2.564 1.44 4.007c-.834 1.443-2.778 1.571-4.19.756c-1.12-.647-1.895-1.882-1.749-3.086l-.156-.078a4.25 4.25 0 0 0-1.9-.449h-.57V7l-.001.044c2.777 1.243 4.768 3.826 4.982 6.9c.02.084.024.172.014.26c.003.096.005.193.005.291c0 2.121-.85 4.05-2.234 5.504l-.018.018a5.143 5.143 0 0 1-.707.652c-.294.216-.644.402-1.142.616c-1.085.465-1.874.465-3.132.465H8.483c-1.258 0-2.047 0-3.132-.465c-.498-.214-.848-.4-1.142-.616a5.146 5.146 0 0 1-.707-.652L3.484 20C2.1 18.545 1.25 16.616 1.25 14.495c0-3.315 2.06-6.134 5.001-7.45A.759.759 0 0 1 6.25 7V5.5l.001-.04a.758.758 0 0 1-.001-.038V4.95c0-.665 0-1.238.062-1.697c.066-.491.215-.963.597-1.345s.854-.531 1.345-.597c.459-.062 1.032-.062 1.697-.062m7.103 11.68c-.755-2.942-3.59-5.177-7.045-5.18h-.016c-3.26.003-5.968 1.992-6.897 4.688c.286.126.576.266.865.407l.12.059c.362.177.727.355 1.11.524c.849.376 1.752.694 2.755.807c1.259.142 2.216-.295 3.37-.822l.011-.005c1.134-.518 2.46-1.118 4.195-.83c.529.088 1.054.208 1.532.352M2.774 13.94c.168.078.344.163.528.253l.121.06c.36.175.75.365 1.16.547c.919.407 1.979.789 3.194.926c1.676.188 2.968-.403 4.063-.904l.109-.05c1.142-.52 2.087-.92 3.326-.715c.775.13 1.477.326 1.974.529c-.023 1.673-.702 3.204-1.82 4.379c-.231.242-.356.371-.524.494c-.166.122-.401.256-.847.447c-.785.337-1.29.344-2.6.344H8.542c-1.31 0-1.815-.007-2.6-.344c-.446-.19-.68-.325-.847-.447c-.168-.123-.293-.252-.524-.494c-1.138-1.196-1.821-2.761-1.821-4.47c0-.187.008-.372.024-.555m9.476-7.69h-4.5v-.533c.059-.01.119-.025.179-.043c.202-.063.437-.188.608-.435c.166-.238.213-.505.213-.739c0-.234-.047-.501-.213-.74a1.135 1.135 0 0 0-.609-.434a1.44 1.44 0 0 0-.104-.027c.043-.206.099-.283.146-.33c.057-.056.159-.127.484-.17c.347-.047.818-.049 1.546-.049c.728 0 1.2.002 1.546.048c.325.044.427.115.484.172c.057.057.128.159.172.484c.046.347.048.818.048 1.546zm6.625 1.814c-.98-.565-1.162-1.487-.89-1.957c.27-.47 1.16-.773 2.14-.208c.98.566 1.162 1.488.89 1.958c-.27.47-1.16.773-2.14.207" clipRule="evenodd"></path></svg>                </div>
            </Link>
            <Link to={'/MyArticles'} className={sid ? "sidActive" : "sidUnActive"}  >
                <div className='linkName' style={{ width: sid ? "100%" : "0" }}> {t('sidBar.myArticles')}  </div>
                <div className='linkIcon'><svg className='iconSvg' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" ><path fill="currentColor" d="M216 40H40a16 16 0 0 0-16 16v144a16 16 0 0 0 16 16h176a16 16 0 0 0 16-16V56a16 16 0 0 0-16-16m0 160H40V56h176zM184 96a8 8 0 0 1-8 8H80a8 8 0 0 1 0-16h96a8 8 0 0 1 8 8m0 32a8 8 0 0 1-8 8H80a8 8 0 0 1 0-16h96a8 8 0 0 1 8 8m0 32a8 8 0 0 1-8 8H80a8 8 0 0 1 0-16h96a8 8 0 0 1 8 8"></path></svg>
                </div>
            </Link>
            <Link to={'/Messages'} className={sid ? "sidActive" : "sidUnActive"}  >
                <div className='linkName' style={{ width: sid ? "100%" : "0" }}>{t('sidBar.myMessages')}   </div>
                <div className='linkIcon'>
                    <svg className='iconSvg' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" ><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}><path d="M8 9h8m-8 4h3.5m-1.02 6.512L8 21v-3H6a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v4"></path><path d="m18 22l3.35-3.284a2.143 2.143 0 0 0 .005-3.071a2.24 2.24 0 0 0-3.129-.006l-.224.22l-.223-.22a2.24 2.24 0 0 0-3.128-.006a2.143 2.143 0 0 0-.006 3.071z"></path></g></svg>
                </div>
            </Link>
            <Link to={'/MyOffers'} className={sid ? "sidActive" : "sidUnActive"}  >
                <div className='linkName' style={{ width: sid ? "100%" : "0" }}>{t('sidBar.myOffers')}  </div>
                <div className='linkIcon'>
                    <svg className='iconSvg' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7.692 19.616c.59 0 .886 0 1.155.1q.057.021.111.046c.261.12.47.328.888.746c.962.962 1.443 1.443 2.034 1.488q.12.009.24 0c.591-.045 1.072-.526 2.034-1.488c.418-.418.627-.626.888-.746q.054-.025.11-.046c.27-.1.565-.1 1.156-.1h.11c1.507 0 2.261 0 2.73-.468s.468-1.223.468-2.73v-.11c0-.59 0-.886.1-1.155q.021-.057.046-.111c.12-.261.328-.47.746-.888c.962-.962 1.443-1.443 1.488-2.034q.009-.12 0-.24c-.045-.591-.526-1.072-1.488-2.034c-.418-.418-.626-.627-.746-.888l-.046-.11c-.1-.27-.1-.565-.1-1.156v-.11c0-1.507 0-2.261-.468-2.73s-1.223-.468-2.73-.468h-.11c-.59 0-.886 0-1.155-.1l-.111-.046c-.261-.12-.47-.328-.888-.746c-.962-.962-1.443-1.443-2.034-1.488a2 2 0 0 0-.24 0c-.591.045-1.072.526-2.034 1.488c-.418.418-.627.627-.888.746l-.11.046c-.27.1-.565.1-1.156.1h-.11c-1.507 0-2.261 0-2.73.468s-.468 1.223-.468 2.73v.11c0 .59 0 .886-.1 1.155q-.022.057-.046.111c-.12.261-.328.47-.746.888c-.962.962-1.443 1.443-1.488 2.034a2 2 0 0 0 0 .24c.045.591.526 1.072 1.488 2.034c.418.418.627.627.746.888q.025.054.046.11c.1.27.1.565.1 1.156v.11c0 1.507 0 2.261.468 2.73s1.223.468 2.73.468zM15 9l-6 6m6 0h-.01M9.01 9H9" color="currentColor"></path></svg>

                </div>
            </Link>
            <Link to={'/About'} className={sid ? "sidActive" : "sidUnActive"}  >
                <div className='linkName' style={{ width: sid ? "100%" : "0" }}> {t('sidBar.aboutStore')}  </div>
                <div className='linkIcon'>
                    <svg className='iconSvg' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" ><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} color="currentColor"><path d="M15.153 4.284c-1.174-.436-1.695-2.18-3.033-2.28a2 2 0 0 0-.24 0c-1.337.1-1.858 1.844-3.032 2.28c-1.243.461-2.943-.484-3.995.568c-1.013 1.013-.117 2.778-.569 3.995c-.461 1.245-2.393 1.76-2.28 3.273c.101 1.337 1.845 1.859 2.28 3.033c.452 1.217-.444 2.982.569 3.995c1.052 1.052 2.752.107 3.995.568c1.173.436 1.695 2.18 3.033 2.28q.12.009.239 0c1.338-.1 1.86-1.844 3.033-2.28c1.217-.451 2.982.445 3.995-.568c1.087-1.087.04-2.85.614-4.106c.53-1.156 2.344-1.698 2.234-3.161c-.1-1.338-1.843-1.86-2.28-3.034c-.46-1.243.484-2.942-.568-3.995s-2.752-.107-3.995-.568"></path><path d="M12.242 16v-4c0-.471 0-.707-.146-.854c-.147-.146-.382-.146-.854-.146m.75-3h.01"></path></g></svg>                                 </div>
            </Link >
            <Link to={'/Setting'} className={sid ? "sidActive" : "sidUnActive"}  >
                <div className='linkName' style={{ width: sid ? "100%" : "0" }}>{t('sidBar.aboutSetting')}  </div>
                <div className='linkIcon'>
                    <svg className='iconSvg' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" ><path fill="currentColor" fillRule="evenodd" d="M10.5 1a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4H1.5a.5.5 0 0 1 0-1H10V1.5a.5.5 0 0 1 .5-.5M12 3.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5m-6.5 2A.5.5 0 0 1 6 6v1.5h8.5a.5.5 0 0 1 0 1H6V10a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5M1 8a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2A.5.5 0 0 1 1 8m9.5 2a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V13H1.5a.5.5 0 0 1 0-1H10v-1.5a.5.5 0 0 1 .5-.5m1.5 2.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5"></path></svg >
                </div>
            </Link >
            <Link to={'/Orders'} className={sid ? "sidActive" : "sidUnActive"}  >
                <div className='linkName' style={{ width: sid ? "100%" : "0" }}>{t('sidBar.orders')}  </div>
                <div className='linkIcon'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30px" style={{ marginRight: "2px", marginBottom: "2px" }} viewBox="0 0 24 24" ><path fill="currentColor" d="m17.371 18.587l-.655-.656q-.13-.129-.307-.129q-.178 0-.307.129q-.129.128-.129.303t.129.304l.86.86q.186.187.419.187t.419-.187l2.098-2.067q.129-.129.139-.297q.01-.169-.139-.317q-.129-.129-.316-.129t-.317.13zM7.27 8.73h9.462q.213 0 .356-.143t.144-.357q0-.233-.144-.366q-.143-.134-.356-.134H7.269q-.213 0-.357.143t-.143.357t.143.357t.357.143M18 22.116q-1.671 0-2.835-1.165Q14 19.787 14 18.116t1.165-2.836T18 14.116t2.836 1.164T22 18.116q0 1.67-1.164 2.835Q19.67 22.116 18 22.116M4 5.616q0-.672.472-1.144T5.616 4h12.769q.67 0 1.143.472q.472.472.472 1.144v5.317q0 .213-.143.357t-.357.143t-.357-.143t-.143-.357V5.616q0-.231-.192-.424T18.384 5H5.616q-.231 0-.424.192T5 5.616V19.05h6.344q.031.202.073.404q.043.202.11.398q.067.179-.09.293q-.158.115-.3.01l-.249-.17q-.111-.073-.234-.073t-.235.073l-.877.607q-.111.074-.234.074t-.235-.074l-.877-.607q-.112-.073-.235-.073t-.234.073l-.877.607q-.111.074-.234.074t-.235-.074l-.877-.607q-.112-.073-.235-.073t-.234.073L4 20.788zm3.27 10.653h3.874q.214 0 .357-.143t.143-.357t-.143-.356t-.357-.144H7.27q-.213 0-.357.144t-.143.356t.143.357t.357.143m0-3.769h7.204q.213 0 .357-.143t.143-.357t-.143-.357t-.357-.143H7.269q-.213 0-.357.143T6.77 12t.143.357t.357.143M5 19.05V5z"></path></svg>
                </div>
            </Link >
            {/* <Link to={'/Orders'} className={sid ? "sidActive" : "sidUnActive"}  >
                <div className='linkName' style={{ width: sid ? "100%" : "0" }}>{t('sidBar.returnOrder')}  </div>
                <div className='linkIcon'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30px" style={{ marginRight: "2px", marginBottom: "2px" }} viewBox="0 0 24 24" ><path fill="currentColor" d="M17.327 16.87q0-.166-.115-.278q-.116-.111-.27-.111q-.153 0-.269.115q-.115.116-.115.27v2.495q0 .166.115.278q.116.111.27.111q.153 0 .268-.115q.116-.116.116-.27zm1.346-.005v2.495q0 .167.116.278q.115.112.269.112t.269-.116t.115-.269V16.87q0-.166-.115-.278q-.115-.111-.27-.111q-.153 0-.268.115q-.116.116-.116.27M7.269 8.73h9.462q.212 0 .356-.144t.144-.356q0-.233-.144-.366q-.144-.134-.356-.134H7.269q-.212 0-.356.144t-.144.357t.144.356t.356.143M18 22.116q-1.671 0-2.835-1.165Q14 19.787 14 18.116t1.165-2.836T18 14.116t2.836 1.164T22 18.116q0 1.67-1.164 2.835Q19.67 22.116 18 22.116M4 5.616q0-.667.475-1.141T5.615 4h12.77q.666 0 1.14.475T20 5.615v5.318q0 .212-.144.356t-.357.144t-.356-.144t-.143-.356V5.616q0-.231-.192-.424T18.384 5H5.616q-.231 0-.424.192T5 5.616V19.05h6.344q.025.204.073.408q.049.204.11.394q.067.179-.09.293q-.158.115-.3.01l-.249-.17q-.111-.073-.234-.073t-.235.073l-.877.607q-.111.074-.234.074t-.235-.074l-.877-.607q-.112-.073-.235-.073t-.234.073l-.877.607q-.111.074-.234.074t-.235-.074l-.877-.607q-.112-.073-.235-.073t-.234.073L4 20.788zm3.27 10.653h3.874q.213 0 .356-.144t.144-.356t-.144-.356t-.356-.144H7.27q-.212 0-.356.144t-.144.357t.144.356t.356.143m0-3.769h7.204q.212 0 .356-.144t.144-.357t-.144-.356t-.356-.143H7.269q-.212 0-.356.144t-.144.357t.144.356t.356.143M5 19.05V5z"></path></svg>
                </div>
            </Link > */}
        </div >
    );
}

export default SidBar;
