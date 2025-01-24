import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import LoginModel from '../loginModel/LoginModel';
import { useTranslation } from 'react-i18next';

function NoToken(props) {
    const [show, setShow] = useState(true);
    const handleClose = () => (setShow(false), props.handleClose())
    const handleShow = () => setShow(true);
    ////////////////////////
    const { t } = useTranslation();
    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>LOGIN ERROR</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='modelBody' style={{ textAlign: "center", marginBottom: "10px" }}>
                        <h5
                            style={{ width: '100%', textAlign: "center", color: "red" }}>
                            {t('perfume.message00')}
                        </h5>
                        <div style={{ width: '100%', textAlign: "center" }}>
                            {t('perfume.message3')}
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer id='modal-footer'>
                    <LoginModel onClick={handleClose} />
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default NoToken;