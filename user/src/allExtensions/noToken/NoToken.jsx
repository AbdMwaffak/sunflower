import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import LoginModel from '../loginModel/LoginModel';

function NoToken(props) {
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
                            Sorry
                        </h5>
                        <div style={{ width: '100%', textAlign: "center" }}>
                            you are haven't logging yet , please login and try again
                        </div>
                    </div>
                    <div onClick={handleClose}>
                        <LoginModel />
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
export default NoToken;