import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function NoSizeOrColor(props) {
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
                        {(props?.productSize == ' ' && props?.productColor == ' ') &&
                            <div style={{ width: '100%', textAlign: "center" }}>
                                you missed choise Size and Color !
                            </div>}
                        {(props?.productSize == ' ' && props?.productColor != ' ') &&
                            <div style={{ width: '100%', textAlign: "center" }}>
                                you missed choise Size  !
                            </div>}
                        {(props?.productColor == ' ' && props?.productSize != ' ') &&
                            <div style={{ width: '100%', textAlign: "center" }}>
                                you missed choise Color  !
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
export default NoSizeOrColor;