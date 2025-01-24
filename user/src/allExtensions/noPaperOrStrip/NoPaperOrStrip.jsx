import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import LoginModel from '../loginModel/LoginModel';
import { useTranslation } from 'react-i18next';

function NoPaperOrStrip(props) {
    const [show, setShow] = useState(true);
    const handleClose = () => (setShow(false), props.handleClose())
    const handleShow = () => setShow(true);
    ////////////////////////////////////
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
                    <Modal.Title>FLOWER ERROR</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='modelBody' style={{ textAlign: "center", marginBottom: "10px" }}>
                        <h5
                            style={{ width: '100%', textAlign: "center", color: "red" }}>
                            {t('flower.message')}
                        </h5>
                        {/* {(props?.paper == undefined && props?.strip == undefined && props?.flowersNumber == undefined) &&
                            <div style={{ width: '100%', textAlign: "center" }}>
                                you missed choise flowersNumber, paper and strip !
                            </div>}
                        {(props?.paper == undefined && props?.strip == undefined && props?.flowersNumber != undefined) &&
                            <div style={{ width: '100%', textAlign: "center" }}>
                                you missed choise paper and strip !
                            </div>}
                        {(props?.paper == undefined && props?.strip != undefined && props?.flowersNumber == undefined) &&
                            <div style={{ width: '100%', textAlign: "center" }}>
                                you missed choise flowersNumber and paper !
                            </div>}
                        {(props?.paper != undefined && props?.strip == undefined && props?.flowersNumber == undefined) &&
                            <div style={{ width: '100%', textAlign: "center" }}>
                                you missed choise flowersNumber and strip !
                            </div>}
                        {(props?.paper == undefined && props?.strip != undefined && props?.flowersNumber != undefined) &&
                            <div style={{ width: '100%', textAlign: "center" }}>
                                you missed choise papers  !
                            </div>}
                        {(props?.paper != undefined && props?.strip == undefined && props?.flowersNumber != undefined) &&
                            <div style={{ width: '100%', textAlign: "center" }}>
                                you missed choise strip  !
                            </div>}
                        {(props?.paper != undefined && props?.strip != undefined && props?.flowersNumber == undefined) &&
                            <div style={{ width: '100%', textAlign: "center" }}>
                                you missed choise flowersNumber  !
                            </div>} */}
                        {(props?.flowersNumber == undefined) &&
                            <div style={{ width: '100%', textAlign: "center" }}>
                                {t('flower.message1')}
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
export default NoPaperOrStrip;