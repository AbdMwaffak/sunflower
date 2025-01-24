import { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function DeletePostModel(props) {
    const [show, setShow] = useState(false);
    const [pass, setPass] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            {/* <Button variant="primary" onClick={handleShow}>
                Launch static backdrop modal
            </Button> */}

            <button className='deleteButten'
                onClick={handleShow}

            >
                Delete
            </button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Delete Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div
                    //  className={props.type == "name" ? "tt" : "ff"}
                    >
                        <Form.Label>  If you are sure to delete this item, enter the password :</Form.Label>
                        <Form.Control className='input6' type="text" aria-label="With textarea"
                            onChange={(e) => setPass(e.target.value)}
                            placeholder='write here '
                        />
                    </div>




                </Modal.Body>
                <Modal.Footer id='modal-footer'>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <button className='deleteButten'
                        onClick={(e) => props.delete(pass)}
                    >Save Change</button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DeletePostModel;