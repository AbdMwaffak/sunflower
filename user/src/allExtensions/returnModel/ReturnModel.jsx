import { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ReturnModel(props) {
    const [show, setShow] = useState(false);
    const [problem, setProblem] = useState('');
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <div className={props.openMenu ? "returnOpen" : "returnClose"} onClick={handleShow} >   Product return </div>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='modelBody'>
                        Create a return request
                        <div className='input5'>
                            <Form.Control className='input6' as="textarea" aria-label="With textarea"
                                onChange={(e) => setProblem(e.target.value)}
                                placeholder='Write the problem here'
                            />
                        </div>
                        <div className='ImageAttached'>
                            Image attached
                        </div></div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <button className='send' onClick={handleClose}>send</button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default ReturnModel;