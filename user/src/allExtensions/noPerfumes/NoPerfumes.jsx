import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useTranslation } from 'react-i18next';


function NoPerfumes(props) {
    const [show, setShow] = useState(true);
    const handleClose = () => (setShow(false), props.handleClose())
    const handleShow = () => setShow(true);
    ////////////////////////
    const { t } = useTranslation();
    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>PERFUME ERROR</Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <div className='modelBody' style={{ textAlign: "center" }}>
                    <h5
                        style={{ width: '100%', textAlign: "center", color: "red" }}>
                        {t('perfume.message')}
                    </h5>
                    {t('perfume.message1')} <br />
                    {t('perfume.message2')}
                </div>
            </Modal.Body>
            <Modal.Footer id='modal-footer'>
                <Button variant="secondary" onClick={handleClose}>
                    {t('public.close')}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
export default NoPerfumes;