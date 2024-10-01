import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import LoginModel from '../loginModel/LoginModel';

function NoPaperOrStrip(props) {
    const [show, setShow] = useState(true);
    const handleClose = () => (setShow(false), props.handleClose())
    const handleShow = () => setShow(true);
    ////////////////////////
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
                            Oops!
                        </h5>
                        {(props?.paper == undefined && props?.strip == undefined && props?.flowersNumber == undefined) &&
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
                        {(props?.paper != undefined && props?.strip != undefined && props?.flowersNumber == undefined) &&
                            <div style={{ width: '100%', textAlign: "center" }}>
                                you missed choise flowersNumber  !
                            </div>}
                        {(props?.paper == undefined && props?.strip != undefined && props?.flowersNumber != undefined) &&
                            <div style={{ width: '100%', textAlign: "center" }}>
                                you missed choise papers  !
                            </div>}
                        {(props?.paper != undefined && props?.strip == undefined && props?.flowersNumber != undefined) &&
                            <div style={{ width: '100%', textAlign: "center" }}>
                                you missed choise strip  !
                            </div>}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default NoPaperOrStrip;