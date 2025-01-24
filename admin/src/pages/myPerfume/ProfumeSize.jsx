import { useEffect, useRef, useState } from 'react'
import './profumeSize.css'
import { useDispatch } from 'react-redux'
import DeletePerfumeSizeModel from '../../allExtensions/deletePerfumeSizeModel/DeletePerfumeSizeModel'
import { Toaster } from 'react-hot-toast'
import { patchVariants } from '../../RTK/perfume/patchVariantsSlice'
import { useTranslation } from 'react-i18next'

function ProfumeSize(props) {
    const [openMenu, setOpenMenu] = useState(false)
    ////////////////////////////////////
    let menuRef = useRef()
    ////////////////////
    const dispatch = useDispatch()
    ////////////////////////////////////
    const handelReload = () => {
        setTimeout(() => {
            props?.handleReload()
        }, 1000);
    }
    ////////////////////////////////////
    const handelAvailable = (e) => {
        dispatch(patchVariants({ id: props.id, available: e }))
        handelReload()
        setOpenMenu(!openMenu)
    }
    ////////////////////
    useEffect(() => {
        let handler = (e) => {
            if (!menuRef.current.contains(e.target)) {
                setOpenMenu(false);
            }
        };
        document.addEventListener("mousedown", handler)
        return () => {
            document.removeEventListener("mousedown", handler)
        };
    })
    ////////////////////////////////////
    const { t } = useTranslation();
    return (
        <>
            <Toaster />
            <div className='ml'>
                <div className='sizeName'>
                    <div className='meny'
                        ref={menuRef}>
                        <svg className='menuPo'
                            onClick={() => setOpenMenu(!openMenu)}
                            viewBox="0 0 24 24" height="24" width="24"
                            preserveAspectRatio="xMidYMid meet"
                            version="1.1" x="0px" y="0px" enableBackground="new 0 0 24 24">
                            <path fill="currentColor" d="M12,7c1.104,0,2-0.896,2-2c0-1.105-0.895-2-2-2c-1.104,0-2,0.894-2,2 C10,6.105,10.895,7,12,7z M12,9c-1.104,0-2,0.894-2,2c0,1.104,0.895,2,2,2c1.104,0,2-0.896,2-2C13.999,9.895,13.104,9,12,9z M12,15 c-1.104,0-2,0.894-2,2c0,1.104,0.895,2,2,2c1.104,0,2-0.896,2-2C13.999,15.894,13.104,15,12,15z">
                            </path></svg>

                        <div className={openMenu ? "menuOpenPo" : "menuClosePo"} >
                            {/* <DeletePerfumeSizeModel
                                openMenu={openMenu}
                                handelReload={handelReload}
                                id={props?.id}
                            /> */}
                            {!props?.available &&
                                <div className={openMenu ? "DMOpen" : "DMClose"} onClick={() => handelAvailable(true)} >
                                    {t('perfume.turnOn')}
                                </div>
                            }
                            {props?.available &&
                                <div className={openMenu ? "DMOpen" : "DMClose"} onClick={() => handelAvailable(false)}>
                                    {t('perfume.turnOff')}
                                </div>
                            }
                        </div>
                    </div>
                    <div className='ttt1'>
                        <span className='vv3'> {t('perfume.size')} : {props?.size} </span>
                    </div>
                </div>
                <div className='priceBySize'>
                    <span className='vv3'> {t('perfume.price')} : {props?.price}.{t("public.sar")} </span>
                </div>
            </div >
        </>
    )
}

export default ProfumeSize
