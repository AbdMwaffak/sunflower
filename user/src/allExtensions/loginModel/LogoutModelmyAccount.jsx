import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import './loginModel.css'
import Cookies from 'universal-cookie';
import { useTranslation } from 'react-i18next';

function LogoutModelmyAccount() {
    const cookies = new Cookies();
    ////////////////////////
    const [show, setShow] = useState(false);
    ////////////////////////
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    ////////////////////////
    const handleLogout = () => {
        setShow(false);
        cookies.remove('dealerId')
        cookies.remove('token')
        window.location.pathname = '/'
    }
    ////////////////////////
    const { t } = useTranslation();
    return (
        <>
            <div className='formButton5' onClick={handleShow} >
                {t("public.logout")}
            </div>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size='md'
            >
                <Modal.Header closeButton>
                    <Modal.Title> LOGOUT </Modal.Title>
                </Modal.Header>
                <Modal.Body >

                    <div className='modelBody' style={{ textAlign: "center", justifyContent: "center" }}>
                        {t('public.logout1')}
                    </div>
                </Modal.Body>
                <Modal.Footer id='modal-footer'>
                    <button className='logoutBT' onClick={handleLogout}>    {t('public.logout')}</button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default LogoutModelmyAccount;