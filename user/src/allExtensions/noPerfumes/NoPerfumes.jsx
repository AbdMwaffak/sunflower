import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


function NoPerfumes(props) {
    const [show, setShow] = useState(true);
    const handleClose = () => (setShow(false), props.handleClose())
    const handleShow = () => setShow(true);
    ////////////////////////
    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>ERROR</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='modelBody' style={{ textAlign: "center" }}>
                    <h5
                        style={{ width: '100%', textAlign: "center", color: "red" }}>
                        Oh my god!
                    </h5>
                    You didn't choose the size and number of perfumes you need!! <br />
                    try again
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
export default NoPerfumes;