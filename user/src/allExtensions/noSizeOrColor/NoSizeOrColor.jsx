import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useTranslation } from 'react-i18next';

function NoSizeOrColor(props) {
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
                    <Modal.Title>FIELD ERROR</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='modelBody' style={{ textAlign: "center", marginBottom: "10px" }}>
                        <h5
                            style={{ width: '100%', textAlign: "center", color: "red" }}>
                            {t('product.message')}
                        </h5>
                        {(props?.productSize == ' ' && props?.productColor == ' ') &&
                            <div style={{ width: '100%', textAlign: "center" }}>
                                {t('product.message1')}
                            </div>}
                        {(props?.productSize == ' ' && props?.productColor != ' ') &&
                            <div style={{ width: '100%', textAlign: "center" }}>
                                {t('product.message2')}
                            </div>}
                        {(props?.productColor == ' ' && props?.productSize != ' ') &&
                            <div style={{ width: '100%', textAlign: "center" }}>
                                {t('product.message3')}
                            </div>}
                    </div>
                </Modal.Body>
                <Modal.Footer id='modal-footer'>
                    <Button variant="secondary" onClick={handleClose}>
                        {t('public.close')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default NoSizeOrColor;