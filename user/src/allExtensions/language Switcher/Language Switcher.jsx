
import React, { useEffect, useRef, useState } from 'react';
import "./languageSwitcher.css"
import i18n from "i18next";


const LanguageSwitcher = () => {
    const [langugetogel, setLangugetogel] = useState(false)
    const [selectedLanguage, setSelectedLanguage] = useState("En")
    ////////////////////
    let menuRef = useRef()
    ////////////////////
    const changeLanguageHandler = (e) => {
        i18n.changeLanguage(e)
        setLangugetogel(false);
    }
    ////////////////////
    useEffect(() => {
        let handler = (e) => {
            if (!menuRef.current.contains(e.target)) {
                setLangugetogel(false);
            }
        };
        document.addEventListener("mousedown", handler)
        return () => {
            document.removeEventListener("mousedown", handler)
        };
    })
    return (
        <div className='languageSwitcher'>
            <div className='b3' onClick={() => setLangugetogel(!langugetogel)} ref={menuRef}>
                <svg xmlns="http://www.w3.org/2000/svg" width={"25px"} height={"25px"} viewBox="0 0 24 24" ><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.3} d="m5 8l6 6m-7 0l6-6l2-3M2 5h12M7 2h1m14 20l-5-10l-5 10m2-4h6"></path></svg>
            </div>


            <div className={langugetogel ? "languageItameOpenAb" : "languageItameCloseAb"} ref={menuRef} >
                <div className={langugetogel ? "DMOpen" : "DMClose"}
                    onClick={() => changeLanguageHandler("en")} >English</div>

                <div className={langugetogel ? "DMOpen" : "DMClose"}
                    onClick={() => changeLanguageHandler("ar")} >العربية</div>


            </div>
        </div>
    );
};

export default LanguageSwitcher;

{/* <button onClick={() => setLanguage('fr')}>French</button> */ }
// AIzaSyCgwKmRcq-6ctK7Hbx0ZV28gSLxgg9Jyh4